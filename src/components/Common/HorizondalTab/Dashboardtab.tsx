import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Table from "../DashboradTable/table";
import { Avatar, Typography } from "@mui/material";
import "./Dashboardtab.scss";
import type { ResidentialProperty } from "../../AdminResidencial/AdminResidencial.model";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import GenericButton from "../Button/button";
import filterTick from "../../../../public/Icon_Tick.svg";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";

interface TableProps {
  //data: ResidentialProperty[];
  data: any;
  properties?: "all" | "residentials" | "commercials" | "plots";
}
interface DashboardtabProps extends TableProps {
  data: ResidentialProperty[];
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
  // const [selectedFilters, setSelectedFilters] = useState<{
  //   [key: string]: string[];
  // }>({});

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

  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
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
            label="Pending Requests"
            {...a11yProps(0)}
            icon={<Avatar alt="test avatar" src="/pending-action.svg" />}
            iconPosition="start"
          />
          <Tab
            label="Approved Properties"
            {...a11yProps(1)}
            icon={<Avatar alt="test avatar" src="/pending-approval.svg" />}
            iconPosition="start"
          />
          <Tab
            label="Rejected Properties"
            {...a11yProps(2)}
            icon={<Avatar alt="test avatar" src="/pending-reject.svg" />}
            iconPosition="start"
          />
          <Tab
            label="Deleted Properties"
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
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: 400, left: 460 }}
                    id={id}
                    open={filterOpen}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <div className="filter-div-wrapper">
                      <div className="filter-header">
                        <p>Filter By</p>
                        <div className="apply-reset-btn">
                          <button
                            className="refresh-btn"
                            onClick={() => window.location.reload()}
                          >
                            <img src="mynaui_refresh.svg" alt="refresh icon" />
                            Reset
                          </button>
                          <GenericButton
                            image={filterTick}
                            iconPosition="left"
                            label={"Apply"}
                            className="genericFilterApplyStyles"
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
                                      // onChange={(e) => {
                                      //   const checked = e.target.checked;
                                      //   const key = section.heading;
                                      //   setSelectedFilters((prev) => {
                                      //     const current = prev[key] || [];
                                      //     const updated = checked
                                      //       ? [...current, opt]
                                      //       : current.filter(
                                      //           (val) => val !== opt
                                      //         );
                                      //     return { ...prev, [key]: updated };
                                      //   });
                                      // }}
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

                  {/* <Popover
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
                        <button className="refresh-btn">
                          <img src="mynaui_refresh.svg" alt="refresh icon" />
                          Reset
                        </button>
                        <GenericButton
                          image={filterTick}
                          iconPosition="left"
                          label={"Apply"}
                          className="genericFilterApplyStyles"
                        />
                      </div>
                    </div>
                    <div className="checklist-content checklist-content-1 row">
                      <div className="checklist-list col-md-3 col-sm-6">
                        <h4>Property Type</h4>
                        <div className="label-wrapper">
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Rent"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Lease"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Sale"
                          />
                        </div>
                      </div>
                      <div className="checklist-list col-md-3 col-sm-6">
                        <h4>Commercial Type</h4>
                        <div className="label-wrapper">
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Building"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Co-Working"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Office Space"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Shop"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Showroom"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Shed"
                          />
                        </div>
                      </div>
                      <div className="checklist-list col-md-3 col-sm-6 ">
                        <h4>Facing</h4>
                        <div className="label-wrapper">
                          <FormControlLabel
                            control={<Checkbox />}
                            label="East"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="West"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="North"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="South"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="North west"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="North East"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="South west"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="South East"
                          />
                        </div>
                      </div>
                      <div className="checklist-list col-md-3 col-sm-6">
                        <h4>Locality</h4>
                        <div className="label-wrapper">
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Old Bus Stand"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Thuraimangalam"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="NH-45 Bypass"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Collector Office Road"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Elambalur"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Sungu Pettai"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="V.Kalathur"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="checklist-content checklist-content-1 row">
                      <div className="checklist-list col-md-3 col-sm-6">
                        <h4>RTO</h4>
                        <div className="label-wrapper">
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Yes"
                          />
                          <FormControlLabel control={<Checkbox />} label="No" />
                        </div>
                      </div>
                      <div className="checklist-list col-md-3 col-sm-6">
                        <h4>Parking</h4>
                        <div className="label-wrapper">
                          <FormControlLabel
                            control={<Checkbox />}
                            label="None"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="With Parking"
                          />
                        </div>
                      </div>
                      <div className="checklist-list col-md-3 col-sm-6 ">
                        <h4>Washroom</h4>
                        <div className="label-wrapper">
                          <FormControlLabel
                            control={<Checkbox />}
                            label="None"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Private"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Common"
                          />
                        </div>
                      </div>
                      <div className="checklist-list col-md-3 col-sm-6">
                        <h4>Accessablity</h4>
                        <div className="label-wrapper">
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Ramp Access"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Lift Access"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Stairs Access"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Popover> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Table data={data} properties={properties} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Table data={data} properties={properties} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Table data={data} properties={properties} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Table data={data} properties={properties} />
      </CustomTabPanel>
    </div>
  );
}
