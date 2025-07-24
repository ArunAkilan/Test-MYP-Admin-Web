import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProfiles, deleteProfile } from "../Services/profileService";
import "./ProfileDashboard.scss";
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';

function AdminAllProfile() {
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
      <div className="profile-title">
        <h2 className="page-title">< PersonIcon style={{ color: "#4CAF50",fontSize: "28px" }} />&nbsp; Profiles</h2>
        <button onClick={() => navigate("/allprofile/create")} className="create-btn"><AddIcon style={{ fontSize: "14px" }} /> Create New</button>
      </div>
      
      <table className="profile-table">
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
              <td className={`role-tag ${p.role.toLowerCase()}`}> <span>{p.role}</span> </td>
              <td>
                <button className="view-btn" onClick={() => navigate(`/allprofile/view/${p._id}`)}>View</button>
                <button className="edit-btn" onClick={() => navigate(`/allprofile/edit/${p._id}`)}>Edit</button>
                <button className="delete-btn" disabled onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminAllProfile;
