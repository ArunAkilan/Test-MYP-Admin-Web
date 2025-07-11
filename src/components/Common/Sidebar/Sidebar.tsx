import "./sidebar.scss";
import * as React from "react";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Avatar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";


const styles = {
  fontSize: 16,
  display: "flex",
  alignItems: "start",
  padding: 0,
  fontFamily: "Raleway",
  fontWeight: 600,
  letterSpacing: 0,
  lineHeight: "18px",
};

const tabRoutes = ["/dashboard", "/commercial", "/residential", "/plots"];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
   const [activeTab, setActiveTab] = useState('dashboard');

  const currentTabIndex = tabRoutes.findIndex((path) =>
    location.pathname.startsWith(path)
  );

  const [value, setValue] = React.useState(
    currentTabIndex >= 0 ? currentTabIndex : 0
  );

  React.useEffect(() => {
  const index = tabRoutes.findIndex((path) =>
    location.pathname.startsWith(path)
  );
  if (index !== -1 && index !== value) {
    setValue(index);
  }
}, [location.pathname, value]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    // Prevent navigation if already on the selected tab
    if (newValue !== value) {
      setValue(newValue);
      navigate(tabRoutes[newValue]);
    }
  };

    React.useEffect(() => {
      const savedTab = localStorage.getItem('activeTab');
      if (savedTab && tabRoutes.includes(savedTab)) {
        setActiveTab(savedTab);
      }
    }, []);

     // Recheck token on every tab change
      React.useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(`[Tab Switch] Checking token... Current token: ${token}`);
    
        if (token !== 'demo-token') {
          console.warn('Invalid or missing token! Redirecting to login...');
          navigate('/admin');
        }
    
        // Save the current tab
        localStorage.setItem('activeTab', activeTab);
      }, [activeTab, navigate]);

  return (
    <div
      id="nav-common-tab"
      className="col-md-3 fixed-col nav-tabs"
      style={{ height: "100vh" }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        aria-label="Vertical tabs example"
        className="tab-outerlayer-div"
      >
        <Tab
          sx={{ ...styles }}
          icon={<Avatar alt="Dashboard" src="/Dash.svg" />}
          iconPosition="start"
          label="Dashboard"
          className="tab-outerlayer-div"
        />
        <Tab
          sx={{ ...styles }}
          icon={<Avatar alt="Commercial" src="/solar_buildings-linear.svg" />}
          iconPosition="start"
          label="Commercial"
          className="tab-outerlayer-div"
        />
        <Tab
          sx={{ ...styles }}
          icon={<Avatar alt="Residential" src="/hugeicons_house-02.svg" />}
          iconPosition="start"
          label="Residential"
          className="tab-outerlayer-div"
        />
        <Tab
          sx={{ ...styles }}
          icon={<Avatar alt="Plots" src="/lucide_land-plot.svg" />}
          iconPosition="start"
          label="Plots"
          className="tab-outerlayer-div"
        />
      </Tabs>
    </div>
  );
}
// function setActiveTab(savedTab: string) {
//   throw new Error("Function not implemented.");
// }

