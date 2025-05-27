import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./table.scss";

function Table() {
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
          <th>Furnish</th>
          <th>Type</th>
          <th className="link-h">Link</th>
        </tr>
        <tr>
          <td className="checkbox-align">
            <input type="checkbox" />
          </td>
          <td className="company-name">
            <h3>Perambalur Green Enclave</h3>
            <p
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Thuraiyur road, Perambalur"
            >
              <img src="ICON_Location.svg" alt="location png" />
              Thuraiyur road, Per...
            </p>
          </td>
          <td>1200 sq ft</td>

          <td>2nd</td>
          <td>south</td>
          <td
            className="furnish"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Unfinished"
          >
            Unfurnis...
          </td>
          <td className="type ">
            <div className="rental">rental</div>
          </td>
          <td className="Links">
            <div className="link-wrap">
              <EditIcon className="link-grey-bg link-icon" />
              <DoneIcon className="link-grey-bg link-icon" />
              <CloseIcon className="link-grey-bg link-icon" />
              <DeleteOutlineIcon className="link-orange-bg link-icon" />
            </div>
          </td>
        </tr>
        <tr>
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
              <EditIcon className="link-grey-bg link-icon" />
              <DoneIcon className="link-grey-bg link-icon" />
              <CloseIcon className="link-grey-bg link-icon" />
              <DeleteOutlineIcon className="link-orange-bg link-icon" />
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
              <EditIcon className="link-grey-bg link-icon" />
              <DoneIcon className="link-grey-bg link-icon" />
              <CloseIcon className="link-grey-bg link-icon" />
              <DeleteOutlineIcon className="link-orange-bg link-icon" />
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Table;
