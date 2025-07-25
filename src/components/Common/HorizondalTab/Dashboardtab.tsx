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
import { TabStatus } from "./Dashboardtab.model";
import type { Property } from "../../AdminResidencial/AdminResidencial.model";
import type { PropertyViewWithSource } from "./Dashboardtab.model";

import { useNavigate } from "react-router-dom";

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
  data: PropertyData; // ✅ Accepts array now
  properties: "all" | "residentials" | "commercials" | "plots";
  onScrollChangeParent: (scrollTop: number) => void;
}

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
  onScrollChangeParent,
}: DashboardtabProps) {
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentCheckList, setCurrentCheckList] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const statusByTab = ["pending", "approved", "rejected", "deleted"];
  const [value, setValue] = useState(0);
  const dispatch = useAppDispatch();
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

  //const currentStatus = statusByTab[value];
  const filterOptions = {
    all: [
      { heading: "Property Type", options: ["Rent", "Lease", "Sale"] },
      {
        heading: "Facing",
        options: [
          "East",
          "West",
          "North",
          "South",
          "South East",
          "South West",
          "North East",
          "North West",
        ],
      },
      {
        heading: "Locality",
        options: [
          "Old Bus Stand",
          "Thuraimangalam",
          "NH-45 Bypass",
          "Collector Office Road",
          "Elambalur",
          "Sungu Pettai",
          "V.Kalathur",
        ],
      },
    ],
    residentials: [
      { heading: "Property Type", options: ["Rent", "Lease", "Sale"] },
      { heading: "Residential Type", options: ["House", "Apartment", "Villa"] },
      {
        heading: "Rooms",
        options: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"],
      },
      {
        heading: "Locality",
        options: [
          "Old Bus Stand",
          "Thuraimangalam",
          "NH-45 Bypass",
          "Collector Office Road",
          "Elambalur",
          "Sungu Pettai",
          "V.Kalathur",
        ],
      },
      {
        heading: "FurnishingType",
        options: ["Fully Furnished", "Semi Furnished", "Unfurnished"],
      },
      { heading: "Parking", options: ["None", "With Parking"] },
      { heading: "Tenant Preference", options: ["Bachelor", "Family Only"] },
      {
        heading: "Accessibility",
        options: ["Lift Access", "Ramp Access", "Stair Access"],
      },
    ],
    commercials: [
      { heading: "Property Type", options: ["Rent", "Lease", "Sale"] },
      {
        heading: "Commercial Type",
        options: [
          "Building",
          "Shop",
          "Co- working",
          "Office Space",
          "Showrrom",
          "Shed",
        ],
      },
      {
        heading: "Facing",
        options: [
          "East",
          "West",
          "North",
          "South",
          "South East",
          "South West",
          "North East",
          "North West",
        ],
      },
      {
        heading: "Locality",
        options: [
          "Old Bus Stand",
          "Thuraimangalam",
          "NH-45 Bypass",
          "Collector Office Road",
          "Elambalur",
          "Sungu Pettai",
          "V.Kalathur",
        ],
      },
      { heading: "RTO", options: ["Yes", "No"] },
      { heading: "Parking", options: ["None", "With Parking"] },
      { heading: "Washroom", options: ["None", "Private", "Common"] },
      {
        heading: "Accessibility",
        options: ["Lift Access", "Ramp Access", "Stair Access"],
      },
    ],
    plots: [
      { heading: "Property Type", options: ["Rent", "Lease", "Sale"] },
      {
        heading: "Plot Type",
        options: [
          "Commercial Use",
          "Agriculture",
          " Industrial Use",
          "Personal Use",
          "Parking",
          "Shed/Storage",
          "Poultry or Livestock",
          "Events or Functions",
          "Investment Purpose",
          "Renewable Energy Projects",
          "Timber/Tree Plantation",
          "Nursery/Gardening Business",
          "Telecom Towers",
        ],
      },
      {
        heading: "Locality",
        options: [
          "Old Bus Stand",
          "Thuraimangalam",
          "NH-45 Bypass",
          "Collector Office Road",
          "Elambalur",
          "Sungu Pettai",
          "V.Kalathur",
        ],
      },
    ],
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
      ...(data?.all|| []),
    ],
    [data]
  );

  // Handle tab change
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log("newValue", newValue);
    dispatch(setActiveTab(newValue));
    setIsFiltered(false);
    setCurrentCheckList([]);

    const newStatus = statusByTab[newValue];
    const filtered = allItems.filter(
      (item) => item.status?.toLowerCase() === newStatus.toLowerCase()
    );
    setTableValues(filtered);
  };

  useEffect(() => {
    console.log(tableValues, "vvvv");
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
  console.log("currentCheckList:", currentCheckList);

  // filter function

  const fetchFilteredData = async (filters: string[], tabIndex: number) => {
    try {
      const status = statusByTab[tabIndex];
      // Create the dynamic query string
      const queryParts: string[] = [];

      // Mapping UI headings to API keys
      const headingToKey: Record<string, string> = {
        "Property Type": "propertyType",
        FurnishingType: "furnishingType",
        "Commercial Type": "commercialType",
        Washroom: "washroom",
        "Plot Type": "plotType",
        Facing: "facing",
      };

      const filterSection =
        filterOptions[properties === "all" ? "all" : properties] || [];
      filterSection.forEach((section) => {
        const key = headingToKey[section.heading];
        const selectedOptions = section.options.filter((opt) =>
          filters.includes(opt)
        );
        if (key && selectedOptions.length) {
          queryParts.push(`${key}=${selectedOptions.join(",")}`);
        }
      });

      if (status) {
        queryParts.push(`status=${status}`);
      }

      const baseUrl = `${import.meta.env.VITE_BackEndUrl}/api/${properties}`;
      const queryString =
        queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
      const fullUrl = `${baseUrl}${queryString}`;

      console.log("Final API URL:", fullUrl);

      const response = await axios.get(fullUrl);

      const dataObj = response.data.data;
      let result: Property[] = [];

      if (properties === "residentials") result = dataObj ?? [];
      else if (properties === "commercials") result = dataObj ?? [];
      else if (properties === "plots") result = dataObj ?? [];
      else if (properties === "all") {
        result = [
          ...(dataObj.residential ?? []),
          ...(dataObj.commercial ?? []),
          ...(dataObj.plot ?? []),
        ];
      }
      const filteredByStatus = result.filter(
        (item) => item.status?.toLowerCase() === status.toLowerCase()
      );

      setTableValues(filteredByStatus);
    } catch (error) {
      console.error("Fetch error:", error);
      setTableValues([]);
    }
  };

  const handleApply = () => {
    setIsFiltered(true); // Enable filtered mode
    fetchFilteredData(currentCheckList, value); // Uses correct API and query logic
    handleClose(); // Closes the popover
  };

  useEffect(() => {
    if (!isFiltered) {
      const status = statusByTab[value];
      let filtered = allItems.filter(
        (item: Property) =>
          item.status?.toString().trim().toLowerCase() ===
          status.trim().toLowerCase()
      );
      if (searchQuery.trim()) {
        const search = searchQuery.toLowerCase();

        filtered = filtered.filter((item) => {
          return (
            item?.location?.address?.toLowerCase().includes(search) ||
            item?.location?.landmark?.toLowerCase().includes(search) ||
            item?.title?.toLowerCase().includes(search) ||
            item?.type?.toLowerCase().includes(search) ||
            item?.propertyType?.toLowerCase().includes(search) ||
            item?.commercialType?.toLowerCase().includes(search) ||
            item?.plotType?.toLowerCase().includes(search) ||
            item?.furnishingType?.toLowerCase().includes(search) ||
            item?.facingDirection?.toLowerCase().includes(search) ||
            item?.totalFloors?.toString().toLowerCase().includes(search) ||
            item?.washroom?.toString().toLowerCase().includes(search) ||
            item?.area?.totalArea?.toString().toLowerCase().includes(search)
          );
        });
      }
      setTableValues(filtered);
    }
  }, [searchQuery, value, isFiltered, allItems]);

  // filterResetFunction
  const filterResetFunction = () => {
    setCurrentCheckList([]);
    setIsFiltered(false);
    fetchFilteredData([], value);
    setDrawerOpen(false);
    setResetCounter((prev) => prev + 1);
  };

  // count function
  const handlePendingCount = useMemo((): number => {
    const allItems = [
      ...(data.residential || []),
      ...(data.commercial || []),
      ...(data.plot || []),
      ...(data.all || []),
    ];
    return allItems.filter((item) => item.status?.toLowerCase() === "pending")
      .length;
  }, [data]);

  const handleApprovedCount = useMemo((): number => {
    const allItems = [
      ...(data.residential || []),
      ...(data.commercial || []),
      ...(data.plot || []),
      ...(data.all || []),
    ];
    return allItems.filter((item) => item.status?.toLowerCase() === "approved")
      .length;
  }, [data]);

  const handleRejectedCount = useMemo((): number => {
    const allItems = [
      ...(data.residential || []),
      ...(data.commercial || []),
      ...(data.plot || []),
      ...(data.all || []),
    ];
    return allItems.filter((item) => item.status?.toLowerCase() === "rejected")
      .length;
  }, [data]);

  const handleDeletedCount = useMemo((): number => {
    const allItems = [
      ...(data.residential || []),
      ...(data.commercial || []),
      ...(data.plot || []),
      ...(data.all || []),
    ];
    return allItems.filter((item) => item.status?.toLowerCase() === "deleted")
      .length;
  }, [data]);

  //resultcount
  const handleFilteredCount = useMemo(() => {
    return tableValues.length;
  }, [tableValues]);

  const getResultCount = useMemo(() => {
    if (isFiltered) return handleFilteredCount;
    switch (value) {
      case 0:
        return handlePendingCount;
      case 1:
        return handleApprovedCount;
      case 2:
        return handleRejectedCount;
      case 3:
        return handleDeletedCount;
      default:
        return 0;
    }
  }, [
    isFiltered,
    handleFilteredCount,
    value,
    handlePendingCount,
    handleApprovedCount,
    handleRejectedCount,
    handleDeletedCount,
  ]);
  // filter drawer

  const toggleDrawer =
    (drawerOpen: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent | {}) => {
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
    onScrollChangeParent(scrollTop);
  };
  const checkListCount = currentCheckList.length;

  //format data
  //@ts-ignore
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
  const handleOpenModal = (
    action: "Approve" | "Deny" | "Delete",
    item: any
  ) => {
    setSelectedAction(action);
    setSelectedItem(item);
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
      console.log("Status updated:", response.data);
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
      setIsBackdropLoading(false); // ✅ hide loading
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
          sx={{
            //display: hideHeader ? "block" : "none",
            position: hideHeader ? "fixed" : "static",
            zIndex: "99",
            width: hideHeader ? "66%" : "100%",
            backgroundColor: "#ffffff",
            top: hideHeader ? "0px" : "124px",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              paddingBottom: hideHeader ? "0" : "24px",
              display: hideHeader ? "block" : "true",
              "& .MuiTabs-flexContainer": {
                flexWrap: "wrap",
              },
            }}
            id="pending-approval-tabs-wrap"
          >
            <Tab
              value={TabStatus.Pending}
              label={
                <React.Fragment>
                  Pending &nbsp;
                  {value !== 0 && (
                    <span style={{ fontSize: "smaller" }}>
                      ({handlePendingCount})
                    </span>
                  )}
                </React.Fragment>
              }
              {...a11yProps(0)}
              icon={
                <Avatar
                  alt="test avatar"
                  src={`${import.meta.env.BASE_URL}/pending-action.svg`}
                />
              }
              iconPosition="start"
            />

            <Tab
              value={TabStatus.Rejected}
              label={
                <React.Fragment>
                  Approved &nbsp;
                  {value !== 1 && (
                    <span style={{ fontSize: "smaller" }}>
                      ({handleApprovedCount})
                    </span>
                  )}
                </React.Fragment>
              }
              {...a11yProps(1)}
              icon={
                <Avatar
                  alt="test avatar"
                  src={`${import.meta.env.BASE_URL}/pending-approval.svg`}
                />
              }
              iconPosition="start"
            />

            <Tab
              value={TabStatus.Approved}
              label={
                <React.Fragment>
                  Rejected &nbsp;
                  {value !== 2 && (
                    <span style={{ fontSize: "smaller" }}>
                      ({handleRejectedCount})
                    </span>
                  )}
                </React.Fragment>
              }
              {...a11yProps(2)}
              icon={
                <Avatar
                  alt="test avatar"
                  src={`${import.meta.env.BASE_URL}/pending-reject.svg`}
                />
              }
              iconPosition="start"
            />

            <Tab
              value={TabStatus.Deleted}
              label={
                <React.Fragment>
                  Deleted &nbsp;
                  {value !== 3 && (
                    <span style={{ fontSize: "smaller" }}>
                      ({handleDeletedCount})
                    </span>
                  )}
                </React.Fragment>
              }
              {...a11yProps(3)}
              icon={
                <Avatar
                  alt="test avatar"
                  src={`${import.meta.env.BASE_URL}/pending-delete.svg`}
                />
              }
              iconPosition="start"
            />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <div className="new-listing-wrap">
              <div className="container">
                <div className="new-listing">
                  <div className="new-listing-wrap-list">
                    {!isExpanded && (
                      <h3 className="result">
                        <span className="resultCount">{getResultCount}</span>{" "}
                        Filtered Results
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
                          src={`${
                            import.meta.env.BASE_URL
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
                            src={`${
                              import.meta.env.BASE_URL
                            }/dashboardtab/solar_list-linear.svg`}
                            alt="list-view"
                          />
                          List View
                        </ToggleButton>
                        <ToggleButton value="Card View">
                          <img
                            src={`${
                              import.meta.env.BASE_URL
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
                          src={`${
                            import.meta.env.BASE_URL
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
                        <Button className="filter-text" aria-describedby={id}>
                          <img
                            src={`${
                              import.meta.env.BASE_URL
                            }/material-symbols_sort-rounded.svg`}
                            alt="filter img"
                          />
                          Sort
                        </Button>
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
                      <h3 className="result">
                        <span className="resultCount">{getResultCount}</span>{" "}
                        Results
                      </h3>
                    )}
                  </div>

                  <div className="list-panel">
                    <div
                      onClick={() => setIsExpanded(true)}
                      className={`search ${isExpanded ? "active" : ""}`}
                    >
                      <input type="search" placeholder="Search Properties" />
                      <img
                        src={`${import.meta.env.BASE_URL}/Search-1.svg`}
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
                            src={`${
                              import.meta.env.BASE_URL
                            }/dashboardtab/solar_list-linear.svg`}
                            alt="list-view"
                          />
                          List View
                        </ToggleButton>
                        <ToggleButton value="Card View">
                          <img
                            src={`${
                              import.meta.env.BASE_URL
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
                          src={`${
                            import.meta.env.BASE_URL
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
                        <Button className="filter-text" aria-describedby={id}>
                          <img
                            src={`${
                              import.meta.env.BASE_URL
                            }/material-symbols_sort-rounded.svg`}
                            alt="filter img"
                          />
                          Sort
                        </Button>
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
                      <h3 className="result">
                        <span className="resultCount">{getResultCount}</span>{" "}
                        Results
                      </h3>
                    )}
                  </div>

                  <div className="list-panel">
                    <div
                      onClick={() => setIsExpanded(true)}
                      className={`search ${isExpanded ? "active" : ""}`}
                    >
                      <input type="search" placeholder="Search Properties" />
                      <img
                        src={`${import.meta.env.BASE_URL}/Search-1.svg`}
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
                            src={`${
                              import.meta.env.BASE_URL
                            }/dashboardtab/solar_list-linear.svg`}
                            alt="list-view"
                          />
                          List View
                        </ToggleButton>
                        <ToggleButton value="Card View">
                          <img
                            src={`${
                              import.meta.env.BASE_URL
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
                          src={`${
                            import.meta.env.BASE_URL
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
                        <Button className="filter-text" aria-describedby={id}>
                          <img
                            src={`${
                              import.meta.env.BASE_URL
                            }/material-symbols_sort-rounded.svg`}
                            alt="filter img"
                          />
                          Sort
                        </Button>
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
                      <h3 className="result">
                        <span className="resultCount">{getResultCount}</span>{" "}
                        Results
                      </h3>
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
                            src={`${
                              import.meta.env.BASE_URL
                            }/dashboardtab/solar_list-linear.svg`}
                            alt="list-view"
                          />
                          List View
                        </ToggleButton>
                        <ToggleButton value="Card View">
                          <img
                            src={`${
                              import.meta.env.BASE_URL
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
                          src={`${
                            import.meta.env.BASE_URL
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
                        <Button className="filter-text" aria-describedby={id}>
                          <img
                            src={`${
                              import.meta.env.BASE_URL
                            }/material-symbols_sort-rounded.svg`}
                            alt="filter img"
                          />
                          Sort
                        </Button>
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
            data={tableValues}
            properties={properties}
            onScrollChange={handleChildScroll}
            handleOpenModal={handleOpenModal}
            tabType="pending"
          />
        ) : (
          <PropertyCardList
            formatData={formatData}
            properties={tableValues}
            onScrollChange={handleChildScroll}
            handleOpenModal={handleOpenModal}
          />
        )}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        {!cardView ? (
          <Table
            //@ts-ignore
            data={tableValues}
            properties={properties}
            onScrollChange={handleChildScroll}
            handleOpenModal={handleOpenModal}
            tabType="approved"
          />
        ) : (
          <PropertyCardList
            properties={tableValues}
            onScrollChange={handleChildScroll}
            formatData={formatData}
            handleOpenModal={handleOpenModal}
          />
        )}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        {!cardView ? (
          <Table
            //@ts-ignore
            data={tableValues}
            properties={properties}
            onScrollChange={handleChildScroll}
            handleOpenModal={handleOpenModal}
            tabType="rejected"
          />
        ) : (
          <PropertyCardList
            properties={tableValues}
            onScrollChange={handleChildScroll}
            formatData={formatData}
            handleOpenModal={handleOpenModal}
          />
        )}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={3}>
        {!cardView ? (
          <Table
            //@ts-ignore
            data={tableValues}
            properties={properties}
            onScrollChange={handleChildScroll}
            handleOpenModal={handleOpenModal}
            tabType="deleted"
          />
        ) : (
          <PropertyCardList
            properties={tableValues}
            onScrollChange={handleChildScroll}
            formatData={formatData}
            handleOpenModal={handleOpenModal}
          />
        )}
      </CustomTabPanel>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className="filter-div-wrapper">
          <div className="filter-header">
            <p>
              <img
                src={`${
                  import.meta.env.BASE_URL
                }/dashboardtab/icon-park-outline_down.svg`}
                alt="icon park"
                style={{ cursor: "pointer" }}
                onClick={() => setDrawerOpen(false)}
              />
              &nbsp; Filter By
            </p>
            <p className="filtercount">
              {checkListCount > 0 && (
                <span className="count-badge">{checkListCount}</span>
              )}
              Filter{checkListCount !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="checklist-content row">
            {(
              filterOptions[properties === "all" ? "all" : properties] ?? []
            ).map((section: any, index: any) => (
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
                      {section.options.map((opt: any, i: any) => (
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
                src={`${
                  import.meta.env.BASE_URL
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
  properties: any;
  onScrollChange: (scrollTop: number) => void;
  formatData: any;
  handleOpenModal: (action: "Approve" | "Deny" | "Delete", item: any) => void;
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
  onScrollChange,
  handleOpenModal,
}: ProCardProps) => {
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLElement | null>(
    null
  );

  const formatedData: (PropertyItem & PropertyViewWithSource)[] = properties;
  // const allIds = formatedData.map((data: PropertyItem) => data._id);
  // const [visibleCount, setVisibleCount] = useState<number>(5);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Debounced scroll handler
  const handleScroll = debounce(() => {
    const container = containerRef.current;
    if (!container) return;

    // if (scrollTop + clientHeight >= scrollHeight - 50) {
    //   setVisibleCount((prev) => Math.min(prev + 5, formatedData.length));
    // }
  }, 200);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    //return () => container.removeEventListener('scroll', handleScroll);
  }, []);

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
  console.log("formatedData", formatedData);

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

  const handleEdit = (item: any) => {
    // console.log(item,"start")
    // const singularProperty = getSingularPropertyType();
    // console.log("type",properties, singularProperty)

    console.log("Editing item:", tabValue, item);
    const singularProperty = getSingularPropertyType();

    navigate(`/${singularProperty}/create`, {
      state: {
        data: item,
        mode: "edit",
      },
    });
    // console.log("end")
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
      const response = await axios.put(
        `${
          import.meta.env.VITE_BackEndUrl
        }/api/adminpermission/${singularProperty}/${id}`,
        { status: `${status}` },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Status updated:", response.data);
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
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Box
          ref={containerRef}
          sx={
            {
              // height: "400px",
              // overflowY: "auto",
              // marginBottom: "50px",
            }
          }
        >
          {formatedData.length === 0 && (
            <div
              style={{ padding: "20px", margin: "auto", textAlign: "center" }}
            >
              No properties available...
            </div>
          )}
          {formatedData.map((item: PropertyItem) => (
            <Grid item xs={12} sm={12} md={12} key={item._id}>
              <div className="card-view-wrapper row" key={item._id}>
                <div className="card-view-img col-md-6">
                  <Carousel
                    //@ts-ignore
                    images={item?.images}
                    price="£15,000 pcm"
                    area="485,700 sq. ft."
                  />
                  <input
                    type="checkbox"
                    className="cardview-checkbox"
                    aria-describedby={popoverId}
                    onClick={handlePopoverClick}
                    checked={selectedRows.includes(item._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows((prev) => [...prev, item._id]);
                      } else {
                        setSelectedRows((prev) =>
                          prev.filter((id) => id !== item._id)
                        );
                      }
                    }}
                  />
                </div>

                <div className="card-view-content col-md-6">
                  <div className="card-view-address-bar">
                    <div className="cardview-address-detail">
                      <h6>{item?.title || "No Landmark"}</h6>
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
                      {item?.postOwner?.userName} | {item?.createdAt}
                    </span>
                  </div>
                  <div className="card-view-icon-wrapper">
                    <div className="card-icon-view">
                      <img
                        src={`${
                          import.meta.env.BASE_URL
                        }/dashboardtab/view-card.png`}
                        alt="icon-edit"
                        onClick={() => item._id && handleView(item._id)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div className="card-icon-edit">
                      <img
                        src={`${
                          import.meta.env.BASE_URL
                        }/dashboardtab/Icon_Edit.svg`}
                        alt="icon-edit"
                        onClick={() => handleEdit(item)}
                      />
                    </div>
                    <div className="card-icon-approve">
                      <img
                        src={`${
                          import.meta.env.BASE_URL
                        }/dashboardtab/Icon_Tick.svg`}
                        alt="icon-approve"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleOpenModal("Approve", item)}
                      />
                    </div>
                    <div className="card-icon-deny">
                      <img
                        src={`${
                          import.meta.env.BASE_URL
                        }/dashboardtab/Icon_Deny.svg`}
                        alt="icon-deny"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleOpenModal("Deny", item)}
                      />
                    </div>
                    <div className="card-icon-delete">
                      <img
                        src={`${
                          import.meta.env.BASE_URL
                        }/dashboardtab/Icon-Delete-orange.svg`}
                        alt="icon-delete"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleOpenModal("Delete", item)}
                      />
                    </div>
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
        <div className="checkbox-popover-content">
          <p className="property-select">
            {selectedRows.length} Property selected
          </p>
          <div className="pop-content-divider"></div>
          <p
            className="property-approve"
            onClick={() => handleBulkAction("Approve")}
          >
            <img src={tickIcon} alt="Icon_Tick" />
            Approve
          </p>
          <div className="pop-content-divider"></div>
          <p className="property-deny" onClick={() => handleBulkAction("Deny")}>
            <img src={denyIcon} alt="Icon_Tick" /> Deny
          </p>
          <div className="pop-content-divider"></div>
          <p
            className="property-delete"
            onClick={() => handleBulkAction("Delete")}
          >
            Delete
          </p>
        </div>
      </Popover>
    </Box>
  );
};
