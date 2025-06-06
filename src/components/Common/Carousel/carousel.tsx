import  { useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import './carousel.scss'

export const Carousel = () => {
  const sampleCarouselItems = [
    {
      img: "card-image.jpg",
      title: "₹24,000/Month | 1800 sqft",
      subtitle: "Vadakku mathavi street",
      description: "Old Bus Stand, Perambalur",
    },
    {
      img: "card-image.jpg",
      title: "₹24,000/Month | 1800 sqft",
      subtitle: "TVadakku mathavi street",
      description: "Old Bus Stand, Perambalur",
    },
    {
      img: "card-image.jpg",
      title: "₹24,000/Month | 1800 sqft",
      subtitle: "Vadakku mathavi street",
      description: "Old Bus Stand, Perambalur",
    },
    {
      img: "card-image.jpg",
      title: "₹24,000/Month | 1800 sqft",
      subtitle: "Vadakku mathavi street",
      description: "Old Bus Stand, Perambalur",
    },
    {
      img: "card-image.jpg",
      title: "₹30,000/Month | 2000 sqft",
      subtitle: "East Main Street",
      description: "Near Market Road",
    },
    {
      img: "card-image.jpg",
      title: "₹15,000/Month | 1200 sqft",
      subtitle: "West Road",
      description: "Opposite Bus Stand",
    },
    {
      img: "card-image.jpg",
      title: "₹18,500/Month | 1400 sqft",
      subtitle: "North Cross Street",
      description: "Beside Petrol Bunk",
    },
    {
      img: "card-image.jpg",
      title: "₹22,000/Month | 1600 sqft",
      subtitle: "Central Avenue",
      description: "Near Hospital",
    },
  ];


    const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%",  margin: "auto" }}>
   <IconButton
        onClick={() => scroll(-300)}
        sx={{
          position: "absolute",
          top: "50%",
          left: 8,
          transform: "translateY(-50%)",
          bgcolor: "white",
          boxShadow: 2,
          borderRadius: "50%",
          "&:hover": { bgcolor: "#f0f0f0" },
          zIndex: 10,
        }}
        aria-label="scroll left"
      >
        <ArrowBackIcon />
      </IconButton>

      <IconButton
        onClick={() => scroll(300)}
        sx={{
          position: "absolute",
          top: "50%",
          right: 8,
          transform: "translateY(-50%)",
          bgcolor: "white",
          boxShadow: 2,
          borderRadius: "50%",
          "&:hover": { bgcolor: "#f0f0f0" },
          zIndex: 10,
        }}
        aria-label="scroll right"
      >
        <ArrowForwardIcon />
      </IconButton>


      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          gap: 2,
          padding: 2,
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { display: "none" }, 
        }}
      >
        {sampleCarouselItems.map((item, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 267,
              scrollSnapAlign: "start",
              flexShrink: 0,
            }}
          >
            <CardMedia sx={{ height: 140 }} image={item.img} title={item.title} />
            <CardContent>
              <Typography gutterBottom  component="div" className="content-title">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="content-subtitle">
                {item.subtitle}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="content-body">
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
