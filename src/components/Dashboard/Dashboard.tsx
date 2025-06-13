import { useEffect, useState } from "react";
import axios from "axios";

import Table from "../Common/DashboradTable/table";
import "./Dashboard.scss";
import GenericButton from "../Common/Button/button";
import iconAdd from "../../../public/ICO_Add-1.svg"
import Dashboardtab from "../Common/HorizondalTab/Dashboardtab";

import type { ResidentialProperty } from "../AdminResidencial/AdminResidencial.model";

function Home({properties}) {
  const [residencial, setResidencial]= useState <ResidentialProperty[]> ([])
  console.log("residencial", residencial);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
              onClick={() => alert("Data saved!")}
              variant="primary"
              image={iconAdd}
              iconPosition="left"
              label={"Add New Post"}
              className="genericNewPostStyles"
            />
          </div>
        </div>
      </div>
      <div className="container">
        
        <div className="pending-approve">
          <Dashboardtab data={residencial} properties={properties}  />
        </div>
      </div>
      
    </div>
  );
}

export default Home;
