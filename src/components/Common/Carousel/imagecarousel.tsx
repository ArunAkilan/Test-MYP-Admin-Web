import { useState } from "react";
import {
  Dialog,
  Typography,
  IconButton,
  Slide,
  Grid,
  Box,
  Popover,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import "./imagecarousel.scss";
import axios from "axios";

type PropertyType = "all" | "residentials" | "commercials" | "plots";

const properties: PropertyType = "all";
interface Props {
  open: boolean;
  onClose: () => void;
  images?: string[];
  price?: string;
  area?: string;
}

export default function ImageCarouselModal({
  open,
  onClose,
  images,
}: // price,
// area,
Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLElement | null>(
    null
  );
  console.log("showThumbnails", showThumbnails);

  const handlePrev = () => {
    //@ts-ignore
    setCurrentIndex((prev) => (prev === 0 ? images?.length - 1 : prev - 1));
  };

  const handleNext = () => {
    //@ts-ignore
    setCurrentIndex((prev) => (prev === images?.length - 1 ? 0 : prev + 1));
  };

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
        { status: `${status}` },
        {
          headers: {
            "Authorization":`Bearer ${localStorage.getItem("token")}`
          },
        }
      );
      console.log("Status updated:", response.data);
    } catch  {
      console.error("Failed to update status");
    }
  };

  // handleBulkAction on popover
  const handleBulkAction = async (action: string) => {
    const statusMap: Record<string, number> = {
      Approve: 1,
      Deny: 0,
      Delete: 2,
    };

    const statusCode = statusMap[action];

    try {
      for (const id of selectedRows) {
        await handleAction(id, statusCode); // Your API call
      }

      setSelectedRows([]); // Clear selection
      handlePopoverClose(); // Close popover
      window.dispatchEvent(new Event("refreshTableData")); // Refresh table
    } catch  {
      console.error(`Failed to ${action.toLowerCase()} selected properties`);
    }
  };

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <div className="large-screen-header">
        <span className="large-screen-header-wrap" onClick={onClose}>
          <img
            src="../src/assets/dashboardtab/weui_arrow-outlined.svg"
            alt="arrow"
          />
          <p>Back</p>
        </span>
      </div>
      <div className="large-screen-wrapper">
        <IconButton
          onClick={() => setShowThumbnails((prev) => !prev)}
          className="Gallery-button"
        >
          <img
            src="../src/assets/dashboardtab/solar_gallery-linear.svg"
            alt="gallery"
          />
          <span className="gallery-text">Gallery</span>
        </IconButton>
        <Grid container sx={{ height: "100vh" }}>
          {/* Left Thumbnail Column */}
          <Slide
            direction="right"
            in={showThumbnails}
            mountOnEnter
            unmountOnExit
          >
            <Grid
              item
              xs={3}
              sx={{ overflowY: "auto" }}
              className="left-thumbnail-image"
            >
              {images && images.map((img, idx) => (
                <Box
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  sx={{
                    mb: 2,
                    mx: "auto",
                    borderRadius: 2,
                    overflow: "hidden",
                    border:
                      idx === currentIndex
                        ? "2px solid #00FF80"
                        : "2px solid transparent",
                    cursor: "pointer",
                    width: 225,
                    height: 125,
                  }}
                  className="left-single-image"
                >
                  <div className="checkbox-div">
                  <input
                    type="checkbox"
                    className="large-screen-checkbox"
                    aria-describedby={popoverId}
                    onClick={handlePopoverClick}
                    checked={selectedRows.includes(img)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows((prev) => [...prev, img]);
                      } else {
                        setSelectedRows((prev) =>
                          prev.filter((id) => id !== img)
                        );
                      }
                    }}
                  />
                  </div>
                  <div className="right-delete">
                    <img src="../src/assets/dashboardtab/Icon_Delete-right.svg" alt="Delete" />
                  </div>
                  <img
                    src={img}
                    alt={`Thumb ${idx + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Grid>
          </Slide>
          {/* Main Image Viewer */}
          <Grid
            item
            xs={showThumbnails ? 9 : 12}
            sx={{ position: "relative", width: "100%", height: "100" }}
          >
            {/* Left Arrow */}
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                bgcolor: "rgba(0,0,0,0.5)",
                color: "#fff",
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            {/* Right Arrow */}
            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                bgcolor: "rgba(0,0,0,0.5)",
                color: "#fff",
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>

            {/* Main Image */}
            <Box
              sx={{
                height: "100%",

                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
              //@ts-ignore
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                style={{
                  maxHeight: "90%",
                  maxWidth: "90%",
                  width: "1024px",
                  height: "768px",
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* Image Count + Label Bottom Left */}
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                display: "flex",
                alignItems: "center",
                backgroundColor: "#1E2A3A",
                color: "#fff",
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
              }}
            >
              <CameraAltIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography variant="caption">
                {`${currentIndex + 1}/${images?.length}`} Images
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
      <Popover
        className="checkbox-popover"
        id={popoverId}
        open={Boolean(popoverAnchorEl) && selectedRows.length > 0}
        onClose={handlePopoverClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 800, left: window.innerWidth - 635 }} // adjust position here
        disableRestoreFocus
        PaperProps={{
          style: { pointerEvents: "auto", zIndex: 1400 }, // ensure above table
        }}
      >
        <div className="checkbox-popover-content">
          <p className="property-select">
            {selectedRows.length} images selected
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
    </Dialog>
  );
}
