import  { useState, useRef } from "react";
import {
  Box,
  IconButton,
  Card,
  CardMedia,
  Typography,
  Modal,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const sampleItems = [
  {
    img: "/assets/image1.jpg",
    title: "Premium Flat - ₹24,000",
    subtitle: "1800 sqft | 3BHK",
    description: "Vadakku Mathavi Street, Perambalur",
  },
  {
    img: "/assets/image2.jpg",
    title: "Luxury Villa - ₹60,000",
    subtitle: "3200 sqft | 5BHK",
    description: "East Main Road, Chennai",
  },
  {
    img: "/assets/image3.jpg",
    title: "Cozy Home - ₹18,000",
    subtitle: "1200 sqft | 2BHK",
    description: "Thillainagar, Trichy",
  },
];

const AdvancedCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeItem, setActiveItem] = useState<any>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const scroll = (offset: number) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  const handleImageClick = (item: any) => {
    setActiveItem(item);
    setShowModal(true);
  };

  return (
    <>
      <Box sx={{ position: "relative", width: "100%", overflow: "hidden", px: 2, py: 3 }}>
        <IconButton
          onClick={() => scroll(-300)}
          sx={{ position: "absolute", top: "45%", left: 10, zIndex: 2, bgcolor: "white" }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <IconButton
          onClick={() => scroll(300)}
          sx={{ position: "absolute", top: "45%", right: 10, zIndex: 2, bgcolor: "white" }}
        >
          <ArrowForwardIosIcon />
        </IconButton>

        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            scrollBehavior: "smooth",
            gap: 3,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {sampleItems.map((item, index) => (
            <Card
              key={index}
              sx={{
                flex: "0 0 auto",
                width: isMobile ? 250 : 320,
                cursor: "pointer",
                borderRadius: 3,
                boxShadow: 3,
                position: "relative",
              }}
              onClick={() => handleImageClick(item)}
            >
              <CardMedia
                component="img"
                image={item.img}
                alt={item.title}
                sx={{ height: 200, borderRadius: 3 }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  bgcolor: "rgba(0, 0, 0, 0.6)",
                  color: "#fff",
                  px: 2,
                  py: 1,
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                }}
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  {item.title}
                </Typography>
                <Typography variant="body2">{item.subtitle}</Typography>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            bgcolor: "rgba(0,0,0,0.9)",
            px: 2,
          }}
        >
          <Box sx={{ maxWidth: "90%", textAlign: "center" }}>
            <img
              src={activeItem?.img}
              alt={activeItem?.title}
              style={{ width: "100%", borderRadius: 12 }}
            />
            <Typography variant="h6" mt={2} color="white">
              {activeItem?.title}
            </Typography>
            <Typography variant="body2" color="white">
              {activeItem?.subtitle} - {activeItem?.description}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AdvancedCarousel;
