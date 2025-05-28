import "./App.css";
import Header from "./components/Common/Navbar/Navbar";
import Sidebar from '../src/components/Common/Sidebar/Sidebar'

function App() {
  return (
    
    <div className="grid-container">
      <Header MainLogo="PRH Admin 1.png" Title="Admin" ProfileLogo="Ellipse 1.svg" Profile={true} />
      <div className="container">
        <Sidebar />
            {/* <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/createResidential" element={<CreateResidential />}/>
              </Routes>
            </Router> */}
      </div>
    </div>

  );
}

export default App;
