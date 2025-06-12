import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./table.scss";
import type Property from "./table.model";

const style = {
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

interface TableProps {
  properties: Property[];
}

const Table: React.FC<TableProps> = ({ properties }) => {
  const [open, setOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const handleOpen = (propertyName: string) => {
    setSelectedProperty(propertyName);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProperty(null);
  };

  return (
    <div className="container table-responsive">
      <table>
        <thead>
          <tr>
            <th className="checkbox-align"><input type="checkbox" /></th>
            <th>Listing Name</th>
            <th>Area</th>
            <th>Floors</th>
            <th>Facing</th>
            <th>Furnish</th>
            <th>Type</th>
            <th className="link-h">Link</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property, index) => (
            <tr key={index}>
              <td className="checkbox-align"><input type="checkbox" /></td>
              <td className="company-name">
                <h3>{property.name}</h3>
                <p title={property.address}>
                  <img src="ICON_Location.svg" alt="location" />
                  {property.address.length > 20
                    ? `${property.address.slice(0, 20)}...`
                    : property.address}
                </p>
              </td>
              <td>{property.size}</td>
              <td>{property.floor}</td>
              <td>{property.facing}</td>
              <td title={property.furnishing}>
                {property.furnishing.slice(0, 8)}...
              </td>
              <td className="type">
                <div className={property.type}>rental</div>
              </td>
              <td className="Links">
                <div className="link-wrap">
                  <img src="eye-icon.svg" alt="eye-icon" />
                  <img src="Edit.svg" alt="Edit" />
                  <Button onClick={() => handleOpen(property.name)}>
                    <img src="Approve.svg" alt="Approve" />
                  </Button>
                  <img src="Deny.svg" alt="Deny" />
                  <img src="Delete.svg" alt="Delete" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="confirm-approve-title"
        aria-describedby="confirm-approve-description"
      >
        <Box sx={style}>
          <div className="img-popover">
            <img src="weui_location-outlined.svg" alt="modal-icon" />
          </div>
          <Typography id="confirm-approve-title" variant="h6" component="h2">
            Are you sure?
          </Typography>
          <Typography id="confirm-approve-description" sx={{ mt: 2 }}>
            Do you want to approve the “{selectedProperty}”?
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Table;
