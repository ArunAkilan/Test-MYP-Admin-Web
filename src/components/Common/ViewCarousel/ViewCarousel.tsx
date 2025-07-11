import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import viewImage from "../../../assets/viewProperty/carousel-image.svg";
import "./ViewCarousel.scss"
import ImageCarouselModal from "../Carousel/imagecarousel";
const images = [viewImage, viewImage, viewImage, viewImage];

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute custom-left-arrow left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white p-2 rounded-full shadow-md"
    onClick={onClick}
  >
    <ChevronLeft size={20} />
  </div>
);

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute custom-right-arrow right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white p-2 rounded-full shadow-md"
    onClick={onClick}
  >
    <ChevronRight size={20} />
  </div>
);

const ViewCarousel: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const mainSlider = useRef<Slider | null>(null);
  const thumbSlider = useRef<Slider | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="flex relative row  bg-white rounded-lg shadow-lg max-w-[1000px] mx-auto h-[400px]">
      
      {/* Main Image (Left side) */}
      <div className="relative large-image-wrapper col-md-8 w-[500px] h-full">

        {/* Image count */}
        <div className="absolute slide-counter  top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <Camera size={16} />
            {currentIndex + 1}/{images.length}
        </div>
        <Slider
          asNavFor={thumbSlider.current as Slider}
          ref={(slider) => {mainSlider.current = slider}}
          arrows
          infinite
          fade
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
          beforeChange={(_, next) => setCurrentIndex(next)}
        >
          {images.map((src, index) => (
            <div key={index} onClick={() => setModalOpen(true)} className="cursor-pointer">
              <img
                src={src}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover large-image rounded-md"
              />
            </div>
          ))}
        </Slider>

        
      </div>

      {/* Thumbnails on Right Side */}
      <div className="w-1/4 col-md-4 h-full pl-4">
        <Slider
          asNavFor={mainSlider.current as Slider}
          ref={(slider) => {thumbSlider.current = slider}}
          slidesToShow={2}
          vertical
          swipeToSlide
          focusOnSelect
          arrows={false}
          infinite
        >
          {images.map((src, index) => (
            <div key={index} className="py-2">
              <img
                src={src}
                alt={`Thumb ${index + 1}`}
                className={`w-full h-[180px] object-cover rounded-md border-2 ${
                  index === currentIndex ? "border-pink-500" : "border-transparent"
                }`}
              />
            </div>
          ))}
        </Slider>
      </div>
      <ImageCarouselModal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  images={images}
  price="₹20,000"
  area="2 BHK, 1200 sqft"
/>
    </div>
  );
};

export default ViewCarousel;
