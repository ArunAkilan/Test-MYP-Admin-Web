import "./table.scss";
import type { ResidentialProperty } from "../../AdminResidencial/AdminResidencial.model";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Modal } from "@mui/material";
import * as React from "react";
import "./table.scss";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import GenericButton from "../Button/button";
import filterTick from "../../../../public/Icon_Tick.svg";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
interface TableProps {
  //data: ResidentialProperty[];
  data: any;
  properties?: "residentials" | "commercials" | "plots";
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
      navigate("/view-residential", {
        state: { data: selectedItem, mode: "view" },
      });
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
    alert(
      `Action: ${selectedAction} confirmed for ${
        selectedItem?.location?.address || "unknown item"
      }`
    );

    // Close modal after action
    handleCloseModal();
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterOpen = Boolean(anchorEl); // ✅ Define open
  const id = filterOpen ? "simple-popover" : undefined;

  if (!Array.isArray(data)) {
    console.error("Expected 'data' to be an array but got:", data);
    return <p>Error: Invalid data format</p>;
  }

  return (
    <div className="container table-responsive">
      <div className="new-listing-wrap">
        <div className="container">
          <div className="new-listing">
            <div className="new-listing-wrap-list">
              <h3 className="fresh-list">36 Fresh Properties</h3>
              <img src="Ellipse 24.svg" alt="dot svg" />
              <h3 className="pending-list">136 Pending Request</h3>
            </div>
            <div className="list-panel">
              <div className="search">
                <input type="search" placeholder="Search Properties" />
                <img src="Search-1.svg" alt="search svg" />
              </div>
              <div className="filter-link color-edit">
                <Button
                  className="filter-text"
                  aria-describedby={id}
                  onClick={handleClick}
                >
                  <img src="majesticons_filter-line.svg" alt="filter img" />
                  Filter
                </Button>
                <Popover
                  style={{ margin: "20% 8% 0 8%", position: "absolute" }}
                  anchorReference="anchorPosition"
                  anchorPosition={{
                    top: 144,
                    left: 260,
                  }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  id={id}
                  open={filterOpen}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                >
                  <div className="filter-div-wrapper">
                    <div className="filter-header">
                      <p>Filter By</p>
                      <div className="apply-reset-btn">
                        <button className="refresh-btn">
                          <img src="mynaui_refresh.svg" alt="refresh icon" />
                          Reset
                        </button>
                        <GenericButton
                          image={filterTick}
                          iconPosition="left"
                          label={"Apply"}
                          className="genericFilterApplyStyles"
                        />
                      </div>
                    </div>
                    <div className="checklist-content checklist-content-1 row">
                      <div className="checklist-list col-md-3 col-sm-6">
                        <h4>Property Type</h4>
                        <div className="label-wrapper">
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Rent"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Lease"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Sale"
                          />
                        </div>
                      </div>
                      <div className="checklist-list col-md-3 col-sm-6">
                        <h4>Commercial Type</h4>
                        <div className="label-wrapper">
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Building"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Co-Working"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Office Space"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Shop"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Showroom"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Shed"
                          />
                        </div>
                      </div>
                      <div className="checklist-list col-md-3 col-sm-6 ">
                        <h4>Facing</h4>
                        <div className="label-wrapper">
                          <FormControlLabel
                            control={<Checkbox />}
                            label="East"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="West"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="North"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="South"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="North west"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="North East"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="South west"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="South East"
                          />
                        </div>
                      </div>
                      <div className="checklist-list col-md-3 col-sm-6">
                        <h4>Locality</h4>
                        <div className="label-wrapper">
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Old Bus Stand"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Thuraimangalam"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="NH-45 Bypass"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Collector Office Road"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Elambalur"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Sungu Pettai"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="V.Kalathur"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="checklist-content checklist-content-1 row">
                      <div className="checklist-list col-md-3 col-sm-6">
                        <h4>RTO</h4>
                        <div className="label-wrapper">
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Yes"
                          />
                          <FormControlLabel control={<Checkbox />} label="No" />
                        </div>
                      </div>
                      <div className="checklist-list col-md-3 col-sm-6">
                        <h4>Parking</h4>
                        <div className="label-wrapper">
                          <FormControlLabel
                            control={<Checkbox />}
                            label="None"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="With Parking"
                          />
                        </div>
                      </div>
                      <div className="checklist-list col-md-3 col-sm-6 ">
                        <h4>Washroom</h4>
                        <div className="label-wrapper">
                          <FormControlLabel
                            control={<Checkbox />}
                            label="None"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Private"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Common"
                          />
                        </div>
                      </div>
                      <div className="checklist-list col-md-3 col-sm-6">
                        <h4>Accessablity</h4>
                        <div className="label-wrapper">
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Ramp Access"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Lift Access"
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Stairs Access"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                    onClick={() => item._id && handleView(item._id)}
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
