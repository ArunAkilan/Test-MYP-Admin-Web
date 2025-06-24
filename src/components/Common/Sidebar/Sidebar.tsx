import './sidebar.scss';
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
import Home from "../../Dashboard/Dashboard";
import { Avatar } from '@mui/material';
import CreateResidential from "../../Residential/createResidential";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";

const styles = {
  fontSize: 16,
  display: "flex",
  alignItems: "start",
  padding: 0,
  fontFamily: "Raleway",
  fontWeight: 600,
  letterSpacing: 0,
  lineHeight: 18,
};

// function TabPanel({ children, value, index }: any) {
//   return (
//     <div hidden={value !== index}>
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography component="div">{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

const tabRoutes = ["/dashboard", "/commercial", "/residential", "/plots"];

export default function VerticalTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  // Match the current path to tab index
  const currentTabIndex = tabRoutes.findIndex((path) => location.pathname.startsWith(path));
  const [value, setValue] = React.useState(currentTabIndex >= 0 ? currentTabIndex : 0);

  React.useEffect(() => {
    // Update tab index when route changes (e.g., user clicks back/forward)
    const index = tabRoutes.findIndex((path) => location.pathname.startsWith(path));
    if (index !== -1 && index !== value) {
      setValue(index);
    }
  }, [location.pathname]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(tabRoutes[newValue]); // Navigate to respective route
  };

  const openCreateResidential = () => {
    navigate("/residential/create");
  };

  return (
    <div className="tab-row row" style={{ height: "100vh" }}>
      <div id="nav-common-tab" className="col-md-3 nav-tabs" style={{ borderRight: "1px solid #ccc" }}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="Vertical tabs example"
        >
          <Tab
            sx={{ styles }}
            icon={<Avatar alt="test avatar" src="/Dash.svg" />}
            iconPosition="start"
            label="Dashboard"
          />
          <Tab
            sx={{ styles }}
            label="Commercial"
            icon={<Avatar alt="test avatar" src="/solar_buildings-linear.svg" />}
            iconPosition="start"
          />
          <Tab
            sx={{ styles }}
            label="Residential"
            icon={<Avatar alt="test avatar" src="/hugeicons_house-02.svg" />}
            iconPosition="start"
          />
          <Tab
            sx={{ styles }}
            label="Plots"
            icon={<Avatar alt="test avatar" src="/lucide_land-plot.svg" />}
            iconPosition="start"
          />
        </Tabs>
      </div>

      <div className="col-md-9 tab-content" style={{ overflowY: "auto" }}>
        <Routes>
          <Route path="/dashboard" element={<Home properties="all" onAddNew={openCreateResidential} />} />
          <Route path="/commercial" element={<Home properties="commercials" onAddNew={openCreateResidential} />} />
          <Route path="/residential" element={<Home properties="residentials" onAddNew={openCreateResidential} />} />
          <Route path="/plots" element={<Home properties="plots" onAddNew={openCreateResidential} />} />
          <Route path="/residential/create" element={<CreateResidential />} />
        </Routes>
      </div>
    </div>
  );
}
