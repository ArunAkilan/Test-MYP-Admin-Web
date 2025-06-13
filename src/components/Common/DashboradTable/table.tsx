import * as React from "react";
import "./table.scss";
import type { ResidentialProperty } from "../../AdminResidencial/AdminResidencial.model";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import GenericButton from "../Button/button";
import filterTick from "../../../../public/Icon_Tick.svg";
import { Checkbox, FormControlLabel } from "@mui/material";


interface TableProps {
  data: ResidentialProperty[];
  properties: string;
}

function Table({ data, properties }: TableProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!Array.isArray(data)) {
    console.error("Expected 'data' to be an array but got:", data);
    return <p>Error: Invalid data format</p>;
  }
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
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
                  style={{ margin: "20% 8% 0 8%", position:"absolute" }}
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
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  // anchorOrigin={{
                  //   vertical: "bottom",
                  //   horizontal: "left",
                  // }}
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
        <tr>
          <th className="checkbox-align">
            <input type="checkbox" />
          </th>
          <th>Property Name</th>
          <th>Area</th>
          <th>Floors</th>
          <th>Facing</th>
          {properties === "residentials" && <th>Furnish</th>}
          {properties === "commercials" && <th>Washroom</th>}
          <th>Type</th>
          <th className="link-h">Link</th>
        </tr>

        {data.map((item, index) => (
          <>
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
        ))}
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
    </div>
  );
}

export default Table;
