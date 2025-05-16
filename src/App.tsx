
import './App.css'
import Header from './components/Common/Navbar/Navbar'
import Sidebar from './components/Common/Sidebar/Sidebar'
import Home from './components/Dashboard/Dashboard'

function App() {

  return (
    <div className='grid-container'>
      <Header />
      <div className="container">
        <div className="sidebar">
          <Sidebar/>
          <Home/>
        </div>
      </div>
    </div>
  )
}

export default App
