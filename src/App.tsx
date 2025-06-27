import "./App.css";
import Header from "./components/Common/Navbar/Navbar";
import Sidebar from "./components/Common/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import navbarLogo from "../src/assets/navbar/PRH Admin-resize.svg"
import Home from "./components/Dashboard/Dashboard";
import CreateResidential from "./components/Residential/createResidential";
import ViewResidential from "./components/Residential/viewResidential/viewResidential";

function AppRoutes() {
  const navigate = useNavigate();

  const openCreateResidential = () => {
    navigate("/residential/create");
  };

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
            element={<Home properties="commercials" onAddNew={openCreateResidential} />}
          />
          <Route
            path="/residential"
            element={<Home properties="residentials" onAddNew={openCreateResidential} />}
          />
          <Route
            path="/plots"
            element={<Home properties="plots" onAddNew={openCreateResidential} />}
          />
          <Route path="/commercial/create" element={<CreateResidential />} />
          <Route path="/plots/create" element={<CreateResidential />} />
          <Route path="/residential/create" element={<CreateResidential />} />
          <Route path="/plots/view-residential" element={<ViewResidential />} />
          <Route path="/plots/view-residential/:id" element={<ViewResidential />} />
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
          ProfileLogo="Ellipse 1.svg"
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
