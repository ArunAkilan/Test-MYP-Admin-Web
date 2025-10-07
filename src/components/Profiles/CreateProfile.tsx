import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProfile } from "./Services/profileService";
import type { Profile } from "./ProfileDashboard/ProfileDashboard.model";
import "./Services/service.scss"
import { Link } from "react-router-dom";

function CreateProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState<Partial<Profile>>({
    profileInformation: { firstName: "", lastName: "", gender: "Male" },
    contactInformation: { email: "", primaryPhone: "" },
    location: { map: { latitude: 0, longitude: 0 } },
    role: "User",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    // Use discriminated union for top-level keys
    if (keys.length === 2) {
      const [section, field] = keys as [keyof Profile, string];

      setForm((prev) => {
        const sectionValue = prev[section];

        if (typeof sectionValue === "object" && sectionValue !== null) {
          return {
            ...prev,
            [section]: {
              ...sectionValue,
              [field]: value,
            },
          };
        }

        return prev;
      });
    } else {
      const field = name as keyof Profile;
      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createProfile(form);
    navigate("/allprofile");
  };

  return (
  <div className="create-profile-wrapper">
    <div className="create-profile-paper">
      <Link to="/allprofile" className="edit-profile-back">
          ← Back
        </Link>
      <h2 className="create-profile-title">Create Profile</h2>
      <form className="create-profile-form" onSubmit={handleSubmit}>
        <input
          name="profileInformation.firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          name="profileInformation.lastName"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <select
          name="profileInformation.gender"
          onChange={handleChange}
          value={form.profileInformation?.gender || "Male"}
          required
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          name="contactInformation.email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="contactInformation.primaryPhone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />
        <select name="role" onChange={handleChange} value={form.role}>
          <option value="Admin">Admin</option>
          <option value="Marketing">Marketing</option>
          <option value="User">User</option>
          <option value="SuperAdmin">Super Admin</option>
        </select>
        
        <input
  type="password"
  name="password"
  placeholder="Password"
  onChange={handleChange}
/>

        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <button type="submit" className="create-profile-button">
          Create Profile
        </button>
      </form>
    </div>
  </div>
);

}

export default CreateProfile;
