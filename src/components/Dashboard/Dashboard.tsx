import { useEffect, useState } from "react";
import axios from "axios";

import type User from "./Dashboard.model";
import Table from "../Common/DashboradTable/table";
import './Dashboard.scss'

function Home() {
  const [users, setUsers] = useState<User[]>([]); // ✅ Correct
  console.log("user", users);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/todos/1"
        );
        setUsers(response.data);
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

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="home-sec">
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
            <button className="new-post">
              <img src="ICO_Add-1.svg" alt="add svg" />
              Add New Post
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="pending-approve">
          <div className="pending pa-common active">
            <img src="material-symbols_pending-actions-rounded.svg" alt="material img" />
            <a href="#">Pending Requests</a>
          </div>
          <div className="approve pa-common">
            <img src="material-symbols_pending-actions-rounded-w.svg" alt="material white img" />
            <a href="#">Approved Listings</a>
          </div>
        </div>
      </div>

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
                <input type="search" placeholder="Search Listings" />
                <img src="Search-1.svg" alt="search svg" />
              </div>
              <p className="filter-link color-edit">
                <img src="majesticons_filter-line.svg" alt="filter img" />
                <a href="#">Filter</a>
              </p>
              <p className="sort color-edit">
                <img src="material-symbols_sort-rounded.svg" alt="sort img" />
                <a href="#">Sort</a>
              </p>
            </div>
          </div>
        </div>
      </div>
     <Table/>
    </div>
  );
}

export default Home;
