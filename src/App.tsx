import "./App.css";
import Header from "./components/Common/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Home from "./components/Dashboard/Dashboard";
import { CreateResidential } from "./components/Residential/Create_Residential/Create_Residential";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    
    <div className="grid-container">
      <Header />
      <div className="container">
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/createResidential" element={<CreateResidential />}/>
              </Routes>
            </Router>
      </div>
    </div>

  );
}

export default App;
