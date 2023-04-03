import { ChevronRight, ExitToApp } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import "./reservationWidget.css";
import { Alert, AlertTitle } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Checkout from "./checkout";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,

  boxShadow: 24,
  p: 4,
};

const CarOptions = ({ carType, cars, handleOptionClick }) => {
  const filteredCars = cars.filter(
    (car) =>
      (carType === "Economy" && car.price < 7500) ||
      (carType === "Luxury" && car.price >= 7500)
  );

  return (
    <div className="options-container">
      {filteredCars.map((car, index) => (
        <span
          key={index}
          className={`option`}
          onClick={() => handleOptionClick(car.title, car._id)}
        >
          {car.title}
        </span>
      ))}
    </div>
  );
};
// import CSS file
function ReservationWidget({ user }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [cars, setCars] = useState([]);
  const [showPickupLocations, setShowPickupLocations] = useState(false);
  const [showReturnLocations, setShowReturnLocations] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showsOptions, setShowsOptions] = useState(false);
  const options = [
    { value: "Select Vehicle type", label: "Select Vehicle type" },
    { value: "Economy", label: "Economy" },
    { value: "Luxury", label: "Luxury" },
  ];
  const locationoptions = [
    { value: "Select Location", label: "Select Location" },
    { value: "Karen", label: "Karen" },
    { value: "Kitengela", label: "Kitengela" },
    { value: "Kiambu", label: "Kiambu" },
  ];
  useEffect(() => {
    fetch("https://car-rentals-backend.vercel.app/api/v1/car/all")
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
      })
      .catch((error) => console.error(error));
  }, []);
  const handleOptionClick = (value) => {
    setCarType(value);
    setShowOptions(false);
  };
  const handlepickUplocationClick = (value) => {
    setPickupLocation(value);
    setShowPickupLocations(false);
  };
  const handlereturnlocationClick = (value) => {
    setReturnLocation(value);
    setShowReturnLocations(false);
  };

  // ... existing state and handleSubmit function
  const [pickupDateTime, setPickupDateTime] = useState(new Date());
  const [checkoutData, setCheckoutData] = useState({});
  const [returnDateTime, setReturnDateTime] = useState(new Date());
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [carType, setCarType] = useState("Select vehicle type");
  const [carTitle, setCarTitle] = useState("Select vehicle");
  const [carID, setCarID] = useState("");
  const [isClicked, setIsClicked] = React.useState(false);

  const handleOptionsClick = (value, id) => {
    setCarTitle(value);
    setCarID(id);

    console.log(cars);
    setShowsOptions(false);
  };
  const handleReservationClick = () => {
    if (!user) {
      setIsClicked(true);
    } else {
      if (
        pickupDateTime &&
        pickupLocation.length > 2 &&
        returnDateTime &&
        returnLocation.length > 2
      ) {
        setCheckoutData({
          pickupLocation: pickupLocation,
          pickupDateTime: pickupDateTime,
          returnLocation: returnLocation,
          returnDateTime: returnDateTime,
        });
        handleOpen();
      }
    }
  };

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
            data={checkoutData}
          />
        </Box>
      </Modal>
      <div className="widget">
        <section className="top-widget">
          {" "}
          <div
            className="form-group vt"
            onClick={() => setShowOptions(!showOptions)}
          >
            <i className="fa fa-car icon"></i>
            <label>Vehicle Type</label>
            <span>{carType}</span>
            <div className="options-container">
              {showOptions &&
                options.map((option, index) => (
                  <span
                    key={index}
                    className={`option ${
                      option.value === carType ? "selected" : ""
                    }`}
                    onClick={() => handleOptionClick(option.value)}
                  >
                    {option.label}
                  </span>
                ))}
            </div>
          </div>{" "}
          <div
            className="form-group"
            onClick={() => setShowsOptions(!showsOptions)}
          >
            <i className="fa fa-car icon"></i>
            <label>Select Vehicle</label>
            <span>{carTitle}</span>
            {showsOptions && (
              <CarOptions
                carType={carType}
                cars={cars}
                handleOptionClick={handleOptionsClick}
              />
            )}
            {/* ... existing select for car type */}
          </div>
        </section>
        <section className="bottom-widget">
          <div
            className="form-group"
            onClick={() => setShowPickupLocations(!showPickupLocations)}
          >
            <i className="fa fa-map-marker icon"></i>
            <label>Pickup Location</label>
            <span>{pickupLocation < 2 ? "pick location" : pickupLocation}</span>
            <div className="options-container loc">
              {showPickupLocations &&
                locationoptions.map((option, index) => (
                  <span
                    key={index}
                    className={`option ${
                      option.value === carType ? "selected" : ""
                    }`}
                    onClick={() => handlepickUplocationClick(option.value)}
                  >
                    {option.label}
                  </span>
                ))}
            </div>
            {/* ... existing input for pickup location */}
          </div>
          <div className="form-grou">
            <i className="fa fa-calendar icon"></i>
            <label>Pickup Date, Time</label>
            <DatePicker
              showIcon
              selected={pickupDateTime}
              onChange={(date) => setPickupDateTime(date)}
              showTimeSelect
              dateFormat="Pp"
            />
            {/* ... existing DatePicker for pickup */}
          </div>
          <div
            className="form-group"
            onClick={() => setShowReturnLocations(!showReturnLocations)}
          >
            <i className="fa fa-map-marker icon"></i>
            <label>Return Location</label>
            <span>{returnLocation < 2 ? "pick location" : returnLocation}</span>
            <div className="options-container loc">
              {showReturnLocations &&
                locationoptions.map((option, index) => (
                  <span
                    key={index}
                    className={`option ${
                      option.value === carType ? "selected" : ""
                    }`}
                    onClick={() => handlereturnlocationClick(option.value)}
                  >
                    {option.label}
                  </span>
                ))}
            </div>
            {/* ... existing input for drop off location */}
          </div>
          <div className="form-grou">
            <i className="fa fa-calendar icon"></i>
            <label>Drop off Date, Time:</label>
            <DatePicker
              showIcon
              selected={returnDateTime}
              onChange={(date) => setReturnDateTime(date)}
              showTimeSelect
              dateFormat="Pp"
            />

            {/* ... existing DatePicker for drop off */}
          </div>
        </section>
        <section className="footer">
          <div className="terms">
            <input type="checkbox" color="black" />
            <p>Agree to terms and conditions</p>
          </div>
          <Avatar
            sx={{
              background: "linear-gradient(to right, #F518E3, #FBAE24)",

              marginTop: "10px",
              width: "30px",
              height: "30px",
            }}
            onClick={handleReservationClick}
          >
            <ChevronRight sx={{ color: "#fff" }} />
          </Avatar>
        </section>
        {isClicked && !user && (
          <Alert severity="warning">
            <AlertTitle>Please Log In</AlertTitle>
            You need to be logged in to make a reservation.
          </Alert>
        )}
        {isClicked &&
          pickupDateTime &&
          pickupLocation.length > 2 &&
          returnDateTime &&
          returnLocation.length > 2 && (
            <Alert severity="warning">Fill all the fields</Alert>
          )}
      </div>
    </React.Fragment>
  );
}

export default ReservationWidget;
