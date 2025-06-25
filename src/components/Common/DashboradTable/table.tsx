import "./table.scss";
import type { ResidentialProperty } from "../../AdminResidencial/AdminResidencial.model";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Modal } from "@mui/material";
import * as React from "react";
import "./table.scss";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import axios from "axios";
interface TableProps {
  //data: ResidentialProperty[];
  data: any;
  properties?:
    | "all"
    | "residential"
    | "residentials"
    | "commercial"
    | "commercials"
    | "plot"
    | "plots"
    | undefined;
}
// const actionMap: Record<string, number> = {
//   Approve: 0,
//   Deny: 1,
//   Delete: 2,
// };

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Table({ data, properties }: TableProps) {
  console.log("Table received data:", data);
  console.log("properties", properties);
  const navigate = useNavigate();


  const location = useLocation();
  const propertyData = location.state?.data ;
  console.log("propertyData", propertyData)


  const getSingularProperty = () => {
    switch (properties) {
      case "residentials":
        return "residential";
      case "commercials":
        return "commercial";
      case "plots":
        return "plot"; // 👈 only if backend supports this
      default:
        return "residential"; // fallback to avoid calling wrong endpoint
    }
  };

  // const updateStatus = async (id: string, status: number) => {
  //   const singularProperty = getSingularProperty();

  //   try {
  //     const response = await axios.put(
  //       `${
  //         import.meta.env.VITE_BackEndUrl
  //       }/api/adminpermission/${singularProperty}/${id}`,
  //       {
  //         status: `${status}`,
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error("API Error:", error);
  //     throw error;
  //   }
  // };

  const handleAction = async (id: string, status: number) => {
    const singularProperty = getSingularProperty();
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_BackEndUrl
        }/api/adminpermission/${singularProperty}/${id}`,
        { status: `${status}` }
      );
      console.log("Status updated:", response.data);
    } catch (err) {
      console.error("Failed to update status");
    }
  };

  const formatedData = Array.isArray(data)
    ? data // already flat array
    : [
        ...(data?.residentials ?? []),
        ...(data?.commercials ?? []),
        ...(data?.plots ?? []),
        ...(data?.residential ?? []),
        ...(data?.commercial ?? []),
        ...(data?.plot ?? []),
      ];

  console.log("formatedData", formatedData);

  // Modal state
  const [open, setOpen] = React.useState(false);
  const [selectedAction, setSelectedAction] = React.useState<string | null>(
    null
  );
  const [selectedItem, setSelectedItem] =
    React.useState<ResidentialProperty | null>(null);

  const handleEdit = (item: ResidentialProperty) => {
    navigate("/createResidential", { state: { data: item, mode: "edit" } });
  };

  const handleView = (id: string | number) => {
    const selectedItem = data.find((item: any) => item._id === id);

    if (selectedItem) {
      navigate("/plots/view-residential", {
        state: { data: selectedItem, mode: "view" },
      });
    } else {
      alert("Property not found");
    }
  };

  const handleOpenModal = (action: string, item: ResidentialProperty) => {
    console.log("🟡 Opening modal with action:", action, "on item:", item._id);
    setSelectedAction(action);
    setSelectedItem(item);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedAction(null);
    setSelectedItem(null);
  };

  const handleConfirmAction = async (id: string, status: number) => {
  try {
    await handleAction(id, status); // this will call the API

    handleCloseModal(); // close modal
    window.dispatchEvent(new Event("refreshTableData")); // refresh
  } catch (e) {
    console.error("Error performing action:", e);
  }
};

  if (!Array.isArray(data)) {
    const fallback =
      data?.residential || data?.commercial || data?.plot || data?.data;

    if (Array.isArray(fallback)) {
      data = fallback;
    } else {
      console.error("Expected 'data' to be an array but got:", data);
      return <p>Error: Invalid data format</p>;
    }
  }

  return (
    <div className="container table-responsive">
      <table>
        <thead>
          <tr>
            <th className="checkbox-align">
              <input type="checkbox" />
            </th>
            <th>Listing Name</th>
            <th>Area</th>
            <th>status</th>
            {properties === "all" && <th>Floors</th>}
            {properties === "residentials" && <th>Floors</th>}
            {properties === "commercials" && <th>Floors</th>}
            {properties === "all" && <th>Facing</th>}
            {properties === "residentials" && <th>Facing</th>}
            {properties === "commercials" && <th>Facing</th>}

            {properties === "all" && <th>Furnish</th>}
            {properties === "residentials" && <th>Furnish</th>}
            {properties === "all" && <th>Washroom</th>}
            {properties === "commercials" && <th>Washroom</th>}
            {properties === "all" && <th>Plot Type</th>}
            {properties === "plots" && <th>Plot Type</th>}
            <th>Type</th>
            <th className="link-h">Link</th>
          </tr>
        </thead>
        <tbody>

          
          {formatedData.map((item, index) => (
            <tr key={index}>
              <td className="checkbox-align">
                <input type="checkbox" />
              </td>
              <td className="company-name">
                <h3>
                  <span className="truncate-text">
                    {(() => {
                      const landmark = item?.location?.landmark;
                      if (!landmark) return null;

                      const words = landmark.trim().split(/\s+/);
                      return words.length > 12
                        ? words.slice(0, 12).join(" ") + "..."
                        : landmark;
                    })()}
                  </span>
                </h3>
                <p
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title={item?.location?.address}
                >
                  <img src="ICON_Location.svg" alt="location png" />

                  <span className="truncate-text">
                    {(() => {
                      const address = item?.location?.address;
                      if (!address) return null;

                      const words = address.trim().split(/\s+/);
                      return words.length > 9
                        ? words.slice(0, 9).join(" ") + "..."
                        : address;
                    })()}
                  </span>
                </p>
              </td>
              <td>{item?.area?.totalArea}</td>
              <td>{item.status}</td>
              {(properties === "commercials" ||
                properties === "all" ||
                properties === "residentials") && <td>{item?.totalFloors}</td>}
              {(properties === "commercials" ||
                properties === "all" ||
                properties === "residentials") && (
                <td>{item?.facingDirection}</td>
              )}

              {(properties === "residentials" || properties === "all") && (
                <td
                  className="furnish"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title={item?.furnishingType}
                >
                  {}
                  <span className="truncate-text">
                    {(() => {
                      const furnishing = item?.furnishingType;
                      if (!furnishing) return null;

                      const words = furnishing.trim().split(/\s+/);
                      return words.length > 12
                        ? words.slice(0, 12).join(" ") + "..."
                        : furnishing;
                    })()}
                  </span>
                </td>
              )}
              {(properties === "commercials" || properties === "all") && (
                <td
                  className="furnish"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Unfurnished"
                >
                  {item?.washroom}
                </td>
              )}
              {(properties === "plots" || properties === "all") && (
                <td
                  className="furnish"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Unfurnished"
                >
                  {item?.plotType}
                </td>
              )}
              <td className="type ">
                <div className="rental">{item?.propertyType || "-"}</div>
              </td>
              <td className="Links">
                <div className="link-wrap">
                  <img
                    src="/src/assets/tabelimg/Eye view.svg"
                    alt="view"
                    onClick={() => item._id && handleView(item._id)}
                    style={{ cursor: "pointer" }}
                  />

                  <img
                    src="Edit.svg"
                    alt="edit"
                    onClick={() => handleEdit(item)}
                    style={{ cursor: "pointer" }}
                  />

                  {/* <img
                    src="Approve.svg"
                    alt="Approve svg"
                    onClick={() => handleOpenModal("Approve", item)}
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    src="Deny.svg"
                    alt="Deny svg"
                    onClick={() => handleOpenModal("Deny", item)}
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    src="Delete.svg"
                    alt="Delete img"
                    onClick={() => handleOpenModal("Delete", item)}
                    style={{ cursor: "pointer" }}
                  /> */}
                  <img
                    src="Approve.svg"
                    alt="Approve svg"
                    // onClick={() => item._id && handleAction(item._id,0)}
                    onClick={() => handleOpenModal("Approve", item)}
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    src="Deny.svg"
                    alt="Deny svg"
                    // onClick={() => item._id && handleAction(item._id, 1)}
                    onClick={() => handleOpenModal("Deny", item)}
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    src="Delete.svg"
                    alt="Delete img"
                    // onClick={() => item._id && handleAction(item._id, 2)}
                    onClick={() => handleOpenModal("Delete", item)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="confirmation-modal-title"
        aria-describedby="confirmation-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="text-align-center">
            <img src="/src/assets/Dashboard modal img/Confirm.svg" alt="" />
          </div>
          <Typography id="confirmation-modal-title" variant="h6" component="h2">
            Confirm {selectedAction}
          </Typography>
          <Typography id="confirmation-modal-description" sx={{ mt: 2, mb: 3 }}>
            Are you sure you want to {selectedAction?.toLowerCase()} the listing{" "}
            <strong>{selectedItem?.location?.address}</strong>?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (!selectedItem?._id || !selectedAction) return;

              const statusMap: Record<string, number> = {
                Approve: 0,
                Deny: 1,
                Delete: 2,
              };

              const statusCode = statusMap[selectedAction];
              console.log("✅ Confirm Clicked:", selectedAction, "Status Code:", statusCode);
              handleConfirmAction(selectedItem._id, statusCode);
            }}
            sx={{ mr: 1 }}
          >
            Confirm
          </Button>
          <Button variant="outlined" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Table;
