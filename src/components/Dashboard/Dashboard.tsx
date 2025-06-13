import { useEffect, useState } from "react";
import axios from "axios";

// import type User from "./Dashboard.model";
import Table from "../Common/DashboradTable/table";
import "./Dashboard.scss";
import GenericButton from "../Common/Button/button";
import iconAdd from "../../../public/ICO_Add-1.svg"
import Dashboardtab from "../Common/HorizondalTab/Dashboardtab";

import type { ResidentialProperty } from "../AdminResidencial/AdminResidencial.model";

function Home({properties}) {
  // const [users, setUsers] = useState<User[]>([]);
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
        console.log(users)
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

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get<User[]>(
  //         "https://jsonplaceholder.typicode.com/todos/1"
  //       );
  //       setUsers(response.data);
  //       setLoading(false);
  //     } catch (err) {
  //       if (axios.isAxiosError(err) && err.message) {
  //         setError(err.message);
  //       } else {
  //         setError("An unexpected error occurred");
  //       }
  //       setLoading(false);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  

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
          <Dashboardtab />
        </div>
      </div>

      
      {/* <Table  /> */}
      <div className="new-listing-wrap">
        <div className="container">
          <div className="new-listing">
            <div className="new-listing-wrap-list">
              <h3 className="fresh-list">36 Fresh Listings</h3>
              <img src="Ellipse 24.svg" alt="dot svg" />
              <h3 className="pending-list">136 Pending Request</h3>
            </div>
            <div className="list-panel">
              <div className="search">
                <input type="search" placeholder="Search Property" />
                <img src="Search-1.svg" alt="search svg" />
              </div>
              <p className="filter-link color-edit">
                <img src="majesticons_filter-line.svg" alt="filter img" />
                <span className="filter-text">Filter</span>
              </p>
              <p className="sort color-edit">
                <img src="material-symbols_sort-rounded.svg" alt="sort img" />
                Sort
              </p>
            </div>
          </div>
        </div>
      </div>
      <Table data={residencial} properties={properties} />
    </div>
  );
}

export default Home;
