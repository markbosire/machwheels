import { AttachMoney, DirectionsCar } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Slider from "react-slick";
import "./midSection.css";

import PlaceIcon from "@mui/icons-material/Place";
import CarCard from "./carCard";
function MidSection({ user }) {
  const navigate = useNavigate();
  function Dashboard() {
    navigate("/dashboard", { state: { user: user } });
  }
  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // show 5 slides by default
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1190,
        settings: {
          slidesToShow: 3, // show 1 slide at 800px
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2, // show 1 slide at 800px
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // show 1 slide at 800px
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [cars, setCars] = useState([]);
  const fetchData = () => {
    return fetch("https://car-rentals-backend.vercel.app/api/v1/car/all/")
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <React.Fragment>
      <div className="pg">
        <div className="title">
          <p>{console.log(cars)}Easy as</p>

          <span>you like it</span>
        </div>
        <p className="pgp">
          Cruise into the weekend with style and ease. Our premium rental cars
          let you experience the open road in comfort and class. Adventure
          awaits - grab the keys and go!
        </p>
      </div>

      <div className="countdown-div">
        <div className="countdown">
          <div className="numbers">
            <span className="baseline-aligned">
              <Avatar sx={{ bgcolor: " #Ffecf9" }}>
                <PlaceIcon
                  sx={{
                    color: "#F75F86",
                  }}
                />
              </Avatar>
            </span>

            <span className="baseline-aligned one">1</span>
          </div>
          <h1>Choose Locations</h1>
          <p>
            At our car rental company, we make it easy for you to choose your
            pickup and drop-off locations. With a wide range you can easily find
            your perfect location.
          </p>
        </div>
        <div className="countdown">
          <div className="numbers">
            <span className="baseline-aligned">
              <Avatar sx={{ bgcolor: " #Ffecf9" }}>
                <AttachMoney
                  sx={{
                    color: "#F75F86",
                  }}
                />
              </Avatar>
            </span>

            <span className="baseline-aligned one">2</span>
          </div>
          <h1>Select Best Deals</h1>
          <p>
            Selecting the best car rental deals has never been easier. Our
            company offers a variety of options to fit your budget and travel
            needs.
          </p>
        </div>
        <div className="countdown">
          <div className="numbers">
            <span className="baseline-aligned mg">
              <Avatar sx={{ bgcolor: " #Ffecf9" }}>
                <DirectionsCar
                  sx={{
                    color: "#F75F86",
                  }}
                />
              </Avatar>
            </span>

            <span className="baseline-aligned one">3</span>
          </div>
          <h1>Reserve your car</h1>
          <p>
            Booking your car rental has never been easier. With our streamlined
            online booking process, you can reserve your vehicle in just a few
            clicks.
          </p>
        </div>
      </div>
      <div className="cars">
        <div className="feature-deals" style={{ marginBottom: "25px" }}>
          <div style={{ fontSize: "30px", width: "88%" }} className="ft_title">
            <strong>Feature deals</strong> of the day
          </div>{" "}
          <div className="btn-grad" onClick={Dashboard}>
            <span>VIEW ALL DEALS</span>
          </div>
        </div>
        <Slider {...settings}>
          {cars.map((car) => (
            <CarCard key={cars._id} car={car} token={user} />
          ))}
        </Slider>
      </div>
    </React.Fragment>
  );
}
export default MidSection;
