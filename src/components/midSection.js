import { AttachMoney, DirectionsCar } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import { Alert, AlertTitle } from "@mui/material";

import Slider from "react-slick";
import "./midSection.css";

import PlaceIcon from "@mui/icons-material/Place";
import CarCard from "./carCard";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Checkout from "./checkout";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",

  boxShadow: 24,
  p: 4,
};
const useStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "transparent",

  backgroundImage: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
};
function MidSection({ user }) {
  const [carID, setCarID] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const [isClicked, setIsClicked] = React.useState(false);
  const handleReservationClick = () => {
    if (!user) {
      setIsClicked(true);
      console.log("yu");
    } else {
      // handle reservation logic for logged in user
    }
  };

  const navigate = useNavigate();
  function Dashboard() {
    navigate("/dashboard", { state: { user: user } });
  }
  const settings = {
    arrows: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // show 5 slides by default
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4, // show 1 slide at 800px
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1300,
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
  // Add a state variable to manage CircularProgress visibility
  const [isLoading, setIsLoading] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  // Update the isLoading state when the modal loads

  // Hide the CircularProgress when the modal content is loaded
  const onContentLoaded = () => {
    //setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Checkout
            user={user}
            car_id={carID}
            close={handleClose}
            onContentLoaded={onContentLoaded}
          />
        </Box>
      </Modal>
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
            <CarCard
              key={car._id}
              car={car}
              user={user}
              action={handleReservationClick}
              clicked={function () {
                setCarID(car._id);
                console.log(carID);
                handleOpen();
                handleReservationClick();
              }}
            />
          ))}
        </Slider>
        {isClicked && !user && (
          <Alert severity="warning">
            <AlertTitle>Please Log In</AlertTitle>
            You need to be logged in to Checkout.
          </Alert>
        )}
      </div>
    </React.Fragment>
  );
}
export default MidSection;
