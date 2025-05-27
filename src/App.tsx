import "./App.css";
import Header from "./components/Common/Navbar/Navbar";
import Sidebar from "./components/Common/Sidebar/Sidebar";
import Home from "./components/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateResidential } from "./components/Residential/Create_Residential/Create_Residential";

 
function App() {
  return (
   
    <div className="grid-container">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-5 col-md-3">
            <Sidebar />
          </div>
          <div className="col-7 col-md-9">
            <Router>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/createResidential"
                element={<CreateResidential />}
              />
                <Route path="/" element={<Home />} />
                <Route path="/Profile" element={<Profile />} />
              </Routes>
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
