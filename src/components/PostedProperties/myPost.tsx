import  { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./myPost.scss";
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

// Add this helper function at the top of your file
const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch (e) {
    console.error("Failed to parse JWT:", e);
    return null;
  }
};

interface PropertyData {
  residential: ResidentialProperty[];
  commercial: ResidentialProperty[];
  plot: ResidentialProperty[];
  
}

function MyPost() {
  const [currentActiveTab, setCurrentActiveTab] = useState<
  "pending" | "approved" | "rejected" | "deleted"
>("pending");
  const [dashboardData, setDashboardData] = useState<PropertyData>({
    residential: [],
    commercial: [],
    plot: [],
    
  });
  const [sortOption, setSortOption] = useState("Newest");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState<
    string | null
  >(null);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

// const sideNavTabvalue = useMemo(() => {
//   const pathname = location.pathname.toLowerCase();
//   return pathname.includes("postedproperties") ? "postedProperties" : "postedProperties";
// }, [location.pathname]);

  // Get user ID from token
  const getUserId = (): string => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      throw new Error("No token found");
    }

    const payload = parseJwt(token);
    if (!payload) {
      navigate("/login");
      throw new Error("Invalid token");
    }

    const userId = payload.userId || payload.sub || payload.id || payload.user_id;
    if (!userId) {
      console.error("Token payload:", payload);
      navigate("/login");
      throw new Error("User ID not found in token");
    }

    return userId;
  };

  // 5. Add this fetch function
   const fetchMyPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const userId = getUserId();
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_BackEndUrl}/api/myposts/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
          validateStatus: (status) => status < 500 // Don't throw for 404
        }
      );

      // Handle API response
      if (response.status === 404) {
        setDashboardData({ residential: [], commercial: [], plot: [] });
        return;
      }

      if (!response.data) {
        throw new Error("Invalid response from server");
      }

      // Handle both array and object response formats
      const responseData = response.data.data || response.data;
      let normalizedData = {
        residential: [] as ResidentialProperty[],
        commercial: [] as ResidentialProperty[],
        plot: [] as ResidentialProperty[]
      };

      if (Array.isArray(responseData)) {
        // If API returns direct array
        normalizedData.residential = responseData;
      } else {
        // If API returns object with categories
        normalizedData = {
          residential: responseData.residential || [],
          commercial: responseData.commercial || [],
          plot: responseData.plot || []
        };
      }

      setDashboardData(normalizedData);

    } catch (err) {
      let errorMessage = "Failed to load properties";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
      setIsSkeletonLoading(false);
    }
  };
  
// Update your useEffect hook for data fetching
  // 6. Update your useEffect
  useEffect(() => {
    fetchMyPosts();

    const handleRefresh = () => {
      setIsSkeletonLoading(true);
      fetchMyPosts();
    };

    window.addEventListener("refreshTableData", handleRefresh);
    return () => window.removeEventListener("refreshTableData", handleRefresh);
  }, []);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSkeletonLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  

const displayContent = {
    heading: "My Posted Properties",
    para: "View and manage all properties you've posted"
  };



  const handleOpen = () => {
    const path = location.pathname;
    if (path === "/dashboard") setOpen(true);
    else if (path === "/commercial")
      navigate("/commercial/create", { state: { mode: "create" } });
    else if (path === "/residential")
      navigate("/residential/create", { state: { mode: "create" } });
    else if (path === "/plot")
      navigate("/plot/create", { state: { mode: "create" } });
  };

  const handleClose = () => setOpen(false);

  const handleChildScroll = (scrollTop: number) => {
    const currentScrollY = scrollTop;
    setHideHeader(currentScrollY > lastScrollY && currentScrollY >= 20);
    setLastScrollY(currentScrollY);
  };

const tableData = useMemo(() => ({
    all: [
      ...dashboardData.residential.map((item: ResidentialProperty) => ({ 
        ...item, 
        type: "Residential" as const 
      })),
      ...dashboardData.commercial.map((item: ResidentialProperty) => ({ 
        ...item, 
        type: "Commercial" as const 
      })),
      ...dashboardData.plot.map((item: ResidentialProperty) => ({ 
        ...item, 
        type: "Plot" as const 
      }))
    ]
  }), [dashboardData]);

const triggerReset = () => {
  setIsSkeletonLoading(true);
  setTimeout(() => {
    setIsSkeletonLoading(false);
  }, 2000);
};

// 7. Render loading/error states
  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" p={3}>
        <CircularProgress size={24} />
        <Typography variant="body1" ml={2}>
          Loading your properties...
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

  return (
    <div className="home-sec">
      {isSkeletonLoading ? (
        <div style={{ padding: "20px" }}>
          <Skeleton variant="rectangular" height={50} width="100%" />
          <Skeleton
            variant="text"
            height={30}
            width="80%"
            style={{ marginTop: 16 }}
          />
          <Skeleton
            variant="rectangular"
            height={300}
            width="100%"
            style={{ marginTop: 24 }}
          />
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
                  <h3 className="dashboard-title">{displayContent.heading}</h3>
                  <p className="dashboard-description">{displayContent.para}</p>
                </div>
                <div>
                  <GenericButton
                    variant="primary"
                    image={iconAdd}
                    iconPosition="left"
                    label="Add New"
                    className="genericNewPostStyles"
                    onClick={handleOpen}
                  />
                  <Modal open={open} onClose={handleClose}>
                    <Box
                      sx={{
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
                      }}
                    >
                      <div className="property-option">
                        <FormControl>
                          <FormLabel>Add New Property/ Plot</FormLabel>
                          <RadioGroup
                            row
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
                        label="Continue"
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
                            navigate("/plot/create", {
                              state: { mode: "create" },
                            });
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
                onSortChange={setSortOption} 
                selectedSort={sortOption}
                data={tableData}
                properties="all"
                onScrollChangeParent={handleChildScroll}
                onReset={triggerReset}
                currentActiveTab={currentActiveTab}
                setCurrentActiveTab={setCurrentActiveTab}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPost;
