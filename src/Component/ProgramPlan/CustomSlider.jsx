import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CustomSlider = () => {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const sliderItems = [
    "Palms-down wrist curl over bench",
    "Incline Hammer Curls",
    "Standing curls",
    "Standing behind-the-back",
    "Reverse wrist curls",
    "Seated wrist curls",
    "Hammer curls",
  ];

  const updateArrowState = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
  
      // Adjust for floating-point precision with Math.ceil
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  const slideLeft = () => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.querySelector(".slider-item").offsetWidth;
      sliderRef.current.scrollLeft -= slideWidth;
      updateArrowState();
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.querySelector(".slider-item").offsetWidth;
      sliderRef.current.scrollLeft += slideWidth;
      updateArrowState();
    }
  };

  useEffect(() => {
    updateArrowState(); // Initial state update
    const slider = sliderRef.current;
    slider.addEventListener("scroll", updateArrowState);

    return () => {
      slider.removeEventListener("scroll", updateArrowState);
    };
  }, []);

  return (
    <div className="slider-container">
      {/* Left Arrow */}
      <button
        className={`slider-arrow left-arrow ${!canScrollLeft ? "disabled" : ""}`}
        onClick={slideLeft}
        disabled={!canScrollLeft}
      >
        <FaChevronLeft />
      </button>

      {/* Slider Content */}
      <div className="slider" ref={sliderRef}
    >
        {sliderItems.map((item, index) => (
          <div key={index} className={`slider-item index-${index}`}>
            {item}
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        className={`slider-arrow right-arrow ${!canScrollRight ? "disabled" : ""}`}
        onClick={slideRight}
        disabled={!canScrollRight}
      >
        <FaChevronRight />
      </button>

    </div>
  );
};

export default CustomSlider;
