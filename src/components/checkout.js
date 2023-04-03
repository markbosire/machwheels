import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import CarCard from "./carCard";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import "./checkout.css";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";

function Checkout({ car_id, user, close, data, onContentLoaded }) {
  const [isClicked, setIsClicked] = React.useState(false);
  const handleReservationClick = () => {
    setIsClicked(true);
  };

  const [authToken, setAuthToken] = useState("");

  //const user = location.state?.user || null;

  const [car, setCar] = useState([]);
  const [success, setSuccess] = useState(false);
  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);
  const [pickupDateTime, setPickupDateTime] = useState(
    data ? data.pickupDateTime : new Date()
  );
  const [returnDateTime, setReturnDateTime] = useState(
    data ? data.returnDateTime : new Date()
  );
  const [pickupLocation, setPickupLocation] = useState(
    data ? data.pickupLocation : ""
  );
  const [returnLocation, setReturnLocation] = useState(
    data ? data.returnLocation : ""
  );
  useEffect(() => {
    fetch(`https://car-rentals-backend.vercel.app/api/v1/car/${car_id}`)
      .then((response) => response.json())
      .then((data) => {
        setCar(data);
        setAuthToken(user.token);
      })

      .catch((error) => console.error(error));
  }, [car_id, user.token]);
  const handleCheckout = () => {
    const jsonData = {
      name: user.name,
      email: user.email,
      pickUp: pickupLocation,
      pickUpDateAndTime: pickupDateTime,
      dropOff: returnLocation,
      dropOffDateAndTime: returnDateTime,
      car: car,
    };
    console.log(jsonData);
    console.log(authToken);
    fetch("https://car-rentals-backend.vercel.app/api/v1/order/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccess(true);
      })
      .catch((error) => {
        setSuccess(false);
      });
    handleReservationClick();
  };

  useEffect(() => {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const pickupTime = pickupDateTime.getTime();
    const returnTime = returnDateTime.getTime();
    const differenceInMilliseconds = returnTime - pickupTime;
    const daysBetween = differenceInMilliseconds / millisecondsPerDay;
    let price = 0;
    if (car[0]) {
      price = car[0].price;
    }
    const multiplication = days * parseFloat(price);

    setDays(Math.round(daysBetween));

    setTotal(multiplication);
  }, [pickupDateTime, returnDateTime, total, days, car]);

  return (
    <React.Fragment>
      <div className="checkout">
        <section className="bottomwidget">
          <div className="checkout-title">
            <h1>Checkout</h1>
            <CloseIcon onClick={close} />
          </div>
          {car.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
          <div className="form-group">
            <i className="fa fa-map-marker icon"></i>
            <div>
              <label>Pickup Location</label>
              <select
                value={pickupLocation}
                onChange={(event) => setPickupLocation(event.target.value)}
              >
                <option value="">Select PickUp Location</option>
                <option value="Karen">Karen</option>
                <option value="Lavington">Lavington</option>
                <option value="CBD">CBD</option>
              </select>
            </div>
            {/* ... existing input for pickup location */}
          </div>
          <div className="form-group gp">
            <i className="fa fa-calendar icon"></i>
            <div className="div">
              <label>Pickup Date, Time</label>
              <DatePicker
                showIcon
                selected={pickupDateTime}
                onChange={(date) => setPickupDateTime(date)}
                showTimeSelect
                dateFormat="Pp"
              />
            </div>
            {/* ... existing DatePicker for pickup */}
          </div>
          <div className="form-group">
            <i className="fa fa-map-marker icon"></i>
            <div>
              <label>Drop Off Location</label>
              <select
                value={returnLocation}
                onChange={(event) => setReturnLocation(event.target.value)}
              >
                <option value="">Select DropOff Location</option>
                <option value="Karen">Karen</option>
                <option value="Lavington">Lavington</option>
                <option value="CBD">CBD</option>
              </select>
            </div>
            {/* ... existing input for drop off location */}
          </div>
          <div className="form-group gp">
            <i className="fa fa-calendar icon"></i>
            <div className="div">
              <label>Drop off Date, Time:</label>
              <DatePicker
                showIcon
                selected={returnDateTime}
                onChange={(date) => setReturnDateTime(date)}
                showTimeSelect
                dateFormat="Pp"
              />
            </div>

            {/* ... existing DatePicker for drop off */}
          </div>
          <div className="tally">
            <h1>Days: {days}</h1>
            <h1>Total: {total}</h1>
          </div>
          <div className="tally wth">
            <div className="btn-graad" onClick={handleCheckout}>
              <span>Checkout</span>
            </div>

            <div className="btn-graad" onClick={close}>
              <span>Close</span>
            </div>
          </div>
          {isClicked && (
            <Alert severity={success ? "success" : "error"}>
              {success ? "order was created successfully" : "Check credentials"}
            </Alert>
          )}
        </section>
      </div>
    </React.Fragment>
  );
}
export default Checkout;
