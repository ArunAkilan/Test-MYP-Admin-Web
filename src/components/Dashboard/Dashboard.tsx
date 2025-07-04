import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

import axios from "axios";
//import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import GenericButton from "../Common/Button/button";
import iconAdd from "../../../public/ICO_Add-1.svg";
import Dashboardtab from "../Common/HorizondalTab/Dashboardtab";
import { useLocation } from "react-router-dom";
import type { ResidentialProperty } from "../AdminResidencial/AdminResidencial.model";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from 'react-router-dom';

type PropertyType = "all" | "residentials" | "commercials" | "plots";

interface HomeProps {
  properties: PropertyType;
  onAddNew?: () => void;
}

interface PropertyData {
  residential: ResidentialProperty[];
  commercial: ResidentialProperty[];
  plot: ResidentialProperty[];
}

const mapKey: Record<PropertyType, keyof PropertyData> = {
  residentials: "residential",
  commercials: "commercial",
  plots: "plot",
  all: "residential", // not used directly
};

interface HomeProps {
  properties: PropertyType;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 470,
  bgcolor: "background.paper",
  boxShadow: 24,
  px: 5,
  py: 3,
  borderRadius: 2,
};



// function Home({ properties, onAddNew }: HomeProps)
function Home({ properties }: HomeProps) {
  const [dashboardData, setDashboardData] = useState<PropertyData>({
    residential: [],
    commercial: [],
    plot: [],
  });
  //dynamic changing :
  const headingMap: Record<PropertyType, string> = {
    all: "Dashboard",
    residentials: "Manage Residential Properties",
    commercials: "Manage Commercial Properties",
    plots: "Manage Plots Properties",
  };
  const heading = headingMap[properties] || "Properties";

  const paragMap: Record<PropertyType, string> = {
    all: "Get a comprehensive view of all the properties",
    residentials: "Review and track residential property entries easily",
    commercials: "Review and track commercial property entries easily",
    plots: "Review and track plots property entries easily",
  };
  const para = paragMap[properties] || "Properties";

  const [loadingBackdrop, setLoadingBackdrop] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  console.log("loading",loading)
  const [error, setError] = useState<string | null>(null);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState("");

  const location = useLocation();
  console.log("propertyDataddd", location);
 // NEW: Show Backdrop on successful create redirect
 useEffect(() => {
  if (location.state?.from === "residentialCreateSuccess") {
    setLoadingBackdrop(true);

     // Clear the state so backdrop doesn't show again on refresh
     window.history.replaceState({}, document.title);

     setTimeout(() => {
      setLoadingBackdrop(false);
      window.dispatchEvent(new Event("refreshTableData")); // ✅ triggers table reload
    }, 2000); // show for 2 seconds
  }
}, [location.state]);

  const handleOpen = () => {
    if(location?.pathname==="/dashboard"){
      setOpen(true);
    }
    else if(location?.pathname==="/commercial"){
      navigate("/commercial/create", {
        state: { mode: "create" },
      });
    }
    else if(location?.pathname==="/residential"){
      navigate("/residential/create", {
        state: { mode: "create" },
      });
    }
    else if(location?.pathname==="/plots"){
       navigate("/plots/create", {
        state: { mode: "create" },
      });
    }
    
  }
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const handleChildScroll = (scrollTop: number) => {
    // setIsFixed(scrollTop > 50);
    const currentScrollY = scrollTop;

    // Show header when scrolling up
    if (currentScrollY < lastScrollY || currentScrollY < 20) {
      setHideHeader(false);
    } else {
      setHideHeader(true);
    }

    setLastScrollY(currentScrollY);
  };



  const propertyData = location.state?.data;
  console.log("propertyData", propertyData);

  

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BackEndUrl}/api/${properties}`
        );

        if (properties === "all") {
          setDashboardData({
            residential: response.data.data.residential ?? [],
            commercial: response.data.data.commercial ?? [],
            plot: response.data.data.plots ?? [],
          });
        } else {
          setDashboardData((prev) => ({
            ...prev,
            [mapKey[properties]]: response.data.data ?? [],
          }));
        }
        console.log("API data cpmmercial:", response.data.data);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err) && err.message) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
        setLoading(false);
      }
      
    };

    fetchAllData();

    const handleRefresh = () => fetchAllData(); // refresh handler

    window.addEventListener("refreshTableData", handleRefresh);
    return () => window.removeEventListener("refreshTableData", handleRefresh);
  }, [properties]);

  if (loading)
    return <p style={{ padding: "1rem" }}>Loading data for {properties}...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  console.log("dashboardData msg", dashboardData);
  const hasData =
    dashboardData.residential.length > 0 ||
    dashboardData.commercial.length > 0 ||
    dashboardData.plot.length > 0;

  if (!hasData) {
    return <p>No data found for {properties}</p>;
  }

  return (
    
    <div className="home-sec">

      <div className={`new-post-wrap ${hideHeader ? "hide" : ""}`}>
        <div className="container">
          <div className="house-topic">
            <div className="house-topic-content">
              <h3>{heading}</h3>
              <p>{para}</p>
            </div>
            <div>
              <GenericButton
                variant="primary"
                image={iconAdd}
                iconPosition="left"
                label={"Add New Property"}
                className="genericNewPostStyles"
                onClick={() => {
                  // onAddNew?.();
                  handleOpen();
                  // navigate("/createResidential",
                  //    { state: { mode: "create" } });
                }}
              />
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div className="property-option">
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Add New Property/ Plot
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={selectedPropertyType}
                        onChange={(e) =>
                          setSelectedPropertyType(e.target.value)
                        }
                      >
                        <FormControlLabel
                          value="Commercial"
                          control={<Radio />}
                          label="Commercial"
                        />
                        <FormControlLabel
                          value="Residential"
                          control={<Radio />}
                          label="Residential"
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          label="Plot"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <GenericButton
                    image={iconAdd}
                    iconPosition="left"
                    label={"Continue"}
                    className="genericContinueButton"
                    onClick={() => {
                      if (selectedPropertyType === "Residential") {
                        navigate("/residential/create", {
                          state: { mode: "create" },
                        });
                      } else if (selectedPropertyType === "Commercial") {
                        navigate("/commercial/create", {
                          state: { mode: "create" },
                        });
                      } else if (selectedPropertyType === "other") {
                        navigate("/plots/create", { state: { mode: "create" } });
                      } else {
                        alert("Please select a property type.");
                      }
                    }}
                  />
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="pending-approve">
          <Dashboardtab
            data={dashboardData}
            properties={properties}
            onScrollChangeParent={handleChildScroll}
          />
        </div>
      </div>
       {/* Backdrop spinner when loading */}
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading || loadingBackdrop}
      
    >
      <CircularProgress color="inherit" />
      <span style={{ marginLeft: 10 }}>Loading data for {properties}...</span>

    </Backdrop>

    {/* Show error message if any */}
    {error && <p style={{ color: "red" }}>Error: {error}</p>}

    {/* Show no data message only if not loading and no error */}
    {!loading && !error && !hasData && <p>No data found for {properties}</p>}

    {/* Show dashboard only if loaded, no error, and has data */}
    {!loading && !error && hasData && (
      <>
        {/* Your dashboard content goes here */}
        {/* For example, your existing JSX inside <div className="home-sec"> */}
      </>
    )}


    </div>
  );
}

export default Home;
