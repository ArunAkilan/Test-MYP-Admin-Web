import * as React from "react";
import "./table.scss";
import type { ResidentialProperty } from "../../AdminResidencial/AdminResidencial.model";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface TableProps {
  data: ResidentialProperty[];
  properties: string;
}

function Table({data,properties}: TableProps) {
  
 
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
                  <h3 className="fresh-list">36 Fresh Listings</h3>
                  <img src="Ellipse 24.svg" alt="dot svg" />
                  <h3 className="pending-list">136 Pending Request</h3>
                </div>
                <div className="list-panel">
                  <div className="search">
                    <input type="search" placeholder="Search Property" />
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
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <Typography sx={{ p: 2 }}>
                        The content of the Popover.
                      </Typography>
                    </Popover>
                  </div>
                  <div className="sort color-edit">
                    <Button
                      className="Sort-text"
                      aria-describedby={id}
                      onClick={handleClick}
                    >
                      <img
                        src="material-symbols_sort-rounded.svg"
                        alt="sort img"
                      />
                      Sort
                    </Button>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <Typography sx={{ p: 2 }}>
                        The content of the Popover.
                      </Typography>
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
               <tr key={index}>
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
    </div>
  );
};

export default Table;
