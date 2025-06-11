import { useRef, useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./carousel.scss";

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
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    currentRef?.addEventListener("scroll", checkScrollPosition);
    return () => {
      currentRef?.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  const scroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const containerWidth = container.offsetWidth;
      const scrollAmount = Math.min(containerWidth, Math.abs(scrollOffset)) * Math.sign(scrollOffset);
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <Box sx={{ 
      position: "relative", 
      width: "100%", 
      margin: "auto",
      overflow: "hidden",
      px: { xs: 0, sm: 2 },
      py: 2,
    }}>
      {showLeftArrow && (
        <IconButton
          onClick={() => scroll(-300)}
          sx={{
            position: "absolute",
            top: "50%",
            left: { xs: 4, sm: 8 },
            transform: "translateY(-50%)",
            bgcolor: "background.paper",
            boxShadow: 3,
            borderRadius: "50%",
            "&:hover": { bgcolor: "action.hover" },
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: 36, sm: 44 },
            height: { xs: 36, sm: 44 },
            color: "primary.main",
            transition: "all 0.3s ease",
          }}
          aria-label="scroll left"
        >
          <ArrowBackIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
        </IconButton>
      )}

      {showRightArrow && (
        <IconButton
          onClick={() => scroll(300)}
          sx={{
            position: "absolute",
            top: "50%",
            right: { xs: 4, sm: 8 },
            transform: "translateY(-50%)",
            bgcolor: "background.paper",
            boxShadow: 3,
            borderRadius: "50%",
            "&:hover": { bgcolor: "action.hover" },
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: 36, sm: 44 },
            height: { xs: 36, sm: 44 },
            color: "primary.main",
            transition: "all 0.3s ease",
          }}
          aria-label="scroll right"
        >
          <ArrowForwardIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
        </IconButton>
      )}

      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          gap: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 3 },
          py: 1,
          width: "100%",
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {sampleCarouselItems.map((item, index) => (
          <Card
            key={index}
            sx={{
              width: {
                xs: "107%",
                sm: "51%",
                md: "33%",
                lg: "24%",
              },
              minWidth: {
                xs: "100%",
                sm: "51%",
                md: "33%",
                lg: "24%",
              },
              scrollSnapAlign: "start",
              flex: "0 0 auto",
              borderRadius: 2,
              boxShadow: 2,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 4,
              },
            }}
          >
            <CardMedia
              sx={{ 
                height: { xs: 160, sm: 180 },
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
              image={item.img}
              title={item.title}
            />
            <CardContent sx={{ padding: { xs: 2, sm: 3 } }}>
              <Typography 
                gutterBottom 
                component="div" 
                sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  color: "text.primary",
                }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ 
                  color: "text.secondary",
                  fontWeight: 500,
                  fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                  mb: 1,
                }}
              >
                {item.subtitle}
              </Typography>
              <Typography
                variant="body2"
                sx={{ 
                  color: "text.secondary",
                  fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                }}
              >
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};