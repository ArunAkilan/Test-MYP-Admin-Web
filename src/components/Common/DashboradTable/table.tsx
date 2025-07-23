import "./table.scss";
import {
  Box,
  Typography,
  Modal,
  Popover,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tickIcon from "../../../assets/table/Icon_Tick.svg";
import denyIcon from "../../../assets/table/Icon_Deny.svg";
import { useLocation, useNavigate } from "react-router-dom";
// import type { CommercialProperty, PlotProperty} from "./table.model";
import type {
  PropertyDataResponse,
  ResidentialProperty,
  PropertyViewWithSource
} from "./table.model"; 

interface TableProps {
  //data: ResidentialProperty[];
  data: PropertyDataResponse | ResidentialProperty[];
  properties?:
  | "all"
  | "residential"
  | "residentials"
  | "commercial"
  | "commercials"
  | "plot"
  | "plots"
  | undefined;
  onScrollChange: (scrollTop: number) => void;
  handleOpenModal: (
    action: "Approve" | "Deny" | "Delete",
    item: ResidentialProperty
  ) => void;
}

export interface Property {
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

function Table({ data, properties, onScrollChange }: TableProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isBackdropLoading, setIsBackdropLoading] = useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const navigate = useNavigate();
  const location = useLocation();
  const propertyData = location.state?.data;
  console.log("propertyData", propertyData);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  // const [hideHeader, setHideHeader] = React.useState(false);
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
       // setHideHeader(false);
      } else {
       // setHideHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [onScrollChange, lastScrollY]);

  useEffect(() => {
    if (selectedRows.length === 0) {
      handlePopoverClose();
    }
  }, [selectedRows]);

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
      const token = localStorage.getItem("token"); // Safely retrieve the auth token

      const response = await axios.put(
        `${
          import.meta.env.VITE_BackEndUrl
        }/api/adminpermission`,
        {
          status: status.toString(),
          properties: [
            {
              "type": singularProperty,
              id: id,
            },
          ],
        },
        
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token here
          },
        }
      );
      console.log("Status updated:", response.data);
      console.log("editid", response?.data?._id);
    } catch {
      console.error("Failed to update status");
    }
  };
  
