import { useEffect, useMemo, useState } from "react";
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

type PropertyType = "all" | "residentials" | "commercials" | "plots";
interface PropertyData {
  residential: ResidentialProperty[];
  commercial: ResidentialProperty[];
  plot: ResidentialProperty[];
}

function Home({ properties }: { properties: PropertyType }) {
  const [currentActiveTab, setCurrentActiveTab] = useState<
    "pending" | "approved" | "rejected" | "deleted"
  >("pending");
  const [dashboardData, setDashboardData] = useState<PropertyData>({
    residential: [],
    commercial: [],
    plot: [],
  });
  const [sortOption, setSortOption] = useState("Newest");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const [responseData, setResponseData] = useState<any>(null);


  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const sideNavTabvalue: PropertyType = useMemo(() => {
    const pathname = location.pathname.toLowerCase();
    if (pathname.includes("residential")) return "residentials";
    if (pathname.includes("commercial")) return "commercials";
    if (pathname.includes("plot")) return "plots";
    if (pathname.includes("dashboard")) return "all";
    return "all";
  }, [location.pathname]);

  const fetchAllData = async (pageNum: number = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BackEndUrl}/api/${sideNavTabvalue}?page=${pageNum}&limit=10`
      );
      const data = response?.data?.data;
      setResponseData(response?.data);
      const backendHasMore = response?.data?.hasMore;
      
      const hasMoreData = backendHasMore !== undefined ? backendHasMore : true;
      
      setHasMore(hasMoreData);

      if (sideNavTabvalue === "all") {
        setDashboardData((prev) => ({
          residential:
            pageNum === 1
              ? data?.residential?.items || []
              : [...prev.residential, ...(data?.residential?.items || [])],
          commercial:
            pageNum === 1
              ? data?.commercial?.items || []
              : [...prev.commercial, ...(data?.commercial?.items || [])],
          plot:
            pageNum === 1
              ? data?.plot?.items || []
              : [...prev.plot, ...(data?.plot?.items || [])],
        }));
      } else {
const singularType = sideNavTabvalue.replace(/s$/, "") as keyof PropertyData;
        setDashboardData((prev) => ({
          ...prev,
          [singularType]:
            pageNum === 1 ? data || [] : [...(prev[singularType] || []), ...(data || [])],
        }));
      }
      setLoading(false);
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.message : "Unexpected error");
      setLoading(false);
    }
  };
  console.log("responseData",responseData)

     const totalCount = useMemo(() => {
  if (!responseData) return 0;

  switch (properties) {
    case "residentials":
      return responseData.total ?? 0;
    case "commercials":
      return responseData.total ?? 0;
    case "plots":
      return responseData.total ?? 0;
    case "all":
    default:
      return (
        (responseData.data.residential?.total ?? 0) +
        (responseData.data.commercial?.total ?? 0) +
        (responseData.data.plot?.total ?? 0)
      );
  }
}, [responseData, properties]);

  const handleScrollLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => {
        const nextPage = prev + 1;
        fetchAllData(nextPage);
        return nextPage;
      });
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setDashboardData({
      residential: [],
      commercial: [],
      plot: [],
    });
    
    fetchAllData(1);

    // Listen for refresh events
    const handleRefresh = () => {
      setPage(1);
      setHasMore(true);
      fetchAllData(1);
    };
    
    window.addEventListener("refreshTableData", handleRefresh);
    return () => window.removeEventListener("refreshTableData", handleRefresh);
  }, [sideNavTabvalue, currentActiveTab]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSkeletonLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

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

  const tableData = useMemo(() => {
    switch (sideNavTabvalue) {
      case "residentials":
        return { residential: dashboardData.residential };
      case "commercials":
        return { commercial: dashboardData.commercial };
      case "plots":
        return { plot: dashboardData.plot };
      case "all":
      default:
        return {
          all: [
            ...(dashboardData.residential?.map((item) => ({
              ...item,
              type: "Residential",
            })) || []),
            ...(dashboardData.commercial?.map((item) => ({
              ...item,
              type: "Commercial",
            })) || []),
            ...(dashboardData.plot?.map((item) => ({ ...item, type: "Plot" })) || []),
          ],
        };
    }
  }, [dashboardData, sideNavTabvalue]);

  const triggerReset = () => {
    setIsSkeletonLoading(true);
    setPage(1);
    setHasMore(true);
    fetchAllData(1);
    setTimeout(() => {
      setIsSkeletonLoading(false);
    }, 2000);
  };

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">
          <strong>Error:</strong> {error}
        </Alert>
      </Box>
    );
  }

  const headingMap = {
    all: "Dashboard",
    residentials: "Manage Residential Properties",
    commercials: "Manage Commercial Properties",
    plots: "Manage Plots Properties",
  };

  const paragMap = {
    all: "Get a comprehensive view of all the properties",
    residentials: "Review and track residential property entries easily",
    commercials: "Review and track commercial property entries easily",
    plots: "Review and track plots property entries easily",
  };

  const heading = headingMap[properties];
  const para = paragMap[properties];

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
                  <h3 className="dashboard-title">{heading}</h3>
                  <p className="dashboard-description">{para}</p>
                </div>
                <div data-testid="mock-modal">
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
                  totalCount={totalCount} 
                properties={sideNavTabvalue}
                onScrollLoadMore={handleScrollLoadMore}
                loading={loading}
                hasMore={hasMore}
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

export default Home;