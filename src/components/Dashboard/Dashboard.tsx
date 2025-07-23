import React, { useEffect, useState} from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.scss";
import GenericButton from "../Common/Button/button";
import iconAdd from "../../../public/ICO_Add-1.svg";
import Dashboardtab from "../Common/HorizondalTab/Dashboardtab";
import type { ResidentialProperty } from "../AdminResidencial/AdminResidencial.model";
import {
  Box,
  Modal,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  CircularProgress,
  Typography,
  Alert,
  Skeleton,
} from "@mui/material";
// import { useAppSelector } from "../../hook";

type PropertyType = "all" | "residentials" | "commercials" | "plots";

interface HomeProps {
  properties: PropertyType;
}

interface PropertyData {
  residential: ResidentialProperty[];
  commercial: ResidentialProperty[];
  plot: ResidentialProperty[];
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

function Home({ properties  }: HomeProps) {
  const [dashboardData, setDashboardData] = useState<PropertyData>({
    residential: [],
    commercial: [],
    plot: [],
  });
  const [loadingBackdrop, setLoadingBackdrop] = useState(false);
  //  const activeTab = useAppSelector(state => state.tabs.currentTab);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  console.log("loadingBackdrop",loadingBackdrop)
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

  useEffect(() => {
    if (location.state?.from === "residentialCreateSuccess") {
      setLoadingBackdrop(true);
      window.history.replaceState({}, document.title);
      setTimeout(() => {
        setLoadingBackdrop(false);
        window.dispatchEvent(new Event("refreshTableData"));
      }, 2000);
    }
  }, [location.state]);

  const handleOpen = () => {
    if (location.pathname === "/dashboard") {
      setOpen(true);
    } else if (location.pathname === "/commercial") {
      navigate("/commercial/create", { state: { mode: "create" } });
    } else if (location.pathname === "/residential") {
      navigate("/residential/create", { state: { mode: "create" } });
    } else if (location.pathname === "/plot") {
      navigate("/plot/create", { state: { mode: "create" } });
    }
  };

  const handleClose = () => setOpen(false);

  const handleChildScroll = (scrollTop: number) => {
    const currentScrollY = scrollTop;
    setHideHeader(currentScrollY > lastScrollY && currentScrollY >= 20);
    setLastScrollY(currentScrollY);
  };

  // const pathname = location.pathname;

  // const resolvedProperty = useMemo(() => {
  //   if (pathname.includes("residential")) return "residentials";
  //   if (pathname.includes("commercial")) return "commercials";
  //   if (pathname.includes("plot")) return "plots";
  //   return "all";
  // }, [pathname]);

  useEffect(() => {
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BackEndUrl}/api/${properties === "all" ? "all" : properties}`
      );

      if (properties === "all") {
        setDashboardData({
          residential: response.data.data.residential ?? [],
          commercial: response.data.data.commercial ?? [],
          plot: response.data.data.plots ?? [],
        });
      } else {
        const keyMap = {
          residentials: "residential",
          commercials: "commercial",
          plots: "plot",
        } as const;

        const resolvedKey = keyMap[properties as keyof typeof keyMap];

        setDashboardData((prev) => ({
          ...prev,
          [resolvedKey]: response.data.data ?? [],
        }));
      }

      setLoading(false);
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.message : "Unexpected error");
      setLoading(false);
    }
  };

  fetchAllData();

  const handleRefresh = () => fetchAllData();
  window.addEventListener("refreshTableData", handleRefresh);
  return () => window.removeEventListener("refreshTableData", handleRefresh);
}, [properties]);
console.log(properties,"propo")

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSkeletonLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" p={3}>
        <CircularProgress size={24} />
        <Typography variant="body1" ml={2}>
          Loading data for <strong>{properties}</strong>...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">
          <strong>Error:</strong> {error}
        </Alert>
      </Box>
    );
  }

  const hasData =
    dashboardData.residential.length > 0 ||
    dashboardData.commercial.length > 0 ||
    dashboardData.plot.length > 0;

  if (!hasData) {
    return <p>No data found for {properties}</p>;
  }

  return (
    <div className="home-sec">
      {isSkeletonLoading ? (
        <div style={{ padding: "20px" }}>
          <Skeleton variant="rectangular" height={50} width="100%" />
          <Skeleton variant="text" height={30} width="80%" style={{ marginTop: 16 }} />
          <Skeleton variant="rectangular" height={300} width="100%" style={{ marginTop: 24 }} />
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ marginTop: 20 }}>
              <Skeleton variant="rectangular" width="100%" height={120} />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </div>
          ))}
        </div>
      ) : (
        <div>
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
                    onClick={handleOpen}
                  />
                  <Modal open={open} onClose={handleClose}>
                    <Box sx={style}>
                      <div className="property-option">
                        <FormControl>
                          <FormLabel>Add New Property/ Plot</FormLabel>
                          <RadioGroup
                            row
                            name="row-radio-buttons-group"
                            value={selectedPropertyType}
                            onChange={(e) => setSelectedPropertyType(e.target.value)}
                          >
                            <FormControlLabel value="Commercial" control={<Radio />} label="Commercial" />
                            <FormControlLabel value="Residential" control={<Radio />} label="Residential" />
                            <FormControlLabel value="other" control={<Radio />} label="Plot" />
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
                            navigate("/residential/create", { state: { mode: "create" } });
                          } else if (selectedPropertyType === "Commercial") {
                            navigate("/commercial/create", { state: { mode: "create" } });
                          } else if (selectedPropertyType === "other") {
                            navigate("/plot/create", { state: { mode: "create" } });
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
        </div>
      )}
    </div>
  );
}


export default Home;
