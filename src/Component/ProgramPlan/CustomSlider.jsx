import React from "react";
import Slider from "react-slick";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const items = [
  "Palms-down wrist curl over bench",
  "Incline Hammer Curls",
  "Standing behind-the-back",
  "Biceps Curl",
  "Standing behind-the-back wrist curl",
];

const CustomArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow`}
    style={{ ...style }}
    onClick={onClick}
  >
  <div className="arrow-circle">
      {className.includes("next") ? (
        <MdOutlineNavigateNext className="arrow-icon" />
      ) : (
        <GrFormPrevious className="arrow-icon" />
      )}
    </div>
  </div>
);

const CustomSlider = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <CustomArrow />,
    prevArrow: <CustomArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mt-4">
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="slider-item">
            <div
              className={`rounded-pill text-center px-3 py-2 ${
                index === 0 ? "active-item" : "inactive-item"
              }`}
            >
              {item}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomSlider;

