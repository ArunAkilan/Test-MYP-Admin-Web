import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./table.scss";
import type { ResidentialProperty } from "../../AdminResidencial/AdminResidencial.model";

interface TableProps {
  data: ResidentialProperty[];
  properties: string;
}

function Table({data,properties}: TableProps) {
  if (!Array.isArray(data)) {
    console.error("Expected 'data' to be an array but got:", data);
    return <p>Error: Invalid data format</p>;
  }
  return (
    <div className="container table-responsive">
      <table>
        <tr>
          <th className="checkbox-align">
            <input type="checkbox" />
          </th>
          <th>Listing Name</th>
          <th>Area</th>
          <th>Floors</th>
          <th>Facing</th>
          {properties === 'residentials' && <th>Furnish</th> }
          {properties === 'commercials' && <th>Washroom</th> }
          <th>Type</th>
          <th className="link-h">Link</th>
        </tr>
        
        {
          data.map((item, index)=>(
            <>
               <tr>
          <td className="checkbox-align">
            <input type="checkbox" />
          </td>
          <td className="company-name">
            <h3>{item?.location?.address}{item?.location?.landmark}</h3>
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
         { properties === 'residentials' && 
          <td
          className="furnish"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Unfurnished"
        >
          {item?.furnishingType}
        </td>}
        { properties === 'commercials' && 
          <td
          className="furnish"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Unfurnished"
        >
          {item?.washroom}
        </td>}
          <td className="type ">
            <div className="rental">{item?.propertyType}</div>
          </td>
          <td className="Links">
            <div className="link-wrap">
              <img src="Edit.svg" alt="Edit svg" />
              <img src="Approve.svg" alt="Approve svg" />
              <img src="Deny.svg" alt="Deny svg" />
              <img src="Delete.svg" alt="Delete img" />
            </div>
          </td>
        </tr>
            </>
          ))
        }
        {/* <tr>
          <td className="checkbox-align">
            <input type="checkbox" />
          </td>
          <td className="company-name">
            <h3>Sakthi Nagar Villa</h3>
            <p
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Sakthi nagar, Perambalur"
            >
              <img src="ICON_Location.svg" alt="location png" />
              Sakthi nagar, Pera...
            </p>
          </td>
          <td>1800 sq ft</td>
          <td>Ground</td>
          <td>East</td>
          <td
            className="furnish"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Semi-furnished"
          >
            Semi-fur...
          </td>
          <td className="type ">
            <div className="lease">Lease</div>
          </td>
          <td className="Links">
            <div className="link-wrap">
              <img src="Edit.svg" alt="Edit svg" />
              <img src="Approve.svg" alt="Approve svg" />
              <img src="Deny.svg" alt="Deny svg" />
              <img src="Delete.svg" alt="Delete img" />
            </div>
          </td>
        </tr>
        <tr>
          <td className="checkbox-align">
            <input type="checkbox" />
          </td>
          <td className="company-name">
            <h3>Muthu residency Flats</h3>
            <p
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Near old bus stand, Perambalur"
            >
              <img src="ICON_Location.svg" alt="location png" />
              Near old Bus Stand,...
            </p>
          </td>
          <td>1100 sq ft</td>
          <td>1st</td>
          <td>East</td>
          <td
            className="furnish"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Fully Furnished"
          >
            Fully Fur...{" "}
          </td>
          <td className="type ">
            <div className="sale">Sale</div>
          </td>
          <td className="Links">
            <div className="link-wrap">
              <img src="Edit.svg" alt="Edit svg" />
              <img src="Approve.svg" alt="Approve svg" />
              <img src="Deny.svg" alt="Deny svg" />
              <img src="Delete.svg" alt="Delete img" />
            </div>
          </td>
        </tr> */}
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
