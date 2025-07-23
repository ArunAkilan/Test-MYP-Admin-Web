import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Profile } from "./ProfileDashboard/ProfileDashboard.model";
import { getProfileById } from "./Services/profileService";

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
    <div>
        <Link to="/profile">Back</Link>
      <h2>View Profile</h2>
      <p>
        <strong>Name:</strong> {profile.profileInformation.firstName}{" "}
        {profile.profileInformation.lastName}
      </p>
      <p>
        <strong>Gender:</strong> {profile.profileInformation.gender}
      </p>
      <p>
        <strong>Email:</strong> {profile.contactInformation.email}
      </p>
      <p>
        <strong>Phone:</strong> {profile.contactInformation.primaryPhone}
      </p>
      <p>
        <strong>Role:</strong> {profile.role}
      </p>
      <p>
        <strong>Description:</strong> {profile.description}
      </p>
      <p>
        <strong>Location:</strong> Lat {profile.location.map.latitude}, Long{" "}
        {profile.location.map.longitude}
      </p>
    </div>
  );
}

export default ViewProfile;
