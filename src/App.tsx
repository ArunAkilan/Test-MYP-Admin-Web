import "./App.css";
import Header from "./components/Common/Navbar/Navbar";
import Sidebar from "../src/components/Common/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import LoginPage from "./components/LogingPage/login";
// import MobileInput from "./components/LogingPage/loginModules/MobileInput/MobileInput";
import Login from "./components/LogingPage/loginModules/LoginInputs/LoginInputs";
function App() {
  return (
    <div className="grid-container">
      <Header
        MainLogo="PRH Admin 1.svg"
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
