import "./App.css";
//
import Home from "./components/Dashboard/Dashboard";
import { CreateResidential } from "./components/Residential/Create_Residential/Create_Residential";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Common/Sidebar/Sidebar";
import Header from "./components/Common/Navbar/Navbar";
function App() {
  return (
    <div className="grid-container">
      <Header />
      <div className="container">
        <div className="sidebar">
          <Sidebar />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/createResidential"
                element={<CreateResidential />}
              />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
