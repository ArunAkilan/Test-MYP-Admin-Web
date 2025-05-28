import "./sidebar.scss";
import Profile from "../../Profile/Profile";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Home from "../../Dashboard/Dashboard";
import dashboardmage from '../../../../public/Dash.svg'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="tab-row row">
      <div className="col-md-3 tab-navs">
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{}}
        >
          <Tab sx={{
            fontSize: 16,
            display: 'flex',
            alignItems: 'start',
            paddingLeft: 5,
            fontFamily: 'Raleway',
             fontWeight: 600
            }} 
            label="Dashboard" {...a11yProps(0)} />
          <Tab  sx={{
            fontSize: 16,
            display: 'flex',
            alignItems: 'start',
            paddingLeft: 5,
            fontFamily: 'Raleway',
             fontWeight: 600
            }} 
            label="Commercial" {...a11yProps(1)} />
          <Tab  sx={{
            fontSize: 16,
            display: 'flex',
            alignItems: 'start',
            paddingLeft: 5,
            fontFamily: 'Raleway',
             fontWeight: 600
            }} 
           label="Residential" {...a11yProps(2)} />
          <Tab  sx={{
            fontSize: 16,
            display: 'flex',
            alignItems: 'start',
            paddingLeft: 5,
            fontFamily: 'Raleway',
            fontWeight: 600
            }}    label="Profile" {...a11yProps(3)} />
        </Tabs>
      </div>
      <div className="col-md-9 tab-content">
        <TabPanel value={value} index={0}>
          <Home />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Profile />
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </div>
    </div>
  );
}
