import "./App.css";
import Header from "./components/Common/Navbar/Navbar";

// import LoginPage from "./components/LogingPage/login";
// import MobileInput from "./components/LogingPage/loginModules/MobileInput/MobileInput";
import Login from "./components/LogingPage/loginModules/LoginInputs/LoginInputs";
function App() {
  return (
    
    // <div className="grid-container">
    //   <Header MainLogo="PRH Admin 1.png" Title="Admin" ProfileLogo="Ellipse 1.svg" Profile={true} />
    //   <div className="container">
    //     <Sidebar />
    //         {/* <Router>
    //           <Routes>
    //             <Route path="/" element={<Home />} />
    //             <Route path="/Profile" element={<Profile />} />
    //             <Route path="/createResidential" element={<CreateResidential />}/>
    //           </Routes>
    //         </Router> */}
            
    //   </div>
    // </div>
    <div>
      <Header />
      <Login />
    </div>

  );
}

export default App;
