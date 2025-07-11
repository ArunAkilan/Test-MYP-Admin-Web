import "./table.scss";
import type { ResidentialProperty} from "../../AdminResidencial/AdminResidencial.model";
import type { PropertyDataResponse } from "./table.model";

import { Box, Typography, Modal, Popover, Button, Backdrop, CircularProgress } from "@mui/material";
import React,{ useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tickIcon from "../../../assets/table/Icon_Tick.svg";
import denyIcon from "../../../assets/table/Icon_Deny.svg";
import { useLocation, useNavigate } from "react-router-dom";
import type { CommercialProperty, PlotProperty } from "./table.model";


interface TableProps {
  //data: ResidentialProperty[];
  data: PropertyDataResponse | ResidentialProperty[];
  properties?: | "all" | "residential" | "residentials" | "commercial" | "commercials" | "plot" | "plots" | undefined;
  onScrollChange: (scrollTop: number) => void;
  handleOpenModal: (action: "Approve" | "Deny" | "Delete", item: ResidentialProperty) => void;
}

export  interface Property {
  _id: string; // use string for MongoDB IDs
  name: string;
  address: string;
  size: string;
  floor: string;
  facing: string;
  furnishing: string;
  type: string;
  washroom: string;
}


const modalStyle = {
  position: "absolute" as const, top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", border: "2px solid #000", boxShadow: 24, p: 4,};

function Table({ data, properties, onScrollChange }: TableProps) {

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isBackdropLoading, setIsBackdropLoading] = useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const propertyData = location.state?.data;
  console.log("propertyData", propertyData);

  const getSingularProperty = () => {
    switch (properties) {
      case "residentials":
        return "residential";
      case "commercials":
        return "commercial";
      case "plots":
        return "plot";
      default:
        return "residential";
    }
  };
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
      console.log("editid", response?.data?._id);
    } catch {
      console.error("Failed to update status");
    }
  };

