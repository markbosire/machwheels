import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";

const Banner = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      <div className="slide1">
        <div className="slide-content">
          <h2>Rent a car in the easiest way possible</h2>
          <p>
            Are you looking for a convenient and affordable way to rent a car?
            Whether you need a vehicle for business, leisure or any other
            occasion, you can find the right car rental service with Machwheels
            . Enterprise offers a wide range of vehicles, from compact cars to
            luxury cars, SUVs to minivans.
          </p>
        </div>
      </div>
      <div className="slide2">
        <div className="slide-content">
          <h2>Unmatched Quality Car Rentals</h2>
          <p>
            Our selection of premium vehicles is meticulously maintained and
            inspected to ensure that you can drive with confidence. With our
            commitment to quality and reliability, you can rest assured that
            your rental car will exceed your expectations.
          </p>
        </div>
      </div>
      <div className="slide3">
        <div className="slide-content">
          <h2>Experience the Ultimate Comfort</h2>
          <p>
            With our focus on providing the utmost comfort to our customers, you
            can sit back, unwind, and enjoy the journey. From the plush seats to
            the advanced suspension systems, our cars are designed to make your
            ride as comfortable as possible.
          </p>
        </div>
      </div>
    </Slider>
  );
};

export default Banner;
