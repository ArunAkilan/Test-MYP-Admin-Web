import "./sidebar.scss";
import * as React from "react";
// import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Avatar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store';
import { setTabValue } from '../../../slicers/sideBarTab';


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

const tabRoutes = ["/dashboard", "/commercial", "/residential", "/plot"];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
   /*  const [activeTab, setActiveTab] = useState('dashboard');  */
   const tabValue = useSelector((state: RootState) => state.SidebarTab.value);
   const dispatch = useDispatch<AppDispatch>();
  //  const navigate = useNavigate();
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
  }, [location.pathname]);


  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    // Prevent navigation if already on the selected tab
    if (newValue !== value) {
      setValue(newValue);
      navigate(tabRoutes[newValue]);
    }
    if (newValue !== tabValue) {
      dispatch(setTabValue(newValue));
      navigate(tabRoutes[newValue]);
    }
  };  

   /* React.useEffect(() => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.warn('No token found! Redirecting to login...');
    navigate('/admin');
  }
}, [navigate]);
*/

     /*  // Recheck token on every tab change
      React.useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token !== 'demo-token') {
          console.warn('Invalid or missing token! Redirecting to login...');
          navigate('/admin');
        }
    
        // Save the current tab
        localStorage.setItem('activeTab', activeTab);
      }, [activeTab, navigate]);    */




  return (
    <div
      id="nav-common-tab"
      // className="col-md-3 fixed-col nav-tabs"
      style={{ height: "100vh"}}
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
          icon={<Avatar alt="Dashboard" src={`${import.meta.env.VITE_BASE_URL}/Dash.svg`} />}
          iconPosition="start"
          label="Dashboard"
          className="tab-outerlayer-div"
        />
        <Tab
          sx={{ ...styles }}
          icon={<Avatar alt="Commercial" src={`${import.meta.env.VITE_BASE_URL}/solar_buildings-linear.svg`} />}
          iconPosition="start"
          label="Commercial"
          className="tab-outerlayer-div"
        />
        <Tab
          sx={{ ...styles }}
          icon={<Avatar alt="Residential" src={`${import.meta.env.VITE_BASE_URL}/hugeicons_house-02.svg`} />}
          iconPosition="start"
          label="Residential"
          className="tab-outerlayer-div"
        />
        <Tab
          sx={{ ...styles }}
          icon={<Avatar alt="Plots" src={`${import.meta.env.VITE_BASE_URL}/lucide_land-plot.svg`} />}
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