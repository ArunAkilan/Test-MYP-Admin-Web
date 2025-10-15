import React, { useState } from "react";
import {
  Box,
  Card,
  IconButton,
  Badge,
  styled,

} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import CloseIcon from "@mui/icons-material/Close";
// import type { TransitionProps } from "@mui/material/transitions";
import ImageCarouselModal from "./imagecarousel";

interface CarouselProps {
  images?: string[];
  price?: string;
  area?: string;
}

const ImageCountBadge = styled(Badge)(() => ({
  position: "absolute",
  top: 8,
  left: 8,
  backgroundColor: "#000",
  color: "#fff",
  padding: "4px 8px",
  borderRadius: 16,
  fontSize: 12,
  display: "flex",
  alignItems: "center",
  zIndex: 2,
}));

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & { children: React.ReactElement },
//   ref: React.Ref<unknown>
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const Carousel: React.FC<CarouselProps> = ({ images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  //@ts-ignore
  const [direction, setDirection] = useState<"left" | "right">("right");

  const handlePrev = () => {
    setDirection("left");//@ts-ignore
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images?.length - 1));
  };

  const handleNext = () => {
    setDirection("right");//@ts-ignore
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  // const handleThumbClick = (index: number) => {
  //   setCurrentIndex(index);
  // };

  return (
    <>
      <Card
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 3,
          maxWidth: 600,
          mx: "auto",
          cursor: "pointer",
        }}
        onClick={() => setOpen(true)}
      >
        <Box
          sx={{
            width: "100%",
            height: 240,
            overflow: "hidden",
            position: "relative",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",//@ts-ignore
              width: `${images?.length * 100}%`,
              transform: `translateX(-${//@ts-ignore
                currentIndex * (100 / images?.length)
              }%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {images && images.map((img, index) => (
              <Box
                key={index}
                sx={{
                  width: `${100 / images.length}%`,
                  flexShrink: 0,
                  // height: "85vh",
                  position: "relative",
                }}
              >
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Badge for image count */}
                {index === currentIndex && (
                  <ImageCountBadge
                    badgeContent={`${currentIndex + 1}/${images?.length}`}
                    anchorOrigin={{ vertical: "top", horizontal: "left" }}
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      bgcolor: "rgba(0, 0, 0, 0.6)",
                      color: "#fff",
                      borderRadius: 1,
                      px: 1,
                      py: 0.5,
                      fontSize: "0.75rem",
                    }}
                  >
                    <CameraAltIcon
                      fontSize="small"
                      sx={{ color: "#fff", mr: 0.5 }}
                    />
                  </ImageCountBadge>
                )}
              </Box>
            ))}
          </Box>

          {/* Navigation Buttons */}
          {images && images?.length > 1 && (
            <>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 12,
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(255,255,255,0.8)",
                  ":hover": { bgcolor: "rgba(255,255,255,1)" },
                  zIndex: 1,
                }}
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>

              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 12,
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(255,255,255,0.8)",
                  ":hover": { bgcolor: "rgba(255,255,255,1)" },
                  zIndex: 1,
                }}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>
{/* 
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            {price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {area}
          </Typography>
        </Box> */}
      </Card>

{/* Fullscreen Dialog */}
 <ImageCarouselModal
  open={open}
  onClose={() => setOpen(false)}
  //@ts-ignore
  images={images}

/>
    </>
  );
};

export default Carousel;
