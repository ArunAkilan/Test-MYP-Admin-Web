import "./App.css";
import Header from "./components/Common/Navbar/Navbar";
import Sidebar from "../src/components/Common/Sidebar/Sidebar";
import Property from "./components/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Common/Footer/Footer";

function App() {
  return (
    <div className="grid-container">
      <Header
        MainLogo="PRH Admin 1.png"
        Title="Admin"
        ProfileLogo="Ellipse 1.svg"
        Profile={true}
      />
      <div className="container body-content-container">
        <Router>
          <Routes>
            <Route path="/" element={<Sidebar />} />
            <Route path="/Property" element={<Property />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
