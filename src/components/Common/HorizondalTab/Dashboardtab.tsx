import React, { useRef } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Table from "../DashboradTable/table";
import {
  Avatar,
  Typography,
  // Card,
  // CardContent,
  // CardMedia,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import "./Dashboardtab.scss";
// import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import GenericButton from "../Button/button";
import filterTick from "../../../../public/Icon_Tick.svg";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Drawer from "@mui/material/Drawer";
import Accordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { debounce } from "lodash";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import Carousel from "../Carousel/carousel";
import Popover from "@mui/material/Popover";
import tickIcon from "../../../assets/table/Icon_Tick.svg";
import denyIcon from "../../../assets/table/Icon_Deny.svg";
import { Modal } from "@mui/material";
import ApproveIcon from "../../../assets/Dashboard modal img/Confirm.svg";
import DenyIcon from "../../../assets/Dashboard modal img/reject.svg";
import DeleteIcon from "../../../assets/Dashboard modal img/dlt.svg";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { setActiveTab } from "../../../slicers/tabsSlice";
import type { Property } from "../../AdminResidencial/AdminResidencial.model";
import type { PropertyViewWithSource } from "./Dashboardtab.model";

import { useNavigate } from "react-router-dom";
import BasicPopover from "../Sortpopup/Sortpopup";

// type Property = {
//   _id?: string;
//   createdAt?: string;
//   postOwner?: {
//     userName?: string;
//   }
//   rent?: {
//     rentAmount?: string;
//     advanceAmount?: string;
//     agreementTiming?: string;
//     negotiable?: boolean;
//   };
//   status?: string;
//   propertyType?: string;
//   title?: string;
//   plotType?: string;
//   furnishingType?: string;
//   facingDirection?: string;
//   totalFloors?: string;
//   commercialType?: string;
//   washroom?: string;
//   type?: string;
//   location?: {
//     landmark?: string;
//     address?: string;
//   };
//   area? : {
//     totalArea?: string;
//   }
// };
type PropertyData = {
  residential?: Property[];
  commercial?: Property[];
  plot?: Property[];
  all?: Property[];
  properties?:
  | "all"
  | "residential"
  | "residentials"
  | "commercial"
  | "commercials"
  | "plot"
  | "plots";
};

interface DashboardtabProps {
  data: PropertyData;
  properties: "all" | "residentials" | "commercials" | "plots" | "postedProperties";
  onScrollLoadMore?: () => void;
  loading?: boolean;
  hasMore?: boolean;
  totalCount?: number;
  onScrollChangeParent?: (scrollTop: number) => void;
  onReset?: () => void;
  onSortChange: (option: string) => void;
  selectedSort: string;
  currentActiveTab: TabStatusType;
  setCurrentActiveTab: (tab: TabStatusType) => void;
  statusTotals?: { pending: number; approved: number; rejected: number; deleted: number };
}

// Tab Status Type
type TabStatusType = "pending" | "approved" | "rejected" | "deleted";


// Filter Section Interface  
interface FilterSection {
  heading: string;
  options: string[];
}


// Property Item Interface
type PropertyItem = {
  _id: string;
  createdAt?: string;
  postOwner?: {
    userName?: string;
  };
  area?: {
    totalArea?: string;
  };
  title?: string;
  commercialType?: string;
  propertyType: string;
  location?: {
    landmark?: string;
    address?: string;
  };
  rent?: {
    rentAmount?: string;
  };
  images?: string[];
};
interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

// COMPREHENSIVE DRAWER EVENT INTERFACE
interface DrawerEvent {
  type?: string;
  key?: string;
  target?: EventTarget | null;
  currentTarget?: EventTarget | null;
  preventDefault?: () => void;
  stopPropagation?: () => void;
}

interface ExtendedProperty extends Property {
  postOwner?: {
    id?: string;
    role?: string;
    userName?: string;
  };
  title?: string;
  createdAt?: string;
}

interface EditableProperty {
  _id?: string;
  propertyType?: string;
  [key: string]: unknown; // Allow additional properties
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Dashboardtab({
  data,
  properties,
  onScrollLoadMore: onScrollLoadMoreProp,
  onScrollChangeParent,
  loading: loadingProp,
  hasMore: hasMoreProp,
  totalCount,
  onReset,
  onSortChange,
  selectedSort,
  currentActiveTab,
  setCurrentActiveTab,
  statusTotals,
}: DashboardtabProps) {
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentCheckList, setCurrentCheckList] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const statusByTab = ["pending", "approved", "rejected", "deleted"];
  const [value, setValue] = useState(0);
  const dispatch = useAppDispatch();
  // @ts-ignore
  const activeTab = useAppSelector((state) => state.tabs.currentTab);
  const [tableValues, setTableValues] = useState<Property[]>([]);
  const [resetCounter, setResetCounter] = useState(0);
  const [alignment, setAlignment] = React.useState("List View");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<
    "Approve" | "Deny" | "Delete" | null
  >(null);
  const [selectedItem, setSelectedItem] = useState<PropertyItem | null>(null);
  const [isBackdropLoading, setIsBackdropLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [selectedLabel, setSelectedLabel] = useState(selectedSort);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  // Infinite scroll state for filtered mode
  const [filterPage, setFilterPage] = useState(1);
  const [filterHasMore, setFilterHasMore] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [filterTotalCount, setFilterTotalCount] = useState<number | null>(null);
  const FILTER_PAGE_SIZE = 10;
  // const [sortOption, setSortOption] = useState("Newest Property");


  const sortOptions = ["Newest", "Oldest", "Highest Price", "Lowest Price"];

  const handleSortSelect = (option: string) => {
    setSelectedLabel(option); // Update UI label
    onSortChange(option); // Send to Home, which updates PropertyCardList
  };

  //const currentStatus = statusByTab[value];
  // UPDATED FILTER OPTIONS - All the filters you requested
  const filterOptions = {
    all: [
      { heading: "Property Type", options: ["Rent", "Lease", "Sale"] },
      { heading: "Type", options: ["Residential", "Commercial", "Plot"] },
      { heading: "Facing", options: ["North", "East", "West", "South", "North East", "North West", "South East", "South West"] },
      { heading: "Area", options: ["Under 500 sq.ft", "500-1000 sq.ft", "1000-2000 sq.ft", "2000-5000 sq.ft", "Above 5000 sq.ft"] },
      { heading: "Property On Floor", options: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "Above 5th Floor"] },
    ],

    residentials: [
      { heading: "Property Type", options: ["Rent", "Lease", "Sale"] },
      { heading: "Residential Type", options: ["Apartment", "House", "Villa", "Shared room", "hostel/PG", "Duplex", "Rooms", "Independent home"] },
      { heading: "Rooms", options: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"] },
      { heading: "Facing", options: ["North", "East", "West", "South", "North East", "North West", "South East", "South West"] },
      { heading: "Furnishing", options: ["Fully Furnished", "Semi Furnished", "Unfurnished"] },
      { heading: "Area", options: ["Under 500 sq.ft", "500-1000 sq.ft", "1000-2000 sq.ft", "2000-5000 sq.ft", "Above 5000 sq.ft"] },
      { heading: "Property On Floor", options: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "Above 5th Floor"] },
      { heading: "Parking", options: ["With Parking", "None"] },
      { heading: "Tenant Preference", options: ["Bachelor", "Family Only"] },
      { heading: "Accessibility", options: ["Lift Access", "Ramp Access", "Stair Access"] },
    ],

    commercials: [
      { heading: "Property Type", options: ["Rent", "Lease", "Sale"] },
      { heading: "Commercial Type", options: ["Office Space", "Co-Working", "Shop", "Showroom", "Godown/Warehouse", "Industrial Building", "Industrial Shed", "Other Business"] },
      { heading: "Facing", options: ["North", "East", "West", "South", "North East", "North West", "South East", "South West"] },
      { heading: "Washroom", options: ["None", "Public", "Common", "Private"] },
      { heading: "Area", options: ["Under 500 sq.ft", "500-1000 sq.ft", "1000-2000 sq.ft", "2000-5000 sq.ft", "Above 5000 sq.ft"] },
      { heading: "Property On Floor", options: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "Above 5th Floor"] },
      { heading: "Parking", options: ["With Parking", "None"] },
      { heading: "Accessibility", options: ["Lift Access", "Ramp Access", "Stair Access"] },
    ],

    plots: [
      { heading: "Property Type", options: ["Rent", "Lease", "Sale"] },
      { heading: "Plot Type", options: ["Agriculture", "Business Use", "Commercial Use", "Industrial Use", "Personal Use", "Parking", "Shed/Storage", "Poultry or Livestock", "Events or Functions", "Investment Purpose", "Renewable Energy Projects", "Timber/Tree Plantation", "Nursery/Gardening Business", "Telecom Towers", "None"] },
      { heading: "Area", options: ["Under 500 sq.ft", "500-1000 sq.ft", "1000-2000 sq.ft", "2000-5000 sq.ft", "Above 5000 sq.ft"] },
    ],

    postedProperties: [
      { heading: "Property Type", options: ["Rent", "Lease", "Sale"] },
      { heading: "Type", options: ["Residential", "Commercial", "Plot"] },
      { heading: "Facing", options: ["North", "East", "West", "South", "North East", "North West", "South East", "South West"] },
      { heading: "Area", options: ["Under 500 sq.ft", "500-1000 sq.ft", "1000-2000 sq.ft", "2000-5000 sq.ft", "Above 5000 sq.ft"] },
      { heading: "Property On Floor", options: ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "Above 5th Floor"] },
    ]
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterOpen = Boolean(anchorEl);
  const id = filterOpen ? "simple-popover" : undefined;
  const allItems = useMemo(
    () => [
      ...(data?.residential || []),
      ...(data?.commercial || []),
      ...(data?.plot || []),
      ...(data?.all || []),
    ],
    [data]
  );

  const isMatchingStatus = (itemStatus?: string, tabStatus?: string) => {
    if (!itemStatus) return false;
    const s = itemStatus.toLowerCase();
    const t = (tabStatus ?? "").toLowerCase();
    if (t === "deleted") {
      return ["deleted", "rented out", "leased out", "sold out"].includes(s);
    }
    return s === t;
  };

  // Reset tab state when property type changes
 useEffect(() => {
    setValue(0);
    dispatch(setActiveTab(0));
    setIsFiltered(false);
    setFilterPage(1);
    setFilterHasMore(true);
    setFilterLoading(false);
    setCurrentCheckList([]);

    // CORRECTLY PARSE INITIAL DATA
    const pendingItems = allItems.filter((item) => isMatchingStatus(item.status, "pending"));
    setTableValues(pendingItems);
    setCurrentActiveTab("pending");
  }, [properties]);

  // Handle tab change
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    dispatch(setActiveTab(newValue));
    setIsFiltered(false);
    setFilterPage(1);
    setFilterHasMore(true);
    setFilterLoading(false);
    setCurrentCheckList([]);

    // AUTOMATICALLY FILTER FOR NEW TAB
    const newStatus = statusByTab[newValue];
    const newTabItems = allItems.filter((item: Property) => isMatchingStatus(item.status, newStatus));
    setTableValues(newTabItems);

    // Update current active tab state
    setCurrentActiveTab(newStatus.toLowerCase() as TabStatusType);
  };

  useEffect(() => {
  }, [tableValues]);

  // handleCheckbox
  const handleCheckboxChange = (option: string) => {
    setCurrentCheckList((prev) => {
      const newList = prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option];
      return newList;
    });
  };

  // filter function

  // const fetchFilteredData = async (filters: string[], tabIndex: number) => {
  //   try {
  //     const status = statusByTab[tabIndex];
  //     // Create the dynamic query string
  //     const queryParts: string[] = [];

  //     // Mapping UI headings to API keys
  //     const headingToKey: Record<string, string> = {
  //       "Property Type": "propertyType",
  //       FurnishingType: "furnishingType",
  //       "Commercial Type": "commercialType",
  //       Washroom: "washroom",
  //       "Plot Type": "plotType",
  //       Facing: "facing",
  //     };

  //     const filterSection =
  //       filterOptions[properties === "all" ? "all" : properties] || [];
  //     filterSection.forEach((section) => {
  //       const key = headingToKey[section.heading];
  //       const selectedOptions = section.options.filter((opt) =>
  //         filters.includes(opt)
  //       );
  //       if (key && selectedOptions.length) {
  //         queryParts.push(`${key}=${selectedOptions.join(",")}`);
  //       }
  //     });

  //     if (status) {
  //       queryParts.push(`status=${status}`);
  //     }

  //     const baseUrl = `${import.meta.env.VITE_BackEndUrl}/api/${properties}`;
  //     const queryString =
  //       queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
  //     const fullUrl = `${baseUrl}${queryString}`;


  //     const response = await axios.get(fullUrl);

  //     const dataObj = response.data.data;
  //     let result: Property[] = [];

  //     if (properties === "residentials") result = dataObj ?? [];
  //     else if (properties === "commercials") result = dataObj ?? [];
  //     else if (properties === "plots") result = dataObj ?? [];
  //     else if (properties === "all") {
  //       result = [
  //         ...(dataObj.residential ?? []),
  //         ...(dataObj.commercial ?? []),
  //         ...(dataObj.plot ?? []),
  //       ];
  //     }
  //     const filteredByStatus = result.filter(
  //       (item) => item.status?.toLowerCase() === status.toLowerCase()
  //     );

  //     setTableValues(filteredByStatus);
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //     setTableValues([]);
  //   }
  // };

  // COMPLETELY FIXED FILTER FUNCTION - All type errors resolved
  const fetchFilteredData = async (filters: string[], tabIndex: number, page: number = 1, append: boolean = false) => {
    setFilterLoading(true);
    try {
      const status = statusByTab[tabIndex];
      const queryParts: string[] = [];

      // EXACT MAPPING based on your backend API schema
      const headingToKey: Record<string, string> = {
        // Common filters across all APIs
        "Property Type": "propertyType", // Rent,Lease,Sale
        "Facing": "facing", // North,East,West,South,North East,North West,South East,South West

        // Commercial API filters (/api/commercials)
        "Commercial Type": "commercialType", // Office Space,Co-Working,Shop,Showroom,etc.
        "Washroom": "washroom", // None,Public,Common,Private
        "RTO": "rto", // Yes/No -> true/false
        "Parking": "parking", // With Parking/None -> true/false

        // Residential API filters (/api/residentials) 
        "Residential Type": "residentialType", // Apartment,House,Villa,etc.
        "Rooms": "rooms", // 1 BHK,2 BHK,3 BHK,4 BHK,5+ BHK
        "Furnishing": "furnishingType", // Fully Furnished,Semi Furnished,Unfurnished
        "Tenant Preference": "bachelorsAllowed", // true/false (and familyOnly)
        // Plot API filters (/api/plots)
        "Plot Type": "plotType", // Agriculture,Business Use,Commercial Use,etc.

        // Common accessibility filters
        "Accessibility": "accessibility", // lift,ramp,steps -> liftAccess,rampAccess,stairsAccess

        // Special handling needed for these
        "Area": "area", // No direct API support - frontend filter
        "Property On Floor": "floors", // No direct API support - frontend filter  
        "Type": "type", // Residential/Commercial/Plot - frontend filter
      };

      // API ENDPOINTS - Exact from your schema
      const apiEndpointMap: Record<string, string> = {
        "residentials": "residentials",
        "commercials": "commercials",
        "plots": "plots",
        "all": "all",
        "postedProperties": "myposts" // For posted properties
      };

      const endpoint = apiEndpointMap[properties] || "all";
      const filterSection = filterOptions[properties === "all" ? "all" : properties];

      filterSection?.forEach((section: FilterSection) => {
        //@ts-ignore
        const key = headingToKey[section.heading];
        const selectedOptions = section.options.filter((opt: string) => filters.includes(opt));

        if (selectedOptions.length > 0) {

          // EXACT API PARAMETER MAPPING based on your backend schema

          // 1. Property Type - Direct mapping (ALL APIs support this)
          if (section.heading === "Property Type") {
            queryParts.push(`propertyType=${selectedOptions.join(",")}`);
          }

          // 2. Facing - Only for Commercial and Dashboard APIs
          else if (section.heading === "Facing") {
            if (endpoint === "commercials" || endpoint === "all") {
              queryParts.push(`facing=${selectedOptions.join(",")}`);
            }
            // For residential and plots, this will be handled by frontend filtering
          }

          // 3. Commercial Type - Only for Commercial API
          else if (section.heading === "Commercial Type") {
            if (endpoint === "commercials") {
              queryParts.push(`commercialType=${selectedOptions.join(",")}`);
            }
          }

          // 4. Residential Type - Only for Residential API
          else if (section.heading === "Residential Type") {
            if (endpoint === "residentials") {
              queryParts.push(`residentialType=${selectedOptions.join(",")}`);
            }
          }

          // 5. Plot Type - Only for Plot API
          else if (section.heading === "Plot Type") {
            if (endpoint === "plots") {
              queryParts.push(`plotType=${selectedOptions.join(",")}`);
            }
          }

          // 6. Rooms - Only for Residential API
          else if (section.heading === "Rooms") {
            if (endpoint === "residentials") {
              queryParts.push(`rooms=${selectedOptions.join(",")}`);
            }
          }

          // 7. Furnishing - Only for Residential API
          else if (section.heading === "Furnishing") {
            if (endpoint === "residentials") {
              queryParts.push(`furnishingType=${selectedOptions.join(",")}`);
            }
          }

          // 8. Washroom - Only for Commercial API
          else if (section.heading === "Washroom") {
            if (endpoint === "commercials") {
              queryParts.push(`washroom=${selectedOptions.join(",")}`);
            }
          }

          // 9. RTO - Only for Commercial API
          else if (section.heading === "RTO") {
            if (endpoint === "commercials") {
              if (selectedOptions.includes("Yes")) {
                queryParts.push("rto=true");
              } else if (selectedOptions.includes("No")) {
                queryParts.push("rto=false");
              }
            }
          }

          // 10. Parking - Commercial and Residential APIs
          else if (section.heading === "Parking") {
            if (endpoint === "commercials" || endpoint === "residentials") {
              if (selectedOptions.includes("With Parking")) {
                queryParts.push("parking=true");
              } else if (selectedOptions.includes("None")) {
                queryParts.push("parking=false");
              }
            }
          }

          // 11. Tenant Preference - Only for Residential API
          else if (section.heading === "Tenant Preference") {
            if (endpoint === "residentials") {
              if (selectedOptions.includes("Bachelor")) {
                queryParts.push("bachelorsAllowed=true");
              }
              if (selectedOptions.includes("Family Only")) {
                queryParts.push("familyOnly=true");
              }
            }
          }

          // 12. Accessibility - Commercial and Residential APIs
          else if (section.heading === "Accessibility") {
            if (endpoint === "commercials") {
              selectedOptions.forEach((opt: string) => {
                if (opt === "Lift Access") queryParts.push("liftAccess=true");
                if (opt === "Ramp Access") queryParts.push("rampAccess=true");
                if (opt === "Stair Access") queryParts.push("stairsAccess=true");
              });
            } else if (endpoint === "residentials") {
              selectedOptions.forEach((opt: string) => {
                if (opt === "Lift Access") queryParts.push("lift=true");
                if (opt === "Ramp Access") queryParts.push("ramp=true");
                if (opt === "Stair Access") queryParts.push("steps=true");
              });
            }
          }

          // Filters that need frontend handling (not supported by API)
          // Area, Floors, Type will be handled after API response
        }
      });

      // Add status filter from tab
      if (status) {
        const statusFormatted = status.charAt(0).toUpperCase() + status.slice(1);
        queryParts.push(`status=${statusFormatted}`);
      }

      // Add pagination
      queryParts.push(`page=${page}`);
      queryParts.push(`limit=${FILTER_PAGE_SIZE}`);

      const baseUrl = `${import.meta.env.VITE_BackEndUrl}/api/${endpoint}`;
      const queryString = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
      const fullUrl = baseUrl + queryString;

      const response = await axios.get(fullUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Derive total count for filtered results if available
      try {
        let totalForFiltered: number | null = null;
        if (endpoint === "all") {
          const d = response?.data?.data;
          const rT = d?.residential?.total ?? 0;
          const cT = d?.commercial?.total ?? 0;
          const pT = d?.plot?.total ?? 0;
          totalForFiltered = rT + cT + pT;
        } else {
          totalForFiltered = typeof response?.data?.total === "number" ? response.data.total : null;
        }
        if (totalForFiltered !== null) setFilterTotalCount(totalForFiltered);
      } catch {}

      // RESPONSE PARSING based on your API response structure
      let result: Property[] = [];

      if (endpoint === "all") {
        // For /api/all - based on your response structure
        const dataObj = response.data;

        if (dataObj?.success && dataObj?.data) {
          const residentialItems: Property[] = dataObj.data.residential?.items || [];
          const commercialItems: Property[] = dataObj.data.commercial?.items || [];
          const plotItems: Property[] = dataObj.data.plot?.items || [];

          result = [...residentialItems, ...commercialItems, ...plotItems];
        }
      } else {
        // For individual endpoints - based on your API schema response
        const dataObj = response.data;

        if (dataObj?.success && dataObj?.data) {
          result = Array.isArray(dataObj.data) ? dataObj.data : [];
        }
      }

      // FRONTEND FILTERING for filters not supported by API

      // Filter by Facing (for Residential and Plot since API doesn't support it)
      const facingFilters = filters.filter(filter =>
        ["North", "East", "West", "South", "North East", "North West", "South East", "South West"].includes(filter)
      );

      if (facingFilters.length > 0 && (endpoint === "residentials" || endpoint === "plots")) {
        result = result.filter((item: Property) => {
          return item.facingDirection !== undefined && facingFilters.includes(item.facingDirection);
        });
      }

      // Filter by Type (Residential/Commercial/Plot)
      const typeFilter = filters.find(filter =>
        ["Residential", "Commercial", "Plot"].includes(filter)
      );

      if (typeFilter) {
        result = result.filter((item: Property) => {
          if (typeFilter === "Residential") return "residentialType" in item && item.residentialType;
          if (typeFilter === "Commercial") return "commercialType" in item && item.commercialType;
          if (typeFilter === "Plot") return "plotType" in item && item.plotType;
          return true;
        });
      }

      // Filter by Area (frontend filtering)
      const areaFilters = filters.filter(filter =>
        ["Under 500 sq.ft", "500-1000 sq.ft", "1000-2000 sq.ft", "2000-5000 sq.ft", "Above 5000 sq.ft"].includes(filter)
      );

      if (areaFilters.length > 0) {
        result = result.filter((item: Property) => {
          const areaText = item.area?.totalArea || "0";
          const areaNum = parseInt(areaText.replace(/[^0-9]/g, ""));

          return areaFilters.some(filter => {
            switch (filter) {
              case "Under 500 sq.ft": return areaNum < 500;
              case "500-1000 sq.ft": return areaNum >= 500 && areaNum <= 1000;
              case "1000-2000 sq.ft": return areaNum > 1000 && areaNum <= 2000;
              case "2000-5000 sq.ft": return areaNum > 2000 && areaNum <= 5000;
              case "Above 5000 sq.ft": return areaNum > 5000;
              default: return true;
            }
          });
        });
      }

      // Filter by Floors (frontend filtering)
      const floorFilters = filters.filter(filter =>
        ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor", "4th Floor", "5th Floor", "Above 5th Floor"].includes(filter)
      );

      if (floorFilters.length > 0) {
        result = result.filter((item: Property) => {
          const floor = item.propertyFloor || 0;

          return floorFilters.some(filter => {
            switch (filter) {
              case "Ground Floor": return floor === 0;
              case "1st Floor": return floor === 1;
              case "2nd Floor": return floor === 2;
              case "3rd Floor": return floor === 3;
              case "4th Floor": return floor === 4;
              case "5th Floor": return floor === 5;
              case "Above 5th Floor": return floor > 5;
              default: return true;
            }
          });
        });
      }

      if (append) {
        setTableValues((prev) => [...prev, ...result]);
      } else {
        setTableValues(result);
      }
      setFilterHasMore(result.length >= FILTER_PAGE_SIZE);
      setFilterPage(page);
      setFilterLoading(false);

    } catch (error) {
      console.error("Fetch error:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        console.error("Response status:", error.response?.status);
        console.error("Request URL:", error.config?.url);
      }
      setTableValues([]);
      setFilterHasMore(false);
      setFilterLoading(false);
    }
  };


const handleApply = () => {
  setIsFiltered(true);
  setFilterPage(1);
  setFilterHasMore(true);
  setFilterTotalCount(null);
  fetchFilteredData(currentCheckList, value, 1, false);
  localStorage.setItem("appliedFilters", JSON.stringify({
    filters: currentCheckList,
    tabIndex: value
  }));
  handleClose();
};

// Load more for filtered mode
const handleFilteredLoadMore = React.useCallback(() => {
  if (filterLoading || !filterHasMore) return;
  fetchFilteredData(currentCheckList, value, filterPage + 1, true);
}, [filterLoading, filterHasMore, currentCheckList, value, filterPage]);


useEffect(() => {
  const savedFilters = localStorage.getItem("appliedFilters");
  if (savedFilters) {
    const { filters, tabIndex } = JSON.parse(savedFilters);
    setValue(tabIndex);
    dispatch(setActiveTab(tabIndex));
    setCurrentCheckList(filters);
    setIsFiltered(true); // apply filters again
    setFilterPage(1);
    setFilterHasMore(true);
    fetchFilteredData(filters, tabIndex, 1, false);
  } else {
    // no saved filters
    setValue(0);
    dispatch(setActiveTab(0));
    setIsFiltered(false);
    setCurrentCheckList([]);
    const pendingItems = allItems.filter((item) => isMatchingStatus(item.status, "pending"));
    setTableValues(pendingItems);
    setCurrentActiveTab("pending");
  }
}, [properties]);


  useEffect(() => {
    if (!isFiltered) {
      const status = statusByTab[value];

      let filtered = allItems.filter((item: Property) => isMatchingStatus(item.status, status));

      if (searchQuery.trim()) {
        const search = searchQuery.toLowerCase();
        filtered = filtered.filter((item) =>
          [
            item?.location?.address,
            item?.location?.landmark,
            item?.title,
            item?.type,
            item?.propertyType,
            item?.commercialType,
            item?.plotType,
            item?.furnishingType,
            item?.facingDirection,
            item?.totalFloors?.toString(),
            item?.washroom?.toString(),
            item?.area?.totalArea?.toString(),
          ]
            .map((field) => (field ?? "").toLowerCase())
            .some((field) => field.includes(search))
        );
      }

      setTableValues(filtered);
    }
  }, [searchQuery, value, isFiltered, allItems]);

  // filterResetFunction
const filterResetFunction = () => {
  setCurrentCheckList([]);
  setIsFiltered(false);
  localStorage.removeItem("appliedFilters"); // <- remove saved filters
  setFilterPage(1);
  setFilterHasMore(true);
  setFilterLoading(false);
  setFilterTotalCount(null);
  setDrawerOpen(false);
  setResetCounter((prev) => prev + 1);
  if (onReset) onReset();
};


  // count function
  const totalsReady = useMemo(() => {
    return !!statusTotals &&
      ((statusTotals.pending ?? 0) + (statusTotals.approved ?? 0) + (statusTotals.rejected ?? 0) + (statusTotals.deleted ?? 0)) > 0;
  }, [statusTotals]);

  const handlePendingCount = useMemo((): number => {
    if (totalsReady && statusTotals) return statusTotals.pending;
    const allItems = [
      ...(data.residential || []),
      ...(data.commercial || []),
      ...(data.plot || []),
      ...(data.all || []),
    ];
    return allItems.filter((item) => item.status?.toLowerCase() === "pending").length;
  }, [data, totalsReady, statusTotals]);

  const handleApprovedCount = useMemo((): number => {
    if (totalsReady && statusTotals) return statusTotals.approved;
    const allItems = [
      ...(data.residential || []),
      ...(data.commercial || []),
      ...(data.plot || []),
      ...(data.all || []),
    ];
    return allItems.filter((item) => item.status?.toLowerCase() === "approved").length;
  }, [data, totalsReady, statusTotals]);

  const handleRejectedCount = useMemo((): number => {
    if (totalsReady && statusTotals) return statusTotals.rejected;
    const allItems = [
      ...(data.residential || []),
      ...(data.commercial || []),
      ...(data.plot || []),
      ...(data.all || []),
    ];
    return allItems.filter((item) => item.status?.toLowerCase() === "rejected").length;
  }, [data, totalsReady, statusTotals]);

const handleDeletedCount = useMemo((): number => {
    if (totalsReady && statusTotals) return statusTotals.deleted;
    const allItems = [
      ...(data.residential || []),
      ...(data.commercial || []),
      ...(data.plot || []),
      ...(data.all || []),
    ];
    return allItems.filter((item) => isMatchingStatus(item.status, "deleted")).length;
  }, [data, totalsReady, statusTotals]);

  function formatCount(count: number): string {
    return count === -1 ? "..." : `${count}`;
  }

  //resultcount
  // @ts-ignore
  const handleFilteredCount = useMemo(() => {
    return tableValues.length;
  }, [tableValues]);

  const getResultCount = useMemo(() => {
    // Always reflect the number of items currently visible for the active tab
    return tableValues.length;
  }, [tableValues]);

  const displayedTotalCount = useMemo(() => {
    return isFiltered ? (filterTotalCount ?? tableValues.length) : (totalCount ?? tableValues.length);
  }, [isFiltered, filterTotalCount, tableValues.length, totalCount]);
  // filter drawer

  const toggleDrawer =
    (drawerOpen: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent | DrawerEvent) => {
        if (
          event &&
          "type" in event &&
          event.type === "keydown" &&
          ((event as React.KeyboardEvent).key === "Tab" ||
            (event as React.KeyboardEvent).key === "Shift")
        ) {
          return;
        }

        setDrawerOpen(drawerOpen);
      };

  // card view
  const [cardView, setCardView] = useState(false);
  //const [isFixed, setIsFixed] = useState(false);
  // sticky function
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleChangeSwitch = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (!newAlignment) return;
    setAlignment(newAlignment);
    setCardView(newAlignment === "Card View");
  };

  const handleChildScroll = (scrollTop: number) => {
    //setIsFixed(scrollTop > 50);
    const currentScrollY = scrollTop;

    // Show header when scrolling up
    if (currentScrollY < lastScrollY || currentScrollY < 20) {
      setHideHeader(false);
    } else {
      setHideHeader(true);
    }

    setLastScrollY(currentScrollY);
    //@ts-ignore
    onScrollChangeParent(scrollTop);
  };
  const checkListCount = currentCheckList.length;

  // Bind infinite scroll props depending on filter mode
  const onScrollLoadMore = isFiltered ? handleFilteredLoadMore : (onScrollLoadMoreProp ?? (() => { }));
  const loading = isFiltered ? filterLoading : (loadingProp ?? false);
  const hasMore = isFiltered ? filterHasMore : (hasMoreProp ?? false);

  //format data
  const formatData: PropertyItem[] = Array.isArray(data)
    ? data.map((item) => ({
      _id: item._id ?? "",
      propertyType: item.propertyType ?? "",
      location: {
        landmark: item.location?.landmark ?? "",
        address: item.location?.address ?? "",
      },
      rent: item.rent ?? {},
    }))
    : [
      ...(data?.residential ?? []),
      ...(data?.commercial ?? []),
      ...(data?.plot ?? []),
    ].map((item) => ({
      _id: item._id ?? "",
      propertyType: item.propertyType ?? "",
      location: {
        landmark: item.location?.landmark ?? "",
        address: item.location?.address ?? "",
      },
      rent: item.rent ?? {},
    }));
  // handlemodal
  // REPLACE YOUR FUNCTION WITH THIS - No more 'any'
  const handleOpenModal = (
    action: "Approve" | "Deny" | "Delete",
    item: Property
  ) => {
    setSelectedAction(action);
    setSelectedItem({
      _id: item._id ?? "",
      propertyType: item.propertyType ?? "",
      location: {
        landmark: item.location?.landmark ?? "",
        address: item.location?.address ?? "",
      },
      rent: item.rent ? {
        rentAmount: item.rent.rentAmount?.toString()
      } : undefined,
      images: item.images,
      createdAt: item.createdAt,
      //@ts-ignore
      postOwner: 'postOwner' in item ? item.postOwner : undefined,
      area: 'area' in item ? item.area : undefined,
      title: 'title' in item ? item.title : undefined,
      commercialType: 'commercialType' in item ? item.commercialType : undefined,
    });
    setOpen(true);
  };

  // const statusMap: Record<"Approve" | "Deny" | "Delete", number> = {
  //   Approve: 1,
  //   Deny: 0,
  //   Delete: 2,
  // };

  const imageMap: Record<"Approve" | "Deny" | "Delete", string> = {
    Approve: ApproveIcon,
    Deny: DenyIcon,
    Delete: DeleteIcon,
  };

  const getSingularProperty = () => {
    switch (properties) {
      case "residentials":
        return "residential";
      case "commercials":
        return "commercial";
      case "plots":
        return "plot";
      default:
        return "residential";
    }
  };

  const handleAction = async (id: string, status: number) => {
    try {
      //@ts-ignore
      const response = await axios.put(
        `${import.meta.env.VITE_BackEndUrl}/api/adminpermission`,
        {
          status: `${status}`,
          properties: [
            {
              type: getSingularProperty(),
              id: id,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedAction(null);
    setSelectedItem(null);
  };

  const handleConfirmAction = async (id: string, status: number) => {
    try {
      setIsBackdropLoading(true);
      await handleAction(id, status);
      handleCloseModal();
      window.dispatchEvent(new Event("refreshTableData"));
    } catch (e) {
      console.error("Error performing action:", e);
    } finally {
      setIsBackdropLoading(false); // hide loading
    }
  };

  const handleConfirmButtonClick = () => {
    if (!selectedItem?._id || !selectedAction) return;
    const statusCode = { Approve: 1, Deny: 0, Delete: 2 }[selectedAction];
    handleConfirmAction(selectedItem._id, statusCode);
  };
  return (
    <div id="pending-approval-tab">
      <div>
        <Box
        // sx={{
        //   //display: hideHeader ? "block" : "none",
        //   position: hideHeader ? "fixed" : "static",
        //   zIndex: "99",
        //   width: hideHeader ? "66%" : "100%",
        //   backgroundColor: "#ffffff",
        //   top: hideHeader ? "0px" : "124px",
        // }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              // paddingBottom: hideHeader ? "0" : "24px",
              display: hideHeader ? "block" : "true",
              // "& .MuiTabs-flexContainer": {
              //   flexWrap: "wrap",
              // },
            }}
            id="pending-approval-tabs-wrap"
          >
            <Tab
              value={0}
              label={
                <React.Fragment>
                  Pending &nbsp;
                  {value !== 0 && (
                    <span style={{ fontSize: "smaller" }}>
                      ({formatCount(handlePendingCount)})
                    </span>
                  )}
                </React.Fragment>
              }
              {...a11yProps(0)}
              icon={
                <Avatar
                  alt="test avatar"
                  src={`${import.meta.env.VITE_BASE_URL}/pending-action.svg`}
                />
              }
              iconPosition="start"
              className={currentActiveTab === "pending" ? "active" : ""}
            />

            <Tab
              value={1}
              label={
                <React.Fragment>
                  Approved &nbsp;
                  {value !== 1 && (
                    <span style={{ fontSize: "smaller" }}>
                      ({formatCount(handleApprovedCount)})
                    </span>
                  )}
                </React.Fragment>
              }
              {...a11yProps(1)}
              icon={
                <Avatar
                  alt="test avatar"
                  src={`${import.meta.env.VITE_BASE_URL}/pending-approval.svg`}
                />
              }
              iconPosition="start"
              className={currentActiveTab === "approved" ? "active" : ""}
            />

            <Tab
              value={2}
              label={
                <React.Fragment>
                  Rejected &nbsp;
                  {value !== 2 && (
                    <span style={{ fontSize: "smaller" }}>
                      ({formatCount(handleRejectedCount)})
                    </span>
                  )}
                </React.Fragment>
              }
              {...a11yProps(2)}
              icon={
                <Avatar
                  alt="test avatar"
                  src={`${import.meta.env.VITE_BASE_URL}/pending-reject.svg`}
                />
              }
              iconPosition="start"
              className={currentActiveTab === "rejected" ? "active" : ""}
            />

            <Tab
              value={3}
              label={
                <React.Fragment>
                  Deleted &nbsp;
                  {value !== 3 && (
                    <span style={{ fontSize: "smaller" }}>
                      ({formatCount(handleDeletedCount)})
                    </span>
                  )}
                </React.Fragment>
              }
              {...a11yProps(3)}
              icon={
                <Avatar
                  alt="test avatar"
                  src={`${import.meta.env.VITE_BASE_URL}/pending-delete.svg`}
                />
              }
              iconPosition="start"
              className={currentActiveTab === "deleted" ? "active" : ""}
            />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <div className="new-listing-wrap">
              <div className="container">
                <div className="new-listing">
                  <div className="new-listing-wrap-list">
                    {!isExpanded && (
                      <h3>
                        <span className="resultCount">{getResultCount}</span>{" "}
                        {getResultCount === 1 ? "Property" : "Properties"} of
                        <span className="ms-2">{displayedTotalCount}</span>
                      </h3>
                    )}
                    {checkListCount !== 0 && (
                      <button
                        className="clear-btn"
                        onClick={() => {
                          filterResetFunction();
                        }}
                      >
                        <img
                          src={`${import.meta.env.VITE_BASE_URL
                            }/dashboardtab/ic_round-clear-16.svg`}
                          alt="close icon"
                        />
                        Clear Filter
                      </button>
                    )}
                  </div>

                  <div className="list-panel">
                    <div className="search">
                      <input
                        type="search"
                        placeholder="Search Properties"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        disabled
                      />
                      <img src="Search-1.svg" alt="search svg" />
                    </div>
                    <div className="list-card-toggle">
                      <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChangeSwitch}
                        aria-label="Platform"
                      >
                        <ToggleButton value="List View">
                          <img
                            src={`${import.meta.env.VITE_BASE_URL
                              }/dashboardtab/solar_list-linear.svg`}
                            alt="list-view"
                          />
                          List
                        </ToggleButton>
                        <ToggleButton value="Card View">
                          <img
                            src={`${import.meta.env.VITE_BASE_URL
                              }/dashboardtab/system-uicons_card-view.svg`}
                            alt="card-view"
                          />
                          Card
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                    <div className="filter-link color-edit">
                      <Button
                        className="filter-text"
                        aria-describedby={id}
                        // onClick={handleClick}
                        onClick={toggleDrawer(true)}
                      >
                        <img
                          src={`${import.meta.env.VITE_BASE_URL
                            }/majesticons_filter-line.svg`}
                          alt="filter img"
                        />
                        Filter{" "} &nbsp;
                        {checkListCount > 0 && (
                          <span className="count-badge">({checkListCount})</span>
                        )}
                      </Button>
                    </div>
                    {alignment === "Card View" && (
                      <div className="sort-link color-edit">
                        <Button
                          ref={buttonRef}
                          className="filter-text"
                          onClick={() => setIsPopoverOpen(true)}
                          variant="outlined"
                        >
                          <img
                            src={`${import.meta.env.VITE_BASE_URL
                              }/material-symbols_sort-rounded.svg`}
                            alt="sort icon"
                            style={{ marginRight: 8 }}
                          />
                          {selectedLabel}
                        </Button>

                        <BasicPopover
                          triggerRef={buttonRef as React.RefObject<HTMLElement>}
                          openOnClick={isPopoverOpen}
                          onClosePopover={() => setIsPopoverOpen(false)}
                          items={sortOptions}
                          selectedLabel={selectedLabel}
                          onSelect={handleSortSelect}
                          onSortChange={handleSortSelect}
                          options={sortOptions} // also pass this or remove from props interface
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="new-listing-wrap">
              <div className="container">
                <div className="new-listing">
                  <div className="new-listing-wrap-list">
                    {!isExpanded && (
                      <h3>
                        <span className="resultCount">{getResultCount}</span>{" "}
                        {getResultCount === 1 ? "Property" : "Properties"} of
                        <span className="ms-2">{displayedTotalCount}</span>
                      </h3>
                    )}
                    {checkListCount !== 0 && (
                      <button
                        className="clear-btn"
                        onClick={() => {
                          filterResetFunction();
                        }}
                      >
                        <img
                          src={`${import.meta.env.VITE_BASE_URL
                            }/dashboardtab/ic_round-clear-16.svg`}
                          alt="close icon"
                        />
                        Clear Filter
                      </button>
                    )}
                  </div>

                  <div className="list-panel">
                    <div
                      onClick={() => setIsExpanded(true)}
                      className={`search ${isExpanded ? "active" : ""}`}
                    >
                      <input type="search" placeholder="Search Properties" />
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/Search-1.svg`}
                        alt="search svg"
                      />
                    </div>
                    <div className="list-card-toggle">
                      <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChangeSwitch}
                        aria-label="Platform"
                      >
                        <ToggleButton value="List View">
                          <img
                            src={`${import.meta.env.VITE_BASE_URL
                              }/dashboardtab/solar_list-linear.svg`}
                            alt="list-view"
                          />
                          List View
                        </ToggleButton>
                        <ToggleButton value="Card View">
                          <img
                            src={`${import.meta.env.VITE_BASE_URL
                              }/dashboardtab/system-uicons_card-view.svg`}
                            alt="card-view"
                          />
                          Card View
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                    <div className="filter-link color-edit">
                      <Button
                        className="filter-text"
                        aria-describedby={id}
                        // onClick={handleClick}
                        onClick={toggleDrawer(true)}
                      >
                        <img
                          src={`${import.meta.env.VITE_BASE_URL
                            }/majesticons_filter-line.svg`}
                          alt="filter img"
                        />
                        Filter{" "}
                        {checkListCount > 0 && (
                          <span className="count-badge">{checkListCount}</span>
                        )}
                      </Button>
                    </div>
                    {alignment === "Card View" && (
                      <div className="sort-link color-edit">
                        <Button
                          ref={buttonRef}
                          className="filter-text"
                          onClick={() => setIsPopoverOpen(true)}
                          variant="outlined"
                        >
                          <img
                            src={`${import.meta.env.VITE_BASE_URL
                              }/material-symbols_sort-rounded.svg`}
                            alt="sort icon"
                            style={{ marginRight: 8 }}
                          />
                          {selectedLabel}
                        </Button>

                        <BasicPopover
                          triggerRef={buttonRef as React.RefObject<HTMLElement>}
                          openOnClick={isPopoverOpen}
                          onClosePopover={() => setIsPopoverOpen(false)}
                          items={sortOptions}
                          selectedLabel={selectedLabel}
                          onSelect={handleSortSelect}
                          onSortChange={handleSortSelect}
                          options={sortOptions} // also pass this or remove from props interface
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div className="new-listing-wrap">
              <div className="container">
                <div className="new-listing">
                  <div className="new-listing-wrap-list">
                    {!isExpanded && (
                      <h3>
                        <span className="resultCount">{getResultCount}</span>{" "}
                        {getResultCount === 1 ? "Property" : "Properties"} of
                        <span className="ms-2">{displayedTotalCount}</span>
                      </h3>
                    )}
                    {checkListCount !== 0 && (
                      <button
                        className="clear-btn"
                        onClick={() => {
                          filterResetFunction();
                        }}
                      >
                        <img
                          src={`${import.meta.env.VITE_BASE_URL
                            }/dashboardtab/ic_round-clear-16.svg`}
                          alt="close icon"
                        />
                        Clear Filter
                      </button>
                    )}
                  </div>

                  <div className="list-panel">
                    <div
                      onClick={() => setIsExpanded(true)}
                      className={`search ${isExpanded ? "active" : ""}`}
                    >
                      <input type="search" placeholder="Search Properties" />
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/Search-1.svg`}
                        alt="search svg"
                      />
                    </div>
                    <div className="list-card-toggle">
                      <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChangeSwitch}
                        aria-label="Platform"
                      >
                        <ToggleButton value="List View">
                          <img
                            src={`${import.meta.env.VITE_BASE_URL
                              }/dashboardtab/solar_list-linear.svg`}
                            alt="list-view"
                          />
                          List View
                        </ToggleButton>
                        <ToggleButton value="Card View">
                          <img
                            src={`${import.meta.env.VITE_BASE_URL
                              }/dashboardtab/system-uicons_card-view.svg`}
                            alt="card-view"
                          />
                          Card View
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                    <div className="filter-link color-edit">
                      <Button
                        className="filter-text"
                        aria-describedby={id}
                        // onClick={handleClick}
                        onClick={toggleDrawer(true)}
                      >
                        <img
                          src={`${import.meta.env.VITE_BASE_URL
                            }/majesticons_filter-line.svg`}
                          alt="filter img"
                        />
                        Filter{" "}
                        {checkListCount > 0 && (
                          <span className="count-badge">{checkListCount}</span>
                        )}
                      </Button>
                    </div>
                    {alignment === "Card View" && (
                      <div className="sort-link color-edit">
                        <Button
                          ref={buttonRef}
                          className="filter-text"
                          onClick={() => setIsPopoverOpen(true)}
                          variant="outlined"
                        >
                          <img
                            src={`${import.meta.env.VITE_BASE_URL
                              }/material-symbols_sort-rounded.svg`}
                            alt="sort icon"
                            style={{ marginRight: 8 }}
                          />
                          {selectedLabel}
                        </Button>

                        <BasicPopover
                          triggerRef={buttonRef as React.RefObject<HTMLElement>}
                          openOnClick={isPopoverOpen}
                          onClosePopover={() => setIsPopoverOpen(false)}
                          items={sortOptions}
                          selectedLabel={selectedLabel}
                          onSelect={handleSortSelect}
                          onSortChange={handleSortSelect}
                          options={sortOptions} // also pass this or remove from props interface
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <div className="new-listing-wrap">
              <div className="container">
                <div className="new-listing">
                  <div className="new-listing-wrap-list">
                    {!isExpanded && (
                      <h3>
                        <span className="resultCount">{getResultCount}</span>{" "}
                        {getResultCount === 1 ? "Property" : "Properties"} of
                        <span className="ms-2">{displayedTotalCount}</span>
                      </h3>
                    )}
                    {checkListCount !== 0 && (
                      <button
                        className="clear-btn"
                        onClick={() => {
                          filterResetFunction();
                        }}
                      >
                        <img
                          src={`${import.meta.env.VITE_BASE_URL
                            }/dashboardtab/ic_round-clear-16.svg`}
                          alt="close icon"
                        />
                        Clear Filter
                      </button>
                    )}
                  </div>

                  <div className="list-panel">
                    <div
                      onClick={() => setIsExpanded(true)}
                      className={`search ${isExpanded ? "active" : ""}`}
                    >
                      <input type="search" placeholder="Search Properties" />
                      <img src="Search-1.svg" alt="search svg" />
                    </div>
                    <div className="list-card-toggle">
                      <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChangeSwitch}
                        aria-label="Platform"
                      >
                        <ToggleButton value="List View">
                          <img
                            src={`${import.meta.env.VITE_BASE_URL
                              }/dashboardtab/solar_list-linear.svg`}
                            alt="list-view"
                          />
                          List View
                        </ToggleButton>
                        <ToggleButton value="Card View">
                          <img
                            src={`${import.meta.env.VITE_BASE_URL
                              }/dashboardtab/system-uicons_card-view.svg`}
                            alt="card-view"
                          />
                          Card View
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                    <div className="filter-link color-edit">
                      <Button
                        className="filter-text"
                        aria-describedby={id}
                        // onClick={handleClick}
                        onClick={toggleDrawer(true)}
                      >
                        <img
                          src={`${import.meta.env.VITE_BASE_URL
                            }/majesticons_filter-line.svg`}
                          alt="filter img"
                        />
                        Filter{" "}
                        {checkListCount > 0 && (
                          <span className="count-badge">{checkListCount}</span>
                        )}
                      </Button>
                    </div>
                    {alignment === "Card View" && (
                      <div className="sort-link color-edit">
                        <Button
                          ref={buttonRef}
                          className="filter-text"
                          onClick={() => setIsPopoverOpen(true)}
                          variant="outlined"
                        >
                          <img
                            src={`${import.meta.env.VITE_BASE_URL
                              }/material-symbols_sort-rounded.svg`}
                            alt="sort icon"
                            style={{ marginRight: 8 }}
                          />
                          {selectedLabel}
                        </Button>

                        <BasicPopover
                          triggerRef={buttonRef as React.RefObject<HTMLElement>}
                          openOnClick={isPopoverOpen}
                          onClosePopover={() => setIsPopoverOpen(false)}
                          items={sortOptions}
                          selectedLabel={selectedLabel}
                          onSelect={handleSortSelect}
                          onSortChange={handleSortSelect}
                          options={sortOptions} // also pass this or remove from props interface
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CustomTabPanel>

          {open && selectedItem && selectedAction && (
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <img src={imageMap[selectedAction]} alt="action icon" />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Confirm {selectedAction}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Are you sure you want to {selectedAction.toLowerCase()} the
                  listing <strong>{selectedItem?.location?.address}</strong>?
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirmButtonClick}
                >
                  Confirm
                </Button>
                <Button variant="outlined" onClick={handleCloseModal}>
                  Cancel
                </Button>
              </Box>
            </Modal>
          )}
        </Box>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isBackdropLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>

      <CustomTabPanel value={value} index={0}>
        {!cardView ? (
          <Table
            //@ts-ignore
            data={tableValues.map(item => ({
              ...item,
              price: 0,
              description: item.description || ""
            }))}
            properties={properties === "postedProperties" ? "myposts" : properties}
            onScrollLoadMore={onScrollLoadMore ?? (() => { })}
            loading={loading ?? false}
            hasMore={hasMore ?? false}
            //@ts-ignore
            handleOpenModal={handleOpenModal as (action: "Approve" | "Deny" | "Delete", item: Property) => void}
            tabType="pending"
            currentActiveTab={currentActiveTab}
            onTabChange={(tab) =>
              setCurrentActiveTab(tab.toLowerCase() as TabStatusType)
            }
          />
        ) : (
          <PropertyCardList
            sortOption={selectedSort}
            formatData={formatData}
            properties={tableValues}
            onScrollChange={handleChildScroll}
            handleOpenModal={handleOpenModal}
            currentActiveTab={currentActiveTab}
            onScrollLoadMore={onScrollLoadMore ?? (() => { })}
            loading={loading ?? false}
            hasMore={hasMore ?? false}
          />
        )}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        {!cardView ? (
          <Table
            //@ts-ignore
            data={tableValues.map(item => ({
              ...item,
              price: 0,
              description: item.description || ""
            }))}
            properties={properties === "postedProperties" ? "myposts" : properties}
            onScrollLoadMore={onScrollLoadMore ?? (() => { })}
            loading={loading ?? false}
            hasMore={hasMore ?? false}
            //@ts-ignore
            handleOpenModal={handleOpenModal as (action: "Approve" | "Deny" | "Delete", item: Property) => void}
            tabType="approved"
            currentActiveTab={currentActiveTab}
            onTabChange={(tab) =>
              setCurrentActiveTab(tab.toLowerCase() as TabStatusType)
            }
          />
        ) : (
          <PropertyCardList
            sortOption={selectedSort}
            properties={tableValues}
            onScrollChange={handleChildScroll}
            formatData={formatData}
            handleOpenModal={handleOpenModal}
            currentActiveTab={currentActiveTab}
            onScrollLoadMore={onScrollLoadMore ?? (() => { })}
            loading={loading ?? false}
            hasMore={hasMore ?? false}
          />
        )}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        {!cardView ? (
          <Table
            //@ts-ignore
            data={tableValues.map(item => ({
              ...item,
              price: 0,
              description: item.description || ""
            }))}
            properties={properties === "postedProperties" ? "myposts" : properties}
            onScrollLoadMore={onScrollLoadMore ?? (() => { })}
            loading={loading ?? false}
            hasMore={hasMore ?? false}
            //@ts-ignore
            handleOpenModal={handleOpenModal as (action: "Approve" | "Deny" | "Delete", item: Property) => void}
            tabType="rejected"
            currentActiveTab={currentActiveTab}
            onTabChange={(tab) =>
              setCurrentActiveTab(tab.toLowerCase() as TabStatusType)
            }
          />
        ) : (
          <PropertyCardList
            sortOption={selectedSort}
            properties={tableValues}
            onScrollChange={handleChildScroll}
            formatData={formatData}
            handleOpenModal={handleOpenModal}
            currentActiveTab={currentActiveTab}
            onScrollLoadMore={onScrollLoadMore ?? (() => { })}
            loading={loading ?? false}
            hasMore={hasMore ?? false}
          />
        )}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={3}>
        {!cardView ? (
          <Table
            //@ts-ignore
            data={tableValues.map(item => ({
              ...item,
              price: 0,
              description: item.description || ""
            }))}
            properties={properties === "postedProperties" ? "myposts" : properties}
            onScrollLoadMore={onScrollLoadMore ?? (() => { })}
            loading={loading ?? false}
            hasMore={hasMore ?? false}
            //@ts-ignore
            handleOpenModal={handleOpenModal as (action: "Approve" | "Deny" | "Delete", item: Property) => void}
            tabType="deleted"
            currentActiveTab={currentActiveTab}
            onTabChange={(tab) =>
              setCurrentActiveTab(tab.toLowerCase() as TabStatusType)
            }
          />
        ) : (
          <PropertyCardList
            sortOption={selectedSort}
            properties={tableValues}
            onScrollChange={handleChildScroll}
            formatData={formatData}
            handleOpenModal={handleOpenModal}
            currentActiveTab={currentActiveTab}
            onScrollLoadMore={onScrollLoadMore ?? (() => { })}
            loading={loading ?? false}
            hasMore={hasMore ?? false}
          />

        )}
      </CustomTabPanel>


      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className="filter-div-wrapper">
          <div className="filter-header">
            <p>
              <img
                src={`${import.meta.env.VITE_BASE_URL
                  }/dashboardtab/icon-park-outline_down.svg`}
                alt="icon park"
                style={{ cursor: "pointer" }}
                onClick={() => setDrawerOpen(false)}
              />
              &nbsp; Filter By
            </p>
            <p className="filtercount">

              Filter{checkListCount > 1 ? "s" : ""} &nbsp;
              {checkListCount > 0 && (
                <span className="count-badge">({checkListCount})</span>
              )}
            </p>
          </div>
          <div className="checklist-content row">
            {(
              filterOptions[properties === "all" ? "all" : properties] ?? []
            ).map((section: FilterSection, index: number) => (
              <div className="checklist-list col-md-12" key={index}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography variant="h6">{section.heading}</Typography>
                  </AccordionSummary>

                  <AccordionDetails key={resetCounter}>
                    <div className="label-wrapper">
                      {section.options.map((opt: string, i: number) => (
                        <FormControlLabel
                          key={i}
                          control={
                            <Checkbox
                              checked={currentCheckList.includes(opt)}
                              onChange={() => handleCheckboxChange(opt)}
                              inputProps={{ "aria-label": opt }}
                            />
                          }
                          label={opt}
                        />
                      ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>
          <div className="apply-reset-btn">
            <button
              className="clear-btn"
              onClick={() => {
                filterResetFunction();
              }}
            >
              <img
                src={`${import.meta.env.VITE_BASE_URL
                  }/dashboardtab/ic_round-clear-24.svg`}
                alt="close icon"
              />
              Clear
            </button>
            <GenericButton
              image={filterTick}
              iconPosition="left"
              label={"Apply"}
              className="genericFilterApplyStyles"
              onClick={() => {
                handleApply(); // your filter logic
                setDrawerOpen(false); // closes the drawer
              }}
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
}

interface ProCardProps {
  properties: Property[];
  onScrollChange: (scrollTop: number) => void;
  formatData: PropertyItem[];
  handleOpenModal: (action: "Approve" | "Deny" | "Delete", item: Property) => void;
  sortOption: string;
  currentActiveTab: TabStatusType;
  onScrollLoadMore: () => void;
  loading: boolean;
  hasMore: boolean;
}
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const PropertyCardList = ({
  properties,
  currentActiveTab,
  onScrollChange,
  handleOpenModal,
  sortOption,
  onScrollLoadMore,
  loading,
  hasMore,
}: ProCardProps) => {
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const formatedData: (PropertyItem & PropertyViewWithSource)[] = properties.map(
    (prop: Property): PropertyItem & PropertyViewWithSource => ({
      _source: 'commercialType' in prop ? 'commercial' :
        'plotType' in prop ? 'plot' : 'residential',
      _id: prop._id ?? "",
      propertyType: prop.propertyType ?? "",
      location: prop.location,
      rent: prop.rent ? {
        rentAmount: prop.rent.rentAmount?.toString()
      } : undefined,
      images: prop.images,
      createdAt: ('createdAt' in prop ? prop.createdAt : undefined),
      //@ts-ignore
      postOwner: ('postOwner' in prop ? prop.postOwner : undefined),
      area: ('area' in prop ? prop.area : undefined),
      title: ('title' in prop ? prop.title : undefined),
      commercialType: ('commercialType' in prop ? prop.commercialType : undefined),
    })
  );
  const [sortedData, setSortedData] = useState<Property[]>(properties);

  // const allIds = formatedData.map((data: PropertyItem) => data._id);
  // const [visibleCount, setVisibleCount] = useState<number>(5);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Debounced scroll handler for infinite scroll
  const handleScroll = debounce(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;
    const scrollHeight = container.scrollHeight;
    const threshold = 150;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

    if (distanceFromBottom <= threshold && !loading && hasMore) {
      onScrollLoadMore();
    }
  }, 200);

  useEffect(() => {
    setSortedData(properties); // sync when new props arrive
  }, [properties]);

  useEffect(() => {
    let sorted = [...properties];

    switch (sortOption) {
      case "Newest":
        sorted.sort(
          (a, b) =>
            new Date(('createdAt' in b ? b.createdAt : '') ?? 0).getTime() -
            new Date(('createdAt' in a ? a.createdAt : '') ?? 0).getTime()
        );
        break;
      case "Oldest":
        sorted.sort(
          (a, b) =>
            new Date(('createdAt' in a ? a.createdAt : '') ?? 0).getTime() -
            new Date(('createdAt' in b ? b.createdAt : '') ?? 0).getTime()
        );
        break;
      case "Price: High to Low":
        sorted.sort(
          (a, b) =>
            parseFloat(String(a?.rent?.rentAmount ?? "0")) -
            parseFloat(String(b?.rent?.rentAmount ?? "0"))
        );
        break;
      case "Price: Low to High":
        sorted.sort(
          (a, b) =>
            parseFloat(String(b?.rent?.rentAmount ?? "0")) -
            parseFloat(String(a?.rent?.rentAmount ?? "0"))
        );
        break;
      default:
        sorted = [...properties];
    }

    setSortedData(sorted);
  }, [sortOption, properties]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]); //handleScroll to dependencies

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      onScrollChange(container.scrollTop); // still report scroll to parent
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [onScrollChange]);

  //change height of card container
  const [lastScrollY, setLastScrollY] = React.useState(0);
  React.useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (container) {
        onScrollChange(container.scrollTop);
      }
      // Show header when scrolling up
      const currentScrollY = container?.scrollTop || 0;
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        // setHideHeader(false);
      } else {
        // setHideHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [onScrollChange, lastScrollY, formatedData.length]);

  // popover
  const handlePopoverClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (!selectedRows.includes(event.currentTarget.value)) {
      // Only open popover if new selection is made
      setPopoverAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const isPopoverOpen = Boolean(popoverAnchorEl);
  const popoverId = isPopoverOpen ? "simple-popover" : undefined;

  const tabValue = useSelector((state: RootState) => state.SidebarTab.value);
  const getSingularPropertyType = () => {
    switch (tabValue) {
      case 2:
        return "residential";
      case 1:
        return "commercial";
      case 3:
        return "plot";
      default:
        return "residential";
    }
  };

  const handleEdit = (item: EditableProperty) => {
    // const singularProperty = getSingularPropertyType();

    const singularProperty = getSingularPropertyType();

    navigate(`/${singularProperty}/create`, {
      state: {
        data: item,
        mode: "edit",
      },
    });
  };

  const handleView = (id: string | number) => {
    const selectedItem = formatedData.find(
      (item) => String(item._id) === String(id)
    );

    if (!selectedItem) {
      alert("Property not found");
      return;
    }

    const routeBase = getSingularPropertyType();

    navigate(`/${routeBase}/view/${id}`, {
      state: { data: selectedItem, mode: "view" },
    });
  };

  const handleAction = async (id: string, status: number) => {
    const singularProperty = getSingularPropertyType(); // fix here
    try {
      //@ts-ignore
      const response = await axios.put(
        `${import.meta.env.VITE_BackEndUrl
        }/api/adminpermission/${singularProperty}/${id}`,
        { status: `${status}` },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch {
      console.error("Failed to update status");
    }
  };

  // handleBulkAction on popover
  const handleBulkAction = async (action: string) => {
    const statusMap: Record<string, number> = {
      Approve: 1,
      Deny: 0,
      Delete: 2,
    };

    const statusCode = statusMap[action];

    try {
      for (const id of selectedRows) {
        await handleAction(id, statusCode); // Your API call
      }

      setSelectedRows([]); // Clear selection
      handlePopoverClose(); // Close popover
      window.dispatchEvent(new Event("refreshTableData")); // Refresh table
    } catch {
      console.error(`Failed to ${action.toLowerCase()} selected properties`);
    }
  };

  useEffect(() => {
    if (selectedRows.length === 0) {
      handlePopoverClose();
    }
  }, [selectedRows]);

  return (
    <Box sx={{ flexGrow: 1, p: 2 }} className="container-fluid">
      <Grid container spacing={2} className="row g-2">
        <Box
          ref={containerRef}
          sx={{
            maxHeight: "50vh",
            overflowY: "auto",
            overflowX: "hidden",
            width: "100%",
          }}
        >
          {sortedData.length === 0 && (
            <div
              style={{ padding: "20px", margin: "auto", textAlign: "center" }}
            >
              No properties available...
            </div>
          )}
          {(sortedData as ExtendedProperty[]).map((item: ExtendedProperty, index: number) => (
            <Grid item xs={12} sm={12} md={12} key={item._id || `property-${index}`}>
              <div className="card-view-wrapper row g-0 mb-3">
                <div className="card-view-img col-md-6 col-12">
                  <Carousel
                    images={item?.images}
                    price="£15,000 pcm"
                    area="485,700 sq. ft."
                  />
                  <input
                    type="checkbox"
                    className="cardview-checkbox"
                    aria-describedby={popoverId}
                    onClick={handlePopoverClick}
                    checked={selectedRows.includes(item._id ?? "")}
                    onChange={(e) => {
                      const itemId = item._id;
                      if (e.target.checked && itemId) {
                        setSelectedRows((prev) => [...prev, itemId]);
                      } else if (itemId) {
                        setSelectedRows((prev) =>
                          prev.filter((id) => id !== itemId)
                        );
                      }
                    }}
                  />
                </div>

                <div className="card-view-content col-12 col-md-6">
                  <div className="card-view-address-bar d-flex flex-column flex-sm-row justify-content-between align-items-start">
                    <div className="cardview-address-detailflex-fill mb-2 mb-sm-0">
                      <h6>{item.title || "No Landmark"}</h6>
                      <p>{item?.location?.address}</p>
                    </div>
                    <div className="cardview-rent">
                      <span>{item.propertyType}</span>
                    </div>
                  </div>
                  <div className="cardview-rent-amount">
                    <span className="rent-amount">
                      ₹{item?.rent?.rentAmount}
                    </span>{" "}
                    <br />
                    <span className="month">/Month</span>
                  </div>

                  <div className="cardview-posted-detail">
                    <span className="posted-span">
                      {item.postOwner?.userName || "Unknown"} | {item.createdAt || "N/A"}
                    </span>
                  </div>
                  <div className="card-view-icon-wrapper d-flex justify-content-center justify-content-sm-start gap-3 flex-wrap">
                    <div className="card-icon-view">
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/dashboardtab/view-card.png`}
                        alt="icon-edit"
                        onClick={() => item._id && handleView(item._id)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div className="card-icon-edit">
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/dashboardtab/Icon_Edit.svg`}
                        alt="icon-edit"
                        onClick={() => handleEdit(item as EditableProperty)}
                      />
                    </div>
                    {currentActiveTab !== "approved" && (
                      <div className="card-icon-approve">
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}/dashboardtab/Icon_Tick.svg`}
                          alt="icon-approve"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleOpenModal("Approve", item)}
                        />
                      </div>
                    )}
                    {currentActiveTab !== "rejected" && (
                      <div className="card-icon-deny">
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}/dashboardtab/Icon_Deny.svg`}
                          alt="icon-deny"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleOpenModal("Deny", item)}
                        />
                      </div>
                    )}
                    {currentActiveTab !== "deleted" && (
                      <div className="card-icon-delete">
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}/dashboardtab/Icon-Delete-orange.svg`}
                          alt="icon-delete"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleOpenModal("Delete", item)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Box>
      </Grid>
      <Popover
        className="checkbox-popover"
        disableScrollLock={true}
        id={popoverId}
        open={Boolean(popoverAnchorEl) && selectedRows.length > 0}
        onClose={handlePopoverClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 800, left: window.innerWidth - 725 }} // adjust position here
        disableRestoreFocus
        PaperProps={{
          style: { pointerEvents: "auto", zIndex: 1400 }, // ensure above table
        }}
      >
        <div className="checkbox-popover-content ">
          <p className="property-select">
            {selectedRows.length} Property selected
          </p>
          <div className="pop-content-divider"></div>
          {currentActiveTab.toLowerCase() !== "approved" && (
            <>
              <p
                className="property-approve"
                onClick={() => handleBulkAction("Approve")}
              >
                <img src={tickIcon} alt="Approve Icon" />
                Approve
              </p>
              <div className="pop-content-divider"></div>
            </>
          )}

          {/* Conditional Deny action - hidden in rejected tab */}
          {currentActiveTab.toLowerCase() !== "rejected" && (
            <>
              <p
                className="property-deny"
                onClick={() => handleBulkAction("Deny")}
              >
                <img src={denyIcon} alt="Deny Icon" />
                Deny
              </p>
              <div className="pop-content-divider"></div>
            </>
          )}

          {/* Conditional Delete action - hidden in deleted tab */}
          {currentActiveTab.toLowerCase() !== "deleted" && (
            <p
              className="property-delete"
              onClick={() => handleBulkAction("Delete")}
            >
              Delete
            </p>
          )}
        </div>
      </Popover>
    </Box>
  );
};