import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import CarCard from "./carCard";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import "./checkout.css";
import { useLocation } from "react-router-dom";
function Checkout() {
  const [authToken, setAuthToken] = useState("");
  const location = useLocation();
  const thecar = location.state?.car || null;
  const user = location.state?.user || null;

  const [car, setCar] = useState([]);
  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);
  const [pickupDateTime, setPickupDateTime] = useState(new Date());
  const [returnDateTime, setReturnDateTime] = useState(new Date());
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  useEffect(() => {
    fetch(`https://car-rentals-backend.vercel.app/api/v1/car/${thecar._id}`)
      .then((response) => response.json())
      .then((data) => {
        setCar(data);
        setAuthToken(user.token);
      })

      .catch((error) => console.error(error));
  }, [thecar._id, user.token]);
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
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
          <h1>Checkout</h1>
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
          <h1>Days: {days}</h1>
          <h1>Total: {total}</h1>
          <div className="btn-graad" onClick={handleCheckout}>
            <span>Checkout</span>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}
export default Checkout;
