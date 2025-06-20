import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import GenericButton from "../Common/Button/button";
import iconAdd from "../../../public/ICO_Add-1.svg";
import Dashboardtab from "../Common/HorizondalTab/Dashboardtab";

import type { ResidentialProperty } from "../AdminResidencial/AdminResidencial.model";

type PropertyType = "all" | "residentials" | "commercials" | "plots";

interface HomeProps {
  properties: PropertyType;
}

interface PropertyData {
  residential: ResidentialProperty[];
  commercial: ResidentialProperty[];
  plot: ResidentialProperty[];
}

function Home({ properties }: HomeProps) {
  const [dashboardData, setDashboardData] = useState<PropertyData>({
    residential: [],
    commercial: [],
    plot: [],
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const mapKey: Record<PropertyType, keyof PropertyData> = {
    residentials: "residential",
    commercials: "commercial",
    plots: "plot",
    all: "residential", // not used directly
  };

  useEffect(() => {
    const fetchAllData = async () => {
      
      try {
        const response = await axios.get(`http://65.0.45.96:3002/api/${properties}`);

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
  }, [properties]);

  if (loading) return <p style={{ padding: "1rem" }}>Loading data for {properties}...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  console.log("dashboardData msg",dashboardData)
  const hasData =
    dashboardData.residential.length > 0 ||
    dashboardData.commercial.length > 0 ||
    dashboardData.plot.length > 0;

  if (!hasData) return <p>No data found for {properties}</p>;

  return (
    <div className="home-sec ">
      <div className="new-post-wrap">
        <div className="container">
          <div className="house-topic">
            <div className="house-topic-content">
              <h3>Residential Properties</h3>
              <p>
                Manage listing data efficiently for streamlined rental property
                tracking
              </p>
            </div>

            <GenericButton
              variant="primary"
              image={iconAdd}
              iconPosition="left"
              label={"Add New Property"}
              className="genericNewPostStyles"
              onClick={() =>
                navigate("/createResidential", { state: { mode: "create" } })
              }
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="pending-approve">
          <Dashboardtab data={dashboardData} properties={properties} />
          
        </div>
      </div>
    </div>
  );
}

export default Home;
