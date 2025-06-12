import "./App.css";
import Header from "./components/Common/Navbar/Navbar";
import Sidebar from "../src/components/Common/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <div className="grid-container">
      <Header
        MainLogo="prh-admin-new.svg"
        Title="Admin"
        ProfileLogo="Ellipse 1.svg"
        Profile={false}
      />
      <div className="container body-content-container">
        <Router>
          <Routes>
            <Route path="/" element={<Sidebar />} />
          </Routes>
        </Router>
      </div>
     
    </div>
  );
}

export default App;
