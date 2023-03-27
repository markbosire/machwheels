import { Rating } from "@mui/material";
import React from "react";
import "./carCard.css";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { AttachMoney } from "@mui/icons-material";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car, user }) => {
  const navigate = useNavigate();
  var averageRating;
  var priceLevel;
  var tag;
  function Checkout() {     
      navigate("/checkout", { state: { car: car, user: user } });  
  }
  if (car.rating === "good") {
    averageRating = 5;
  }
  priceLevel = car.price > 7500 ? "Luxury" : "Economy";
  tag =
    car.price > 7500
      ? "./assets/images/gold.png"
      : "./assets/images/silver.png";
  return (
    <div className="car-card" onClick={Checkout}>
      <div
        className="car-image"
        style={{ backgroundImage: `url(${car.image})` }}
      >
        <img src={tag} alt={car.title} className="circular-banner" />
      </div>
      <div className="car-info">
        <div className="name-rating">
          <strong>{car.title}</strong>
          <div className="rating-container">
            <Rating
              value={averageRating}
              sx={{
                color: "#F75F86",
                fontSize: "14px",
              }}
              precision={0.5}
              readOnly
            />
            <span className="rating">
              <strong> {averageRating} /5 </strong>
            </span>
          </div>
        </div>
        <div className="description">
          <div className="row1">
            <div>
              <GroupsIcon sx={{ fontsize: "5px", marginRight: "3px" }} />
              {car.seats} people
            </div>
            <div>
              <AttachMoney sx={{ fontsize: "5px", marginRight: "3px" }} />
              {priceLevel}
            </div>
          </div>
          <div className="row2">
            <div>
              <DirectionsCarIcon sx={{ fontsize: "5px", marginRight: "3px" }} />
              {"sedan"}
            </div>
            <div>
              <SettingsIcon sx={{ fontsize: "5px", marginRight: "3px" }} />
              {car.gear}
            </div>
          </div>
        </div>
        <div className="price">
          <strong>KES{car.price}</strong>/day
        </div>
      </div>
    </div>
  );
};

export default CarCard;
