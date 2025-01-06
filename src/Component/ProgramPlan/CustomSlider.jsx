import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { TestObject } from "../../../CommonFunctions";

const CustomSlider = ({ selectedItem, AddObject, search }) => {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
      const slideWidth =
        sliderRef.current.querySelector(".slider-item").offsetWidth;
      sliderRef.current.scrollLeft -= slideWidth;
      updateArrowState();
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      const slideWidth =
        sliderRef.current.querySelector(".slider-item").offsetWidth;
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

  const filteredItems = selectedItem.filter((exercise) =>
    exercise.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {filteredItems.length > 0 ? (
        <div className="slider-container">
          {/* Left Arrow */}
          <button
            className={`slider-arrow left-arrow ${
              !canScrollLeft ? "disabled" : ""
            }`}
            onClick={slideLeft}
            disabled={!canScrollLeft}
          >
            <FaChevronLeft />
          </button>

          {/* Slider Content */}
          <div className="slider" ref={sliderRef}>
            {filteredItems?.map((exercise, index) => (
              <div
                key={index}
                className={`slider-item index-${index}`}
                onClick={() => {
                  AddObject(exercise);
                }}
              >
                {exercise}
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            className={`slider-arrow right-arrow ${
              !canScrollRight ? "disabled" : ""
            }`}
            onClick={slideRight}
            disabled={!canScrollRight}
          >
            <FaChevronRight />
          </button>
        </div>
      ) : (
        <div className="noSlider">No recorde found.</div>
      )}
    </>
  );
};

export default CustomSlider;
