import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Profile } from "./ProfileDashboard/ProfileDashboard.model";
import { getProfileById } from "./Services/profileService";
import "./Services/service.scss"

function ViewProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const getToken = localStorage.getItem("token");
      const data:any = await getProfileById(id, getToken );
      setProfile(data.data);
    };
    fetch();
  }, [id]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="view-profile-wrapper">
      <div className="profile-container">
          <Link to="/allprofile" className="back-link">Back</Link>
          <div className="card">
        <h2>View Profile</h2>
        <p className="detail">
          <strong>Name:</strong> {profile.profileInformation.firstName}{" "}
          {profile.profileInformation.lastName}
        </p>
        <p className="detail">
          <strong>Gender:</strong> {profile.profileInformation.gender}
        </p>
        <p className="detail">
          <strong>Email:</strong> {profile.contactInformation.email}
        </p>
        <p className="detail">
          <strong>Phone:</strong> {profile.contactInformation.primaryPhone}
        </p>
        <p className="detail">
          <strong>Role:</strong> {profile.role}
        </p>
        <p className="detail">
          <strong>Description:</strong> {profile.description}
        </p>
        <p className="detail">
          <strong>Location:</strong> Lat {profile.location.map.latitude}, Long{" "}
          {profile.location.map.longitude}
        </p>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
