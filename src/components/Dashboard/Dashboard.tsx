import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import GenericButton from "../Common/Button/button";
import iconAdd from "../../../public/ICO_Add-1.svg"
import Dashboardtab from "../Common/HorizondalTab/Dashboardtab";


import type { ResidentialProperty } from "../AdminResidencial/AdminResidencial.model";

type PropertyType = "all" | "residentials" | "commercials" | "plots";

export interface HomeProps {
  data?: ResidentialProperty[];
  properties: PropertyType;
}

function Home({ properties }:  HomeProps ) {
  const [dashboardData, setDashboardData]= useState <any> ([])
  console.log("dashboardData", dashboardData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate=useNavigate()

  useEffect(() => {
  if(properties){
    const fetchAllData = async () => {
      try {
        const response = await axios.get(`http://192.168.1.70:3002/api/${properties}`);
         if (properties === "all") {
          // const allData = [
          //   ...(response.data.residentials ?? []),
          //   ...(response.data.commercials ?? []),
          //   ...(response.data.plots ?? []),
          // ];
          // setDashboardData(allData);
          setDashboardData(response.data.data ?? []);
          console.log("API response for all:", response.data.data);
        } else {
          setDashboardData(response.data.data ?? []);
        }
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
  }
  }, [properties]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  

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
              onClick={() => navigate("/createResidential", { state: { mode: "create" } })}
            />
          </div>
        </div>
      </div>
      <div className="container">
        
        <div className="pending-approve">
            // @ts-ignore
           <Dashboardtab data={dashboardData} properties={properties} />
        </div>
      </div>
      
    </div>
  );
}

export default Home;
