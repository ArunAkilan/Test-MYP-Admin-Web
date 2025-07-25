import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProfiles, deleteProfile } from "../Services/profileService";
import "./ProfileDashboard.scss";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import ConfirmDialog from "../../Common/popup/popup";
import { Backdrop, CircularProgress } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import { Skeleton } from "@mui/material";

function AdminAllProfile() {
  const [profiles, setProfiles] = useState<any>([]);
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [sloading, setsLoading] = useState(true);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    setsLoading(true);
    const data = await getAllProfiles();
    setProfiles(data.data);
    setsLoading(false);
  };

  const openDeleteDialog = (id: string) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedId) {
      setLoading(true); // show loader
      const getToken = localStorage.getItem("token");

      try {
        await deleteProfile(selectedId, getToken);
        loadProfiles();
        setSnackbarOpen(true); // show toast
        setConfirmOpen(false);
        setSelectedId(null);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {sloading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <tr key={index}>
            <td>
              <Skeleton variant="text" width={120} />
            </td>
            <td>
              <Skeleton variant="text" width={100} />
            </td>
            <td>
              <Skeleton variant="rectangular" width={80} height={30} />
            </td>
            <td>
              <Skeleton variant="rectangular" width={150} height={36} />
            </td>
          </tr>
        ))
      ) : (
        <div className="dashboard">
          <div className="profile-title">
            <h2 className="page-title">
              <PersonIcon style={{ color: "#4CAF50", fontSize: "28px" }} />
              &nbsp; Profiles
            </h2>
            <button
              onClick={() => navigate("/allprofile/create")}
              className="create-btn"
            >
              <AddIcon style={{ fontSize: "14px" }} /> Create New
            </button>
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
              {profiles &&
                profiles.map((p: any) => (
                  <tr key={p._id}>
                    <td>
                      {p.profileInformation.firstName}{" "}
                      {p.profileInformation.lastName}
                    </td>
                    <td>{p.contactInformation.primaryPhone}</td>
                    <td className={`role-tag ${p.role.toLowerCase()}`}>
                      {" "}
                      <span>{p.role}</span>{" "}
                    </td>
                    <td className="style-action">
                      <button
                        className="view-btn"
                        onClick={() => navigate(`/allprofile/view/${p._id}`)}
                      >
                        View
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => navigate(`/allprofile/edit/${p._id}`)}
                      >
                        Edit
                      </button>
                      <div className="delete-confirmation">
                        <button
                          className="delete-btn"
                          onClick={() => openDeleteDialog(p._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ConfirmDialog
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={confirmDelete}
            title="Confirm Deletion"
            message="Are you sure you want to delete this profile? This action cannot be undone."
          />
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => setSnackbarOpen(false)}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Profile deleted successfully!
            </Alert>
          </Snackbar>
        </div>
      )}
    </div>
  );
}

export default AdminAllProfile;
