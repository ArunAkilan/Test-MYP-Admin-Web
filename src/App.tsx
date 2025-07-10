import Header from "./components/Common/Navbar/Navbar";
import Sidebar from "./components/Common/Sidebar/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import navbarLogo from "../src/assets/navbar/PRH_Admin-resize.svg";
import Home from "./components/Dashboard/Dashboard";
import "./App.scss";
import { useEffect } from "react";
import ViewProperty from "./components/Properties/viewProperties/viewProperty";
import { CreateProperty } from "./components/Properties/properties";
import Login from "./components/Login/Login";

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginRoute = location.pathname === "/admin";

  const openCreateResidential = () => {
    navigate("/residential/create");
  };

  const noScrollRoutes = [
    "/dashboard",
    "/commercial",
    "/residential",
    "/plots"
  ];

  useEffect(() => {
    const shouldHideScroll = noScrollRoutes.includes(location.pathname);
    document.body.style.overflow = shouldHideScroll ? "hidden" : "auto";
  }, [location.pathname]);

  return (
    <div className="app-container row">
      {!isLoginRoute && <Sidebar />}

      <div
        className={`content-area ${
          !isLoginRoute ? "col-md-9 offset-md-3" : ""
        }`}
        style={{ flex: 1, overflowY: "auto" }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={<Home properties="all" onAddNew={openCreateResidential} />}
          />
          <Route path="/admin" element={<Login />} />
          <Route
            path="/commercial"
            element={
              <Home properties="commercials" onAddNew={openCreateResidential} />
            }
          />
          <Route
            path="/residential"
            element={
              <Home properties="residentials" onAddNew={openCreateResidential} />
            }
          />
          <Route
            path="/plots"
            element={<Home properties="plots" onAddNew={openCreateResidential} />}
          />
          <Route path="/commercial/create" element={<CreateProperty />} />
          <Route path="/plots/create" element={<CreateProperty />} />
          <Route path="/residential/create" element={<CreateProperty />} />
          <Route path="/plots/view" element={<ViewProperty />} />
          <Route path="/plots/view/:id" element={<ViewProperty />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}


function LayoutWrapper() {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/admin";

  return (
    <div className="grid-container">
      {!isLoginRoute && (
        <Header
          MainLogo={navbarLogo}
          Title="Admin"
          ProfileLogo="/public/Ellipse 1.svg"
          Profile={false}
        />
      )}
      <div className="container body-content-container">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
