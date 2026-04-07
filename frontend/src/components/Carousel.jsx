import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const execom = "/execom-2024.jpg";
const akrasc = "/akrasc.jpg";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="rounded-md">
      <Slider {...settings}>
        <div className="rounded-md">
        <img src={execom} alt="execom" className="rounded-md" loading="lazy"/>
        </div>
        <div className="rounded-md">
        <img src={akrasc} alt="akrasc" className="rounded-md" loading="lazy"/>
        </div>
      </Slider>
      </div>
  );
}

export default Carousel;
