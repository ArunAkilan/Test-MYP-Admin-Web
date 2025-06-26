import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Table from "../DashboradTable/table";
import { Avatar, Typography } from "@mui/material";
import "./Dashboardtab.scss";
import Popover from "@mui/material/Popover";
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

type Property = {
  status?: string;
  [key: string]: any;
};
type PropertyData = {
  residential: Property[];
  commercial: Property[];
  plot: Property[];
};
interface DashboardtabProps {
  data: PropertyData;
  properties: "all" | "residentials" | "commercials" | "plots";
}

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

export default function Dashboardtab({ data, properties }: DashboardtabProps) {
  const [isFiltered, setIsFiltered] = useState(false);
  const [currentCheckList, setCurrentCheckList] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const statusByTab = ["Pending", "Approved", "Rejected", "Deleted"];
  const [value, setValue] = useState(0);
  const [tableValues, setTableValues] = useState<Property[]>([]);
  const [resetCounter, setResetCounter] = useState(0);
  const currentStatus = statusByTab[value];
  console.log(currentStatus);
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

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
    ],
    [data]
  );

  // Handle tab change
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setIsFiltered(false);
    setCurrentCheckList([]);

    const newStatus = statusByTab[newValue];
    const filtered = allItems.filter(
      (item) => item.status?.toLowerCase() === newStatus.toLowerCase()
    );
    setTableValues(filtered);
  }; 
  
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
      const filtered = allItems.filter(
        (item) => item.status?.toLowerCase() === status.toLowerCase()
      );
      setTableValues(filtered);
    }
  }, [value, isFiltered, allItems]);

  // filterResetFunction
  const filterResetFunction = () => {
    setCurrentCheckList([]);
    setIsFiltered(false);
    fetchFilteredData([], value); // ✅ No status
    setDrawerOpen(false);
    setResetCounter((prev) => prev + 1);
  };

  // count function
  const handlePendingCount = useMemo((): number => {
    const allItems = [
      ...(data.residential || []),
      ...(data.commercial || []),
      ...(data.plot || []),
    ];
    return allItems.filter((item) => item.status?.toLowerCase() === "pending")
      .length;
  }, [data]);

  const handleApprovedCount = useMemo((): number => {
    const allItems = [
      ...(data.residential || []),
      ...(data.commercial || []),
      ...(data.plot || []),
    ];
    return allItems.filter((item) => item.status?.toLowerCase() === "approved")
      .length;
  }, [data]);

  const handleRejectedCount = useMemo((): number => {
    const allItems = [
      ...(data.residential || []),
      ...(data.commercial || []),
      ...(data.plot || []),
    ];
    return allItems.filter((item) => item.status?.toLowerCase() === "rejected")
      .length;
  }, [data]);

  const handleDeletedCount = useMemo((): number => {
    const allItems = [
      ...(data.residential || []),
      ...(data.commercial || []),
      ...(data.plot || []),
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

  const toggleDrawer = (drawerOpen: boolean) => (
  event: React.KeyboardEvent | React.MouseEvent | {}
) => {
  if (
    event &&
    "type" in event &&
    event.type === "keydown" &&
    ((event as React.KeyboardEvent).key === "Tab" ||
      (event as React.KeyboardEvent).key === "Shift")
  ) {
    return;
  }

  setDrawerOpen(drawerOpen); // ✅ updated
};

  return (
    <div id="pending-approval-tab">
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            paddingBottom: "24px",
          }}
        >
          <Tab
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
            icon={<Avatar alt="test avatar" src="/pending-action.svg" />}
            iconPosition="start"
          />

          <Tab
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
            icon={<Avatar alt="test avatar" src="/pending-approval.svg" />}
            iconPosition="start"
          />

          <Tab
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
            icon={<Avatar alt="test avatar" src="/pending-reject.svg" />}
            iconPosition="start"
          />

          <Tab
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
            icon={<Avatar alt="test avatar" src="/pending-delete.svg" />}
            iconPosition="start"
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="new-listing-wrap">
          <div className="container">
            <div className="new-listing">
              <div className="new-listing-wrap-list">
                <h3 className="result">
                  <span className="resultCount">{getResultCount}</span> Results
                </h3>
              </div>
              <div className="list-panel">
                <div className="search">
                  <input type="search" placeholder="Search Properties" />
                  <img src="Search-1.svg" alt="search svg" />
                </div>
                <div className="filter-link color-edit">
                  <Button
                    className="filter-text"
                    aria-describedby={id}
                    // onClick={handleClick}
                    onClick={toggleDrawer(true)}
                  >
                    <img src="majesticons_filter-line.svg" alt="filter img" />
                    Filter
                  </Button>
                  <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                  >
                    <div className="filter-div-wrapper">
                      <div className="filter-header">
                        <p>Filter By</p>
                      </div>
                      <div className="checklist-content row">
                        {(
                          filterOptions[
                            properties === "all" ? "all" : properties
                          ] ?? []
                        ).map((section, index) => (
                          <div className="checklist-list col-md-12" key={index}>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                              >
                                <Typography variant="h6">
                                  {section.heading}
                                </Typography>
                              </AccordionSummary>

                              <AccordionDetails key={resetCounter}>
                                <div className="label-wrapper">
                                  {section.options.map((opt, i) => (
                                    <FormControlLabel
                                      key={i}
                                      control={
                                        <Checkbox
                                          checked={currentCheckList.includes(
                                            opt
                                          )}
                                          onChange={() =>
                                            handleCheckboxChange(opt)
                                            
                                          }
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
                          className="refresh-btn"
                          onClick={() => {
                            filterResetFunction;
                            setDrawerOpen(false);
                          }}
                        >
                          <img src="mynaui_refresh.svg" alt="refresh icon" />
                          Reset
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
                <div className="sort-link color-edit">
                  <Button className="filter-text" aria-describedby={id}>
                    <img
                      src="material-symbols_sort-rounded.svg"
                      alt="filter img"
                    />
                    Sort
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Table data={tableValues} properties={properties} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="new-listing-wrap">
          <div className="container">
            <div className="new-listing">
              <div className="new-listing-wrap-list">
                <h3 className="result">
                  <span className="resultCount">{getResultCount}</span> Results
                </h3>
              </div>
              <div className="list-panel">
                <div className="search">
                  <input type="search" placeholder="Search Properties" />
                  <img src="Search-1.svg" alt="search svg" />
                </div>
                <div className="filter-link color-edit">
                  <Button
                    className="filter-text"
                    aria-describedby={id}
                    onClick={handleClick}
                  >
                    <img src="majesticons_filter-line.svg" alt="filter img" />
                    Filter
                  </Button>
                  <Popover
                    style={{ margin: "20% 8% 0 8%", position: "absolute" }}
                    anchorReference="anchorPosition"
                    anchorPosition={{
                      top: 144,
                      left: 260,
                    }}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    id={id}
                    open={filterOpen}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                  >
                    <div className="filter-div-wrapper">
                      <div className="filter-header">
                        <p>Filter By</p>
                        <div className="apply-reset-btn">
                          <button
                            className="refresh-btn"
                            onClick={filterResetFunction}
                          >
                            <img src="mynaui_refresh.svg" alt="refresh icon" />
                            Reset
                          </button>
                          <GenericButton
                            image={filterTick}
                            iconPosition="left"
                            label={"Apply"}
                            className="genericFilterApplyStyles"
                            onClick={handleApply}
                          />
                        </div>
                      </div>
                      <div className="checklist-content row">
                        {(
                          filterOptions[
                            properties === "all" ? "residentials" : properties
                          ] ?? []
                        ).map((section, index) => (
                          <div className="checklist-list col-md-3" key={index}>
                            <Typography variant="h6">
                              {section.heading}
                            </Typography>
                            <div className="label-wrapper">
                              {section.options.map((opt, i) => (
                                <FormControlLabel
                                  key={i}
                                  control={
                                    <Checkbox
                                      checked={currentCheckList.includes(opt)}
                                      onChange={() => handleCheckboxChange(opt)}
                                    />
                                  }
                                  label={opt}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Table data={tableValues} properties={properties} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className="new-listing-wrap">
          <div className="container">
            <div className="new-listing">
              <div className="new-listing-wrap-list">
                <h3 className="result">
                  <span className="resultCount">{getResultCount}</span> Results
                </h3>
              </div>
              <div className="list-panel">
                <div className="search">
                  <input type="search" placeholder="Search Properties" />
                  <img src="Search-1.svg" alt="search svg" />
                </div>
                <div className="filter-link color-edit">
                  <Button
                    className="filter-text"
                    aria-describedby={id}
                    onClick={handleClick}
                  >
                    <img src="majesticons_filter-line.svg" alt="filter img" />
                    Filter
                  </Button>
                  <Popover
                    style={{ margin: "20% 8% 0 8%", position: "absolute" }}
                    anchorReference="anchorPosition"
                    anchorPosition={{
                      top: 144,
                      left: 260,
                    }}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    id={id}
                    open={filterOpen}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                  >
                    <div className="filter-div-wrapper">
                      <div className="filter-header">
                        <p>Filter By</p>
                        <div className="apply-reset-btn">
                          <button
                            className="refresh-btn"
                            onClick={filterResetFunction}
                          >
                            <img src="mynaui_refresh.svg" alt="refresh icon" />
                            Reset
                          </button>
                          <GenericButton
                            image={filterTick}
                            iconPosition="left"
                            label={"Apply"}
                            className="genericFilterApplyStyles"
                            onClick={handleApply}
                          />
                        </div>
                      </div>
                      <div className="checklist-content row">
                        {(
                          filterOptions[
                            properties === "all" ? "residentials" : properties
                          ] ?? []
                        ).map((section, index) => (
                          <div className="checklist-list col-md-3" key={index}>
                            <Typography variant="h6">
                              {section.heading}
                            </Typography>
                            <div className="label-wrapper">
                              {section.options.map((opt, i) => (
                                <FormControlLabel
                                  key={i}
                                  control={
                                    <Checkbox
                                      checked={currentCheckList.includes(opt)}
                                      onChange={() => handleCheckboxChange(opt)}
                                    />
                                  }
                                  label={opt}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Table data={tableValues} properties={properties} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <div className="new-listing-wrap">
          <div className="container">
            <div className="new-listing">
              <div className="new-listing-wrap-list">
                <h3 className="result">
                  <span className="resultCount">{getResultCount}</span> Results
                </h3>
              </div>
              <div className="list-panel">
                <div className="search">
                  <input type="search" placeholder="Search Properties" />
                  <img src="Search-1.svg" alt="search svg" />
                </div>
                <div className="filter-link color-edit">
                  <Button
                    className="filter-text"
                    aria-describedby={id}
                    onClick={handleClick}
                  >
                    <img src="majesticons_filter-line.svg" alt="filter img" />
                    Filter
                  </Button>
                  <Popover
                    style={{ margin: "20% 8% 0 8%", position: "absolute" }}
                    anchorReference="anchorPosition"
                    anchorPosition={{
                      top: 144,
                      left: 260,
                    }}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    id={id}
                    open={filterOpen}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                  >
                    <div className="filter-div-wrapper">
                      <div className="filter-header">
                        <p>Filter By</p>
                        <div className="apply-reset-btn">
                          <button
                            className="refresh-btn"
                            onClick={filterResetFunction}
                          >
                            <img src="mynaui_refresh.svg" alt="refresh icon" />
                            Reset
                          </button>
                          <GenericButton
                            image={filterTick}
                            iconPosition="left"
                            label={"Apply"}
                            className="genericFilterApplyStyles"
                            onClick={handleApply}
                          />
                        </div>
                      </div>
                      <div className="checklist-content row">
                        {(
                          filterOptions[
                            properties === "all" ? "residentials" : properties
                          ] ?? []
                        ).map((section, index) => (
                          <div className="checklist-list col-md-3" key={index}>
                            <Typography variant="h6">
                              {section.heading}
                            </Typography>
                            <div className="label-wrapper">
                              {section.options.map((opt, i) => (
                                <FormControlLabel
                                  key={i}
                                  control={
                                    <Checkbox
                                      checked={currentCheckList.includes(opt)}
                                      onChange={() => handleCheckboxChange(opt)}
                                    />
                                  }
                                  label={opt}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Table data={tableValues} properties={properties} />
      </CustomTabPanel>
    </div>
  );
}