//@ts-ignore
  const formatedData: PropertyViewWithSource[] = Array.isArray(data)
  ? data.map((item) => ({
      ...item,
      _source:
        properties === "residentials"
          ? "residential"
          : properties === "commercials"
          ? "commercial"
          : properties === "plots"
          ? "plot" // singular and valid
          : "residential", // default to valid value
    }))
  : [
      ...(data?.residentials?.map((item) => ({
        ...item,
        _source: "residential",
      })) ?? []),
      ...(data?.commercials?.map((item) => ({
        ...item,
        _source: "commercial",
      })) ?? []),
      ...(data?.plots?.map((item) => ({
        ...item,
        _source: "plot", 
      })) ?? []),
      ...(data?.residential?.map((item) => ({
        ...item,
        _source: "residential",
      })) ?? []),
      ...(data?.commercial?.map((item) => ({
        ...item,
        _source: "commercial",
      })) ?? []),
      ...(data?.plot?.map((item) => ({
        ...item,
        _source: "plot", 
      })) ?? []),
    ];


  // Modal state
  const [open, setOpen] = React.useState(false);
  const [selectedAction, setSelectedAction] = React.useState<string | null>(
    null
  );
  const [selectedItem, setSelectedItem] =
    React.useState<ResidentialProperty | null>(null);

  // const handleEdit = (item: ResidentialProperty) => {
  //   console.log("Editing item:", item);
  //   navigate(`/commercial/create`, { state: { data: item, mode: "edit" } });};
  const handleEdit = (item: any) => {
    console.log("item._source =", item);

    // If _source is an object with a type field:
    const propertyType =
      typeof item._source === "string"
        ? item._source
        : item._source?.type || "residential";

    navigate(`/${propertyType}/create`, {
      state: { data: item, mode: "edit" },
    });
  };

  const handleView = (id: string | number) => {
    const selectedItem = formatedData.find((item: any) => item._id === id);

    if (!selectedItem) {
      alert("Property not found");
      return;
    }
    if (!selectedItem) {
      alert("Property not found");
      return;
    }

    const routeBase = selectedItem._source;
    // const routeBase = selectedItem._source;

    if (!routeBase) {
      alert("Unknown property type");
      console.log("Missing _source in selectedItem", selectedItem);
      return;
    }
    navigate(`/${routeBase}/view/${id}`, {
      state: { data: selectedItem, mode: "view" },
    });
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

      // Success toast message
      const actionText =
        status === 1 ? "Approved" : status === 0 ? "Denied" : "Deleted";
      
         //Delay toast slightly to avoid UI interference
    setTimeout(() => {
      toast.success(`Listing successfully ${actionText.toLowerCase()}`);
    }, 300);

    } catch (e) {
      console.error("Error performing action:", e);
      toast.error("Something went wrong");

    } finally {
      setIsBackdropLoading(false);
      // setIsBackdropLoading(false);
    }
  };

  if (!Array.isArray(data)) {
    const fallback =
      data?.residential || data?.commercial || data?.plot;

    if (Array.isArray(fallback)) {
      data = fallback;
    } else {
      console.error("Expected 'data' to be an array but got:", data);
      return <p>Error: Invalid data format</p>;
    }
  }

  // popover
  const handlePopoverClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (!selectedRows.includes(event.currentTarget.value)) {
      // Only open popover if new selection is made
      setPopoverAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const isPopoverOpen = Boolean(popoverAnchorEl);
  const popoverId = isPopoverOpen ? "simple-popover" : undefined;

  // handleBulkAction on popover
  const handleBulkAction = async (action: string) => {
    const statusMap: Record<string, number> = {
      Approve: 1,
      Deny: 0,
      Delete: 2,
      Sold: 3,
    };
  
    const statusCode = statusMap[action];
  
    // Prepare properties array for API payload
    const properties = selectedRows.map((id) => {
      const item = formatedData.find((itm) => itm._id === id);
      return {
        id,
        type: item?._source || "residential",  
      };
    });
  
    try {
      setIsBackdropLoading(true); // Show loading
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_BackEndUrl}/api/adminpermission`,
        {
          status: statusCode.toString(),
          properties,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      toast.success(`Properties successfully ${action.toLowerCase()}d`);
      setSelectedRows([]);
      handlePopoverClose();
      window.dispatchEvent(new Event("refreshTableData"));
    } catch (error) {
      console.error(`Bulk ${action.toLowerCase()} failed`, error);
      toast.error(`Bulk ${action.toLowerCase()} failed`);
    }
    finally {
      setIsBackdropLoading(false); //Hide loading
    }
  };
  

  const truncateWords = (text: string = "", wordLimit: number): string => {
    const words = text.trim().split(/\s+/);
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };

  const scrollRef = React.useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el:any = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const scroll = (direction:any) => {
    const el:any = scrollRef.current;
    if (!el) return;
    const scrollAmount = 300;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    checkScroll();
    const el:any = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      el?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          // height: hideHeader ? "450px" : "315px",
          // overflowY: "auto",
          // marginBottom: "50px",
        }}
      >
        <div className="container table-wrapper" style={{position:"relative"}}>


          {canScrollLeft && (
            <button className="scroll-button left" onClick={() => scroll("left")}>
              ◀
            </button>
          )}

        <div
          ref={scrollRef}
          className="table-scroll">
          <table className="horizontal-table">
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
              {formatedData.length === 0 && 
              (<div style={{padding:"20px", margin:"auto",textAlign:"center"}}>No properties available...</div>)
              }
              {formatedData.length > 0 && formatedData.map((item) => (
                <tr key={item._id}>
                  <td className="checkbox-align chechbox-align-inside">
                    <input
                      type="checkbox"
                      aria-describedby={popoverId}
                      onClick={handlePopoverClick}
                      checked={selectedRows.includes(item._id)}
                      onChange={(e) => {
                        setSelectedRows((prev) =>
                          e.target.checked
                            ? [...prev, item._id]
                            : prev.filter((id) => id !== item._id)
                        );
                      }}
                    />
                  </td>
                  <td className="company-name">
                    <h3>
                      {/* <span className="truncate-text">
                         {truncateWords(item?.location?.landmark, 12)}
                      </span> */}
                      <span>
                        {item?.title}
                      </span>
                    </h3>
                    <p
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title={item?.location?.address}
                    >
                      <img src="ICON_Location.svg" alt="location" />
                      <span className="truncate-text">
                        {truncateWords(item?.location?.address, 9)}
                      </span>
                    </p>
                  </td>
                  <td>{item?.area?.totalArea}</td>
                  <td>{item.status}</td>

                  {(properties === "commercials" ||
                    properties === "residentials" ||
                    properties === "all") && (
                      <>
                        <td>{item?.totalFloors}</td>
                        <td>{item?.facingDirection}</td>
                      </>
                    )}

                  {(properties === "residentials" || properties === "all") && (
                    <td
                      className="furnish"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title={item?.furnishingType}
                    >
                      <span className="truncate-text">
                        {truncateWords(item?.furnishingType, 12)}
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
                        src="/Edit.svg"
                        alt="edit"
                        onClick={() => handleEdit(item as unknown as ResidentialProperty)}
                        style={{ cursor: "pointer" }}
                      />
                      <img
                        src="/Approve.svg"
                        alt="Approve"
                        onClick={() => handleOpenModal("Approve", item as unknown as ResidentialProperty)}
                        style={{ cursor: "pointer" }}
                      />
                      <img
                        src="/Deny.svg"
                        alt="Deny"
                        onClick={() => handleOpenModal("Deny", item as unknown as ResidentialProperty)}
                        style={{ cursor: "pointer" }}
                      />
                      <img
                        src="/Delete.svg"
                        alt="Delete"
                        onClick={() => handleOpenModal("Delete", item as unknown as ResidentialProperty)}
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
          </div>

          {canScrollRight && (
            <button className="scroll-button right" onClick={() => scroll("right")}>
              ▶
            </button>
          )}

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

                  // Show toast immediately for Delete
                  if (selectedAction === "Delete") {
                    toast.success("Listing successfully deleted", {
                      autoClose: 500000, 
                    });
                  }
                  handleConfirmAction(selectedItem._id, statusCode);

                }}
                sx={{ mr: 1 }}
              >
                Confirm
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