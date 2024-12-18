import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CustomSlider = () => {
  const sliderRef = React.useRef(null);

  const slideLeft = () => {
    sliderRef.current.scrollLeft -= 200; 
  };

  const slideRight = () => {
    sliderRef.current.scrollLeft += 200;
  };

  return (
    <div className="slider-container">
      {/* Left Arrow */}
      <button className="slider-arrow left-arrow" onClick={slideLeft}>
        <FaChevronLeft />
      </button>

      {/* Slider Content */}
      <div className="slider" ref={sliderRef}>
        <div className="slider-item active">Palms-down wrist curl over bench</div>
        <div className="slider-item">Incline Hammer Curls</div>
        <div className="slider-item">Standing behind-the-back</div>
        <div className="slider-item">Standing behind-the-back</div>
        <div className="slider-item">Standing behind-the-back</div>
        <div className="slider-item">Palms-down wrist curl over bench</div> 
        <div className="slider-item">Palms-down wrist curl over bench</div>

      </div>

      {/* Right Arrow */}
      <button className="slider-arrow right-arrow" onClick={slideRight}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default CustomSlider;


