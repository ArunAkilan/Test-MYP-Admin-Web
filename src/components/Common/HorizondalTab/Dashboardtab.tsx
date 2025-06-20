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

  const statusByTab = ["Pending", "Approved", "Rejected", "Deleted"];
  const [value, setValue] = useState(0);
  const [tableValues, setTableValues] = useState<Property[]>([]);
  const currentStatus = statusByTab[value];
  console.log(currentStatus);
  const filterOptions = {
    residentials: [
      { heading: "Property Type", options: ["Rent", "Lease", "Sale"] },
      {
        heading: "Furnishing",
        options: ["Furnished", "Semi-Furnished", "Unfurnished"],
      },
    ],
    commercials: [
      { heading: "Commercial Type", options: ["Building", "Shop", "Office"] },
      { heading: "Washroom", options: ["None", "Private", "Common"] },
    ],
    plots: [
      {
        heading: "Plot Type",
        options: ["Residential", "Agricultural", "Industrial"],
      },
      { heading: "Facing", options: ["East", "West", "North", "South"] },
    ],
  };

  // Handle tab change
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
  console.log(
    "All statuses:",
    allItems.map((item) => item.status)
  );
  console.log("Current tab value:", value, "Status:", statusByTab[value]);

  // handleCheckbox
  const handleCheckboxChange = (option: string) => {
    setCurrentCheckList((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };


  // filter function
  const fetchFilteredData = async (filters: string[], status: string) => {
  try {
    const response = await axios.get(
      `http://65.0.45.96:3002/api/${properties}`,
      {
        params: {
          filters: filters.join(","),
          status,
        },
      }
    );

    const dataObj = response.data.data;

    let result: Property[] = [];
    if (properties === "residentials") result = dataObj.residential ?? [];
    else if (properties === "commercials") result = dataObj.commercial ?? [];
    else if (properties === "plots") result = dataObj.plot ?? [];
    else if (properties === "all")
      result = [
        ...(dataObj.residential ?? []),
        ...(dataObj.commercial ?? []),
        ...(dataObj.plot ?? []),
      ];

    setTableValues(result);
  } catch (error) {
    console.error("Fetch error:", error);
    setTableValues([]);
  }
};
const handleApply = async () => {
  await fetchFilteredData(currentCheckList, statusByTab[value]);
  setIsFiltered(true);
  handleClose();
};
useEffect(() => {
  const currentStatus = statusByTab[value];
  if (!isFiltered) {
    fetchFilteredData([], currentStatus);
  }
}, [value, isFiltered]);

  // filterResetFunction
const filterResetFunction = () => {
  setCurrentCheckList([]);
  setIsFiltered(false);
  fetchFilteredData([], statusByTab[value]);
  handleClose();
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
  console.log(handlePendingCount);

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
                <span style={{ fontSize: "smaller" }}>
                  {handlePendingCount}
                </span>
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
                <span style={{ fontSize: "smaller" }}>
                  {handleApprovedCount}
                </span>
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
                <span style={{ fontSize: "smaller" }}>
                  {handleRejectedCount}
                </span>
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
                <span style={{ fontSize: "smaller" }}>
                  {handleDeletedCount}
                </span>
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
                <h3 className="fresh-list">36 Fresh Properties</h3>
                <img src="Ellipse 24.svg" alt="dot svg" />
                <h3 className="pending-list">136 Pending Request</h3>
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
                    style={{
                      margin: "20% 8% 0 8%",
                      position: "absolute",
                      zIndex: 1300,
                    }}
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
                    slotProps={{
                      paper: {
                        sx: {
                          pointerEvents: "auto", // 🛠️ allows checkbox clicks
                          p: 2,
                        },
                      },
                    }}
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
                                      inputProps={{ "aria-label": opt }}
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
      <CustomTabPanel value={value} index={1}>
        <div className="new-listing-wrap">
          <div className="container">
            <div className="new-listing">
              <div className="new-listing-wrap-list">
                <h3 className="fresh-list">36 Fresh Properties</h3>
                <img src="Ellipse 24.svg" alt="dot svg" />
                <h3 className="pending-list">136 Pending Request</h3>
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
                <h3 className="fresh-list">36 Fresh Properties</h3>
                <img src="Ellipse 24.svg" alt="dot svg" />
                <h3 className="pending-list">136 Pending Request</h3>
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
                <h3 className="fresh-list">36 Fresh Properties</h3>
                <img src="Ellipse 24.svg" alt="dot svg" />
                <h3 className="pending-list">136 Pending Request</h3>
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
