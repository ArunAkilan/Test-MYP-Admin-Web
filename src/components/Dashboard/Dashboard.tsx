import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import GenericButton from "../Common/Button/button";
import iconAdd from "../../../public/ICO_Add-1.svg"
import Dashboardtab from "../Common/HorizondalTab/Dashboardtab";


import type { ResidentialProperty } from "../AdminResidencial/AdminResidencial.model";

type PropertyType = "residentials" | "commercials" | "plots";

export interface HomeProps {
  properties: PropertyType;
}

function Home({ properties }:  HomeProps ) {
  const [residencial, setResidencial]= useState <ResidentialProperty[]> ([])
  console.log("residencial", residencial);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate=useNavigate()

  useEffect(() => {
  if(properties){
    const fetchResidencial = async () => {
      try {
        const response = await axios.get(`http://192.168.1.70:3002/api/${properties}`);
        setResidencial(response.data.data);
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
  
    fetchResidencial();
  }
  }, []);
  
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
          <Dashboardtab data={residencial} properties={properties} />
        </div>
      </div>
      
    </div>
  );
}

export default Home;
