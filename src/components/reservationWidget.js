import { ChevronRight } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import "./reservationWidget.css";
// import CSS file
function ReservationWidget() {
  // ... existing state and handleSubmit function
  const [pickupDateTime, setPickupDateTime] = useState(new Date());
  const [returnDateTime, setReturnDateTime] = useState(new Date());
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [carType, setCarType] = useState("");
  const [car, setCar] = useState("");

  return (
    <React.Fragment>
      <div className="widget">
        <section className="top-widget">
          {" "}
          <div className="form-group vt">
            <i className="fa fa-car icon"></i>
            <label>Vehicle Type</label>
            <select
              value={carType}
              onChange={(event) => setCarType(event.target.value)}
            >
              <option value="">Select Vehicle type</option>
              <option value="Economy">Economy</option>
              <option value="Luxury">Luxury</option>
            </select>
            {/* ... existing select for car type */}
          </div>{" "}
          <div className="form-group">
            <i className="fa fa-car icon"></i>
            <label>Select Vehicle</label>
            <select
              value={car}
              onChange={(event) => setCar(event.target.value)}
            >
              <option value="">Select Vehicle</option>
              <option value="BMW">BMW</option>
              <option value="Merceds">Mercedes</option>
            </select>
            {/* ... existing select for car type */}
          </div>
        </section>
        <section className="bottom-widget">
          <div className="form-group">
            <i className="fa fa-map-marker icon"></i>
            <label>Pickup Location</label>
            <select
              value={pickupLocation}
              onChange={(event) => setPickupLocation(event.target.value)}
            >
              <option value="">Select PickUp Location</option>
              <option value="karen">karen</option>
              <option value="lavington">lavington</option>
              <option value="CBD">CBD</option>
            </select>
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
          <div className="form-group">
            <i className="fa fa-map-marker icon"></i>
            <label>Drop Off Location</label>
            <select
              value={returnLocation}
              onChange={(event) => setReturnLocation(event.target.value)}
            >
              <option value="">Select DropOff Location</option>
              <option value="karen">karen</option>
              <option value="lavington">lavington</option>
              <option value="CBD">CBD</option>
            </select>
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
          >
            <ChevronRight sx={{ color: "#fff" }} />
          </Avatar>
        </section>
      </div>
    </React.Fragment>
  );
}

export default ReservationWidget;
