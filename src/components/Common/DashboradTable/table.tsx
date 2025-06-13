import "./table.scss";
import type { ResidentialProperty } from "../../AdminResidencial/AdminResidencial.model";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Modal, Button } from "@mui/material";
import * as React from "react";
import "./table.scss";

interface TableProps {
  data: ResidentialProperty[];
  properties: "residentials" | "commercials";
  washroom?: number | string;
}

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
  const navigate = useNavigate();

  // Modal state
  const [open, setOpen] = React.useState(false);
  const [selectedAction, setSelectedAction] = React.useState<string | null>(null);
  const [selectedItem, setSelectedItem] = React.useState<ResidentialProperty | null>(null);

  const handleEdit = (item: ResidentialProperty) => {
    navigate("/createResidential", { state: { data: item, mode: "edit" } });
  };

  const handleView = (id: string | number) => {
    const selectedItem = data.find(item => item.id === id);
  
    if (selectedItem) {
      navigate("/view-residential", { state: { data: selectedItem, mode: "view" } });
    } else {
      alert("Property not found");
    }
  };
  

  const handleOpenModal = (action: string, item: ResidentialProperty) => {
    setSelectedAction(action);
    setSelectedItem(item);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedAction(null);
    setSelectedItem(null);
  };

  const handleConfirmAction = () => {
    // Here you can handle the logic for Approve, Deny, or Delete
    alert(`Action: ${selectedAction} confirmed for ${selectedItem?.location?.address || "unknown item"}`);

    // Close modal after action
    handleCloseModal();
  };

  if (!Array.isArray(data)) {
    console.error("Expected 'data' to be an array but got:", data);
    return <p>Error: Invalid data format</p>;
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
            <th>Floors</th>
            <th>Facing</th>
            {properties === "residentials" && <th>Furnish</th>}
            {properties === "commercials" && <th>Washroom</th>}
            <th>Type</th>
            <th className="link-h">Link</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="checkbox-align">
                <input type="checkbox" />
              </td>
              <td className="company-name">
                <h3>
                  {item?.location?.address}
                  {item?.location?.landmark}
                </h3>
                <p
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Thuraiyur road, Perambalur"
                >
                  <img src="ICON_Location.svg" alt="location png" />
                  Thuraiyur road, Per...
                </p>
              </td>
              <td>{item?.area?.totalArea}</td>
              <td>{item?.totalFloors}</td>
              <td>{item?.facingDirection}</td>
              {properties === "residentials" && (
                <td
                  className="furnish"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Unfurnished"
                >
                  {item?.furnishingType}
                </td>
              )}
              {properties === "commercials" && (
                <td
                  className="furnish"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Unfurnished"
                >
                  {item?.washroom}
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
                    onClick={() => handleView(item.id)}
                    style={{ cursor: "pointer" }}
                  />

                  <img
                    src="Edit.svg"
                    alt="edit"
                    onClick={() => handleEdit(item)}
                    style={{ cursor: "pointer" }}
                  />

                  <img
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
            onClick={handleConfirmAction}
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
