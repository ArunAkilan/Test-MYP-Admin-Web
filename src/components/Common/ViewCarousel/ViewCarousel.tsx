import React, {  useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ViewCarousel.scss";
import ImageCarouselModal from "../Carousel/imagecarousel";

interface ViewCarouselProps {
  images: string[];
  price?: string;
  area?: string;
}

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

const ViewCarousel: React.FC<ViewCarouselProps> = ({ images, price, area }) => {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  // const mainSlider = useRef<Slider | null>(null);
  // const thumbSlider = useRef<Slider | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex relative row bg-white rounded-lg max-w-[1000px] mx-auto h-[400px]">
      {/* Main Image (Left side) */}
      <div className="relative large-image-wrapper col-md-8 w-[500px] h-full">
        {/* Image count */}
        <div className="absolute slide-counter top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
          <Camera size={16} />
          {currentIndex + 1}/{images.length}
        </div>
        <Slider
          asNavFor={nav2!}
          ref={(slider) => setNav1(slider)}
          arrows
          infinite
          fade
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
          beforeChange={(_: number, next: number) => setCurrentIndex(next)}
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
      <div className="w-1/4 right-slider col-md-4 h-full pl-4">
        <Slider
          asNavFor={nav1!}
          ref={(slider) => setNav2(slider)}
          slidesToShow={2}
          vertical
          swipeToSlide
          focusOnSelect
          arrows={false}
          infinite
        >
          {images.map((src, index) => (
            <div key={index} className="px-2 py-1">
              <img
                src={src}
                alt={`Thumb ${index + 1}`}
                className={`w-full h-[120px] object-cover rounded-md border-2 ${
                  index === currentIndex ? "border-pink-500" : "border-transparent"
                }`}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Fullscreen Modal */}
      <ImageCarouselModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        images={images}
        price={price}
        area={area}
      />
    </div>
  );
};

export default ViewCarousel;
