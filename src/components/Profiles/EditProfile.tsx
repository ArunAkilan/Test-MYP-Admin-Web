import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Profile } from "./ProfileDashboard/ProfileDashboard.model";
import { getProfileById, updateProfile } from "./Services/profileService";
import { Box } from "@mui/material";

function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Profile> | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const getToken = localStorage.getItem("token");
      const data:any = await getProfileById(id, getToken );
      console.log(data, "data.data",data.data)
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
    console.log("getTOken", getToken)
    await updateProfile(id, form, getToken);
    navigate("/profile");
  };

  if (!form) return <div>Loading...</div>;

  return (
    <Box sx={{margin:"80px 0"}}>
     <Link to="/profile">Back</Link>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
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
        />
        <select name="role" onChange={handleChange} value={form.role}>
          <option value="Admin">Admin</option>
          <option value="Marketing">Marketing</option>
          <option value="User">User</option>
        </select>
        <input
          name="description"
          value={form.description || ""}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
    </Box>
  );
}

export default EditProfile;
