import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Profile } from "./ProfileDashboard/ProfileDashboard.model";
import { getProfileById, updateProfile } from "./Services/profileService";
import "./Services/service.scss"

function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Profile> | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const getToken = localStorage.getItem("token");
      const data: any = await getProfileById(id, getToken);
      setForm(data.data);
    };
    fetch();
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    if (form) {
      if (keys.length === 2) {
        setForm((prev) => ({
          ...prev!,
          [keys[0]]: {
            ...(prev![keys[0] as keyof Profile] as any),
            [keys[1]]: value,
          },
        }));
      } else {
        setForm((prev) => ({ ...prev!, [name]: value }));
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const getToken = localStorage.getItem("token");
    await updateProfile(id, form, getToken);
    navigate("/allprofile");
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div className="edit-profile-wrapper">
      <div className="edit-profile-paper">
        <Link to="/allprofile" className="edit-profile-back">
          ← Back
        </Link>
        <h2 className="edit-profile-title">Edit Profile</h2>
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <input
            name="profileInformation.firstName"
            value={form.profileInformation?.firstName || ""}
            onChange={handleChange}
          />
          <input
            name="profileInformation.lastName"
            value={form.profileInformation?.lastName || ""}
            onChange={handleChange}
          />
          <input
            name="profileInformation.gender"
            value={form.profileInformation?.gender || ""}
            onChange={handleChange}
          />
          <input
            name="contactInformation.email"
            value={form.contactInformation?.email || ""}
            onChange={handleChange}
          />
          <input
            name="contactInformation.primaryPhone"
            value={form.contactInformation?.primaryPhone || ""}
            onChange={handleChange}
            disabled={form.role === "SuperAdmin"} 
          />
          
          <select name="role" onChange={handleChange} value={form.role} disabled={form.role === "SuperAdmin"} >
            <option value="Admin">Admin</option>
            <option value="Marketing">Marketing</option>
            <option value="User">User</option>
           <option value="SuperAdmin">Super Admin</option>
          </select>
          
<input
  type="text"
  value="Password"
  disabled
/>


          <input
            name="description"
            value={form.description || ""}
            onChange={handleChange}
          />
          <button type="submit" className="edit-profile-button">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
