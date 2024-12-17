import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const items = [
  'Palms-down wrist curl over bench',
  'Incline Hammer Curls',
  'Standing behind-the-back',
  'Biceps Curl',
  'Shoulder Press',
];

const CustomSlider = () => {
  const settings = {
    dots: false,         // Pagination dots
    infinite: false,      // Infinite scroll
    speed: 500,          // Transition speed
    slidesToShow: 3,     // Number of visible slides
    slidesToScroll: 1,   // Slides to scroll
    responsive: [
      {
        breakpoint: 768, // For smaller devices
        settings: {
          slidesToShow: 2,
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
                index === 0 ? 'active-item' : 'inactive-item'
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