const formatedData = Array.isArray(data)
  ? data.map((item: ResidentialProperty) => ({
      ...item,
      _source:
        properties === "residentials"
          ? "residential"
          : properties === "commercials"
          ? "commercial"
          : properties === "plots"
          ? "plots"
          : "unknown",
    }))
  : [...(data?.residentials?.map((item: ResidentialProperty) => ({...item,_source: "residential",})) ?? []),
  ...(data?.commercials?.map((item: CommercialProperty) => ({...item,_source: "commercial",})) ?? []),
  ...(data?.plots?.map((item: PlotProperty) => ({...item, _source: "plots",})) ?? []),
  ...(data?.residential?.map((item: ResidentialProperty) => ({...item, _source: "residential",})) ?? []),
  ...(data?.commercial?.map((item: CommercialProperty) => ({...item, _source: "commercial",})) ?? []),
  ...(data?.plot?.map((item: PlotProperty) => ({...item, _source: "plots",})) ?? []),];
    
  // Modal state
  const [open, setOpen] = React.useState(false);
  const [selectedAction, setSelectedAction] = React.useState<string | null>(null);
  const [selectedItem, setSelectedItem] =React.useState<ResidentialProperty | null>(null);

  const handleEdit = (item: ResidentialProperty) => {
    console.log("Editing item:", item);
    navigate(`/commercial/create`, { state: { data: item, mode: "edit" } });};

  const handleView = (id: string | number) => {
    
  const selectedItem = formatedData.find((item: any) => item._id === id);

  if (!selectedItem) {alert("Property not found");return;}

  const routeBase = selectedItem._source;

  if (!routeBase) {alert("Unknown property type");
    console.log("Missing _source in selectedItem", selectedItem);
    return;}

  console.log("Navigating to:", `/${routeBase}/view/${id}`);
  navigate(`/${routeBase}/view/${id}`, {
    state: { data: selectedItem, mode: "view" },});
  };

  const handleOpenModal = (action: string, item: ResidentialProperty) => {
    console.log(" Opening modal with action:", action, "on item:", item._id);
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
      setIsBackdropLoading(true);
      await handleAction(id, status);
      handleCloseModal();
      window.dispatchEvent(new Event("refreshTableData"));

      //  Success toast message
      const actionText =
        status === 1 ? "Approved" : status === 0 ? "Denied" : "Deleted";
      toast.success(`Listing successfully ${actionText.toLowerCase()}`);
    } catch (e) {
      console.error("Error performing action:", e);
    } finally {
      setIsBackdropLoading(false); // ✅ hide loading
    }
  };

  if (!Array.isArray(data)) {
    const fallback = data?.residential || data?.commercial || data?.plot || data?.data;

    if (Array.isArray(fallback)) {
      data = fallback;
    } else {
      console.error("Expected 'data' to be an array but got:", data);
      return <p>Error: Invalid data format</p>;
    }
  }

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [hideHeader, setHideHeader] = React.useState(false);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  React.useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (container) {
        onScrollChange(container.scrollTop);
      }

      // Show header when scrolling up
      const currentScrollY = container?.scrollTop || 0;
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setHideHeader(false);
      } else {
        setHideHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [onScrollChange]);

  // popover
  const handlePopoverClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (!selectedRows.includes(event.currentTarget.value)) {
      // Only open popover if new selection is made
      setPopoverAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {setPopoverAnchorEl(null);};

  const isPopoverOpen = Boolean(popoverAnchorEl);
  const popoverId = isPopoverOpen ? "simple-popover" : undefined;

  // handleBulkAction on popover
  const handleBulkAction = async (action: string) => {
    const statusMap: Record<string, number> = {Approve: 1,Deny: 0,Delete: 2,};

    const statusCode = statusMap[action];

    try {
      for (const id of selectedRows) {
        await handleAction(id, statusCode); // Your API call
      }

      setSelectedRows([]); // Clear selection
      handlePopoverClose(); // Close popover
      window.dispatchEvent(new Event("refreshTableData")); // Refresh table
    } catch {
      console.error(`Failed to ${action.toLowerCase()} selected properties`);
    }
  };

  useEffect(() => {
    if (selectedRows.length === 0) {handlePopoverClose();
    }}, [selectedRows]);

  return (
    <>
      <div
        ref={containerRef}
        style={{height: hideHeader ? "450px" : "315px",overflowY: "auto",marginBottom: "50px",}}
      >
        <div className="container table-responsive">
          <table>
            <thead>
              <tr>
                <th className="checkbox-align chechbox-cmn">
                  <input
                    type="checkbox"
                    checked={
                      formatedData.length > 0 &&
                      selectedRows.length === formatedData.length
                    }
                    onClick={handlePopoverClick}
                    onChange={(e) => {
                      if (e.target.checked) {
                        const allIds = formatedData.map((item) => item._id);
                        setSelectedRows(allIds);
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                  />
                </th>
                <th>
                  <div className="th-content">
                    Listing Name
                    <img src="../src/assets/table/arrow-up.svg" alt="arrow" />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    Area
                    <img src="../src/assets/table/arrow-up.svg" alt="arrow" />
                  </div>
                </th>
                <th>
                  <div className="th-content">
                    Status
                    <img src="../src/assets/table/arrow-up.svg" alt="arrow" />
                  </div>
                </th>
                {properties === "all" && (
                  <th>
                    <div className="th-content">
                      Floors
                      <img src="../src/assets/table/arrow-up.svg" alt="arrow" />
                    </div>
                  </th>
                )}
                {properties === "residentials" && (
                  <th>
                    <div className="th-content">
                      Floors
                      <img src="../src/assets/table/arrow-up.svg" alt="arrow" />
                    </div>
                  </th>
                )}
                {properties === "commercials" && (
                  <th>
                    <div className="th-content">
                      Floors
                      <img src="../src/assets/table/arrow-up.svg" alt="arrow" />
                    </div>
                  </th>
                )}
                {properties === "all" && (
                  <th>
                    <div className="th-content">
                      Facing
                      <img src="../src/assets/table/arrow-up.svg" alt="arrow" />
                    </div>
                  </th>
                )}
                {properties === "residentials" && (
                  <th>
                    <div className="th-content">
                      Facing
                      <img src="../src/assets/table/arrow-up.svg" alt="arrow" />
                    </div>
                  </th>
                )}
                {properties === "commercials" && (
                  <th>
                    <div className="th-content">
                      Facing
                      <img src="../src/assets/table/arrow-up.svg" alt="arrow" />
                    </div>
                  </th>
                )}

                {properties === "all" && (
                  <th>
                    <div className="th-content">
                      Furnish
                      <img src="../src/assets/table/arrow-up.svg" alt="arrow" />
                    </div>
                  </th>
                )}
                {properties === "residentials" && (
                  <th>
                    <div className="th-content">
                      Furnish
                      <img src="../src/assets/table/arrow-up.svg" alt="arrow" />
                    </div>
                  </th>
                )}
                {properties === "all" && (
                  <th>
                    <div className="th-content">
                      Wahroom
                      <img src="../src/assets/table/arrow-up.svg" alt="arrow" />
                    </div>
                  </th>
                )}
                {properties === "commercials" && (
                  <th>
                    <div className="th-content">
                      Wahroom
                      <img src="../src/assets/table/arrow-up.svg" alt="arrow" />
                    </div>
                  </th>
                )}
                {properties === "all" && (
                  <th>
                    <div className="th-content">
                      Plot Type
                      <img src="../src/assets/table/arrow-up.svg" alt="arrow" />
                    </div>
                  </th>
                )}
                {properties === "plots" && (
                  <th>
                    <div className="th-content">
                      Plot Type
                      <img src="../src/assets/table/arrow-up.svg" alt="arrow" />
                    </div>
                  </th>
                )}
                <th>
                  <div className="th-content">
                    Type
                    <img src="../src/assets/table/arrow-up.svg" alt="arrow" />
                  </div>
                </th>
                <th className="link-h">
                  Link &nbsp;{" "}
                  <img src="../src/assets/table/arrow-up.svg" alt="arrow" />
                </th>
              </tr>
            </thead>
            <tbody>
              {formatedData.map((item, index) => (
                <tr key={index}>
                  <td className="checkbox-align chechbox-align-inside">
                    <input
                      type="checkbox"
                      aria-describedby={popoverId}
                      onClick={handlePopoverClick}
                      checked={selectedRows.includes(item._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows((prev) => [...prev, item._id]);
                        } else {
                          setSelectedRows((prev) =>
                            prev.filter((id) => id !== item._id)
                          );
                        }
                      }}
                    />
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
                    properties === "residentials") && (
                    <td>{item?.totalFloors}</td>
                  )}
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
                    <td className="washroom">{item?.washroom}</td>
                  )}
                  {(properties === "plots" || properties === "all") && (
                    <td className="plot-type">{item?.plotType}</td>
                  )}
                  <td className="type ">
                    <div className="rental">{item?.propertyType}</div>
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
            <Popover
              className="checkbox-popover"
              id={popoverId}
              open={Boolean(popoverAnchorEl) && selectedRows.length > 0}
              onClose={handlePopoverClose}
              anchorReference="anchorPosition"
              anchorPosition={{ top: 800, left: window.innerWidth - 725 }} // adjust position here
              PaperProps={{
                style: { pointerEvents: "auto", zIndex: 1400 }, // ensure above table
              }}
            >
              <div className="checkbox-popover-content">
                <p className="property-select">
                  {selectedRows.length} Property selected
                </p>
                <div className="pop-content-divider"></div>
                <p
                  className="property-approve"
                  onClick={() => handleBulkAction("Approve")}
                >
                  <img src={tickIcon} alt="Icon_Tick" />
                  Approve
                </p>
                <div className="pop-content-divider"></div>
                <p
                  className="property-deny"
                  onClick={() => handleBulkAction("Deny")}
                >
                  <img src={denyIcon} alt="Icon_Tick" /> Deny
                </p>
                <div className="pop-content-divider"></div>
                <p
                  className="property-delete"
                  onClick={() => handleBulkAction("Delete")}
                >
                  Delete
                </p>
              </div>
            </Popover>
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
              <Typography
                id="confirmation-modal-title"
                variant="h6"
                component="h2"
              >
                Confirm {selectedAction}
              </Typography>
              <Typography
                id="confirmation-modal-description"
                sx={{ mt: 2, mb: 3 }}
              >
                Are you sure you want to {selectedAction?.toLowerCase()} the
                listing <strong>{selectedItem?.location?.address}</strong>?
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (!selectedItem?._id || !selectedAction) return;

                  const statusMap: Record<string, number> = {
                    Approve: 1,
                    Deny: 0,
                    Delete: 2,
                  };

                  const statusCode = statusMap[selectedAction];
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
      </div>
      {/* Backdrop while submitting */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isBackdropLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default Table;
