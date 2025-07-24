import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProfiles, deleteProfile } from "../Services/profileService";
import "./ProfileDashboard.scss";

function ProfileDashboard() {
  const [profiles, setProfiles] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    const data = await getAllProfiles();
    console.log("data", data.data)
    setProfiles(data.data);
  };

  const handleDelete = async (id: string) => {
    const getToken = localStorage.getItem("token");
    await deleteProfile(id, getToken);
    loadProfiles();
  };

  return (
    <div className="dashboard">
      <h2>Profiles</h2>
      <button onClick={() => navigate("/profile/create")}>+ Create New</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles && profiles.map((p:any) => (
            <tr key={p._id}>
              <td>
                {p.profileInformation.firstName} {p.profileInformation.lastName}
              </td>
              <td>{p.contactInformation.primaryPhone}</td>
              <td>{p.role}</td>
              <td>
                <button onClick={() => navigate(`/profile/view/${p._id}`)}>View</button>
                <button onClick={() => navigate(`/profile/edit/${p._id}`)}>Edit</button>
                <button onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProfileDashboard;
