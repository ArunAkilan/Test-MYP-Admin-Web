import './sidebar.scss';
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Home from "../../Dashboard/Dashboard";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';


const styles = {
  fontSize: 16,
  display: "flex",
  alignItems: "start",
  Padding: 0,
  fontFamily: "Raleway",
  fontWeight: 600,
  letterSpacing: 0,
  lineHeight: 18,
};

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
          <Typography component="div">{children}</Typography>
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


  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
     setValue(newValue);
  };

  return (
    <div className="tab-row row">
      <div id="nav-common-tab" className="col-md-3 nav-tabs">
        <Tabs
          orientation="vertical"
          value={value}
           
          onChange={handleChange}
          variant="fullWidth"
          aria-label="Vertical tabs example"
          sx={{}}
        >
          <Tab
            className="tab-outerlayer-div"
            sx={{ styles }}
            icon={<DashboardOutlinedIcon />}
            label="Dashboard"
            {...a11yProps(0)}
          />

          <Tab
            sx={{ styles }}
            label="Commercial"
            {...a11yProps(1)}
            icon={<AssignmentOutlinedIcon />}
            id="tab-custom"
            className="tab-outerlayer-div"
          />
          <Tab
            sx={{ styles }}
            label="Residential"
            {...a11yProps(2)}
            icon={<DashboardOutlinedIcon />}
            className="tab-outerlayer-div"
          />
          <Tab
            sx={{ styles }}
            label="Plots"
            {...a11yProps(3)}
            icon={<AssignmentOutlinedIcon />}
            className="tab-outerlayer-div "
          />
          
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
          Item Four
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
