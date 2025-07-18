import Header from "./components/Common/Navbar/Navbar";
import Sidebar from "./components/Common/Sidebar/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  // useNavigate,
  useLocation,
  useMatch,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import navbarLogo from "../src/assets/navbar/PRH_Admin-resize.svg";
import Home from "./components/Dashboard/Dashboard";
import "./App.scss";
import { useEffect } from "react";
import CreateProperty from "./components/Properties/properties";
import CreateCommercialProperty from "./components/Properties/createProperties/Commercial/createCommercial";
import CreatePlotProperty from "./components/Properties/createProperties/Plot/createPlot";
import CommercialView from "../src/components/Properties/viewProperties/CommercialProperty/CommercialViewProperty"; // <-- import CommercialView here
import ViewProperty from "./components/Properties/viewProperties/ResidentialView/ResidentialViewProperty";
import PlotView from "./components/Properties/viewProperties/PlotView/PlotViewProperty";
import Login from "./components/Login/Login";
import { IconButton, styled, useTheme, type CSSObject, type Theme } from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon, MenuIcon } from "lucide-react";
import ProtectedRoute from "./components/Login/ProtectedRoute";
import { useMediaQuery } from '@mui/material';

function AppRoutes() {
  //const navigate = useNavigate();     
 const location = useLocation();
  const isMobile = useMediaQuery('(max-width:992px)');
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
  if (isMobile) {
    setOpen(false);
  }
}, [isMobile]);


  // const isLoginRoute = location.pathname === "/admin";

  // const openCreateResidential = () => {
  //   navigate("/residential/create");
  // };
  // const openCreateCommercial = () => navigate("/commercial/create");
  // const openCreatePlotProperty = () => navigate("/plots/create");

  // const noScrollRoutes = [
  //   "/dashboard",
  //   "/commercial",
  //   "/residential",
  //   "/plots"
  // ];

  useEffect(() => {
    // const noScrollRoutes = [
    //   "/dashboard",
    //   "/commercial",
    //   "/residential",
    //   "/plots",
    // ];
 
    //const shouldHideScroll = noScrollRoutes.includes(location.pathname);
    // document.body.style.overflow = shouldHideScroll ? "hidden" : "auto";
  }, [location.pathname]);
  // const location = useLocation();
 
  // Define routes where sidebar should be hidden
  const hideSidebarRoutes = [
    "/residential/view",
    "/commercial/view",
    "/plots/view",
    "/login",
    "/login"
  ];
 
  // Check if the current pathname starts with any of the routes
  const shouldHideSidebar = hideSidebarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
 
  /***Drawer Component */
  const locationIsAdmin = location.pathname === "/login";
  locationIsAdmin ? document.body.style.background = '#F0F5FC' :
    document.body.style.background = '#FFFFFF';

  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
 
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const drawerWidth = 230;
 
  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    marginTop: "61px"
  });
 
  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
    marginTop: "61px"
  });

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      variants: [
        {
          props: ({ open }) => open,
          style: {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
          },
        },
        {
          props: ({ open }) => !open,
          style: {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
          },
        },
      ],
    }),
  );
  /****Drawer Component */




  return (
    <div className="app-container row">

      {
        !shouldHideInResidentialView &&
        !shouldHideInCommercialView &&
        !shouldHideInPlotView &&
        !shouldHideInResidentialCreate &&
        !shouldHideInCommercialCreate &&
        !shouldHideInPlotCreate &&
        !locationIsAdmin && <Drawer variant="permanent" open={open} >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                justifyContent: "end",
                "&:hover": {
                  backgroundColor: "transparent !important"
                }
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          {open && <IconButton onClick={handleDrawerClose} sx={{
            justifyContent: "end", "&:hover": {
              backgroundColor: "transparent !important"
            }
          }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>}
          {!shouldHideSidebar && <Sidebar />}
        </Drawer>}
      <div
        // className={`content-area ${!shouldHideSidebar ? "col-md-9 offset-md-3" : "col-md-12"
        //   }`}
        className={`content-area`}
        style={{ flex: 1, overflowY: "auto" }}
      >
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Home properties="all" />} />

              <Route
                path="/commercial"
                element={<Home properties="commercials" />}
              />
              <Route
                path="/residential"
                element={<Home properties="residentials" />}
              />
              <Route path="/plots" element={<Home properties="plots" />} />
              <Route
                path="/commercial/create"
                element={<CreateCommercialProperty />}
              />
              <Route path="/plots/create" element={<CreatePlotProperty />} />
              <Route path="/residential/create" element={<CreateProperty />} />
              <Route path="/plot/view/:id" element={<PlotView />} />
              <Route path="/residential/view/:id" element={<ViewProperty />} />
              <Route path="/commercial/view/:id" element={<CommercialView />} />
          </Route>
        </Routes>

      </div>
    </div>
  );
}
 
function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}
 
 
function LayoutWrapper() {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";

  const getLoggedInUserName: any = localStorage.getItem("user");
  const parsedLoggedInUserName = JSON.parse(getLoggedInUserName);

  return (
    <div className="grid-container">
      {!isLoginRoute && (
        <Header
          MainLogo={navbarLogo}
          Title={parsedLoggedInUserName?.profileInformation?.firstName ?? ""}
          ProfileLogo="/Ellipse 1.svg"
          Profile={false}
        />
      )}
      <div className="container body-content-container">
        <AppRoutes />
      </div>
    </div>
  );
}
 
export default App;