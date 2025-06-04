import "./App.css";
import Header from "./components/Common/Navbar/Navbar";
import Sidebar from '../src/components/Common/Sidebar/Sidebar'

function App() {
  return (
    
    <div className="grid-container">
      <Header MainLogo="PRH Admin 1.png" Title="Admin" ProfileLogo="Ellipse 1.svg" Profile={true} />
      <div className="container body-content-container">
        <Sidebar />
            
      </div>
    </div>

  );
}

export default App;
