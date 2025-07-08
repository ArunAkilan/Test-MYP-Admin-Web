import Header from "./components/Common/Navbar/Navbar";
import Sidebar from "./components/Common/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import navbarLogo from "../src/assets/navbar/PRH_Admin-resize.svg"
import Home from "./components/Dashboard/Dashboard";
import "./App.scss";
import { useEffect } from "react";
import CreateProperty from "./components/Properties/properties";
import CreateCommercialProperty from "./components/Properties/createProperties/Commercial/createCommercial";
import CreatePlotProperty from "./components/Properties/createProperties/Plot/createPlot";
import CommercialView from "../src/components/Properties/viewProperties/CommercialProperty/CommercialViewProperty"; // <-- import CommercialView here
import ViewProperty from "./components/Properties/viewProperties/ResidentialView/ResidentialViewProperty";
import PlotView from "./components/Properties/viewProperties/PlotView/PlotViewProperty";

function AppRoutes() {
  const navigate = useNavigate();

  const openCreateResidential = () => {
    navigate("/residential/create");
  };
  const openCreateCommercial = () => navigate("/commercial/create");
  const openCreatePlotProperty =() => navigate('/plots/create');

  const location = useLocation();

useEffect(() => {
  const noScrollRoutes = [
    "/dashboard", 
    "/commercial",
    "/residential",
    "/plots",
  ];

  const shouldHideScroll = noScrollRoutes.includes(location.pathname);
  document.body.style.overflow = shouldHideScroll ? "hidden" : "auto";
}, [location.pathname]);


  return (
    <div className="app-container row">
      <Sidebar />
      <div className="col-md-9 offset-md-3 content-area" style={{ flex: 1, overflowY: "auto" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={<Home properties="all" onAddNew={openCreateResidential} />}
          />
          <Route
            path="/commercial"
            element={<Home properties="commercials" onAddNew={openCreateCommercial} />}
          />
          <Route
            path="/residential"
            element={<Home properties="residentials" onAddNew={openCreateResidential} />}
          />
          <Route
            path="/plots"
            element={<Home properties="plots" onAddNew={openCreatePlotProperty} />}
          />
          <Route path="/commercial/create" element={<CreateCommercialProperty />} />
          <Route path="/plots/create" element={<CreatePlotProperty />} />
          <Route path="/residential/create" element={<CreateProperty />} />

            {/* View Routes */}
          {/* <Route path="/plots/view" element={<ViewProperty />} /> */}
          <Route path="/plots/view/:id" element={<PlotView />} />
          <Route path="/residential/view/:id" element={<ViewProperty />} />
          <Route path="/commercial/view/:id" element={<CommercialView />} /> {/* Added CommercialView route */}

        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="grid-container">
        <Header
          MainLogo={navbarLogo}
          Title="Admin"
          ProfileLogo="/public/Ellipse 1.svg"
          Profile={false}
        />
        <div className="container body-content-container">
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
