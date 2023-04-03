import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Avatar } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import "./dashboard.css";

import { Person } from "@mui/icons-material";
import "./dashnavbar.css";
import logo from "../assets/images/logoimg.png";
import { AppBar, Toolbar } from "@mui/material";

import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";

function Rentals() {
  const navigate = useNavigate();
  const DashNavbar = ({ user }) => {
    return (
      <div className="dash">
        <AppBar position="static">
          <Toolbar className="toolbar">
            <div
              className="m"
              onClick={() => navigate("/home", { state: { user: user } })}
            >
              <ChevronLeftIcon />
              <img src={logo} alt="Logo" className="logo" />{" "}
              <span className="logoTitle">MachWheels</span>{" "}
            </div>

            <div className="m">
              <Person className="pan" />{" "}
              {user ? <span>{user.name}</span> : <span>Log In</span>}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  };
  const RentalListItem = ({
    rental,
    name,
    pickUp,
    pickUpDateAndTime,
    dropOff,
    dropOffDateAndTime,
    createdAt,
  }) => {
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar src={rental.car[0].image} alt={rental.car[0].title} />
        </ListItemAvatar>
        <ListItemText
          primary={rental.car[0].title}
          secondary={`Picked up by ${name} on ${new Date(
            pickUpDateAndTime
          ).toLocaleString()} from ${pickUp}. Dropped off on ${new Date(
            dropOffDateAndTime
          ).toLocaleString()} at ${dropOff}. Created on ${new Date(
            createdAt
          ).toLocaleString()}`}
        />
      </ListItem>
    );
  };

  const location = useLocation();

  const user = location.state?.user || null;

  const [rentals, setRentals] = useState([]);
  useEffect(() => {
    fetch("https://car-rentals-backend.vercel.app/api/v1/order", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setRentals(data))
      .catch((error) => console.error(error));
  }, [user]);
  return (
    <React.Fragment>
      <DashNavbar user={user} />
      <div className="rentals">
        <h1>Your Rentals</h1>
        {rentals.map((rental) => (
          <RentalListItem
            key={rental.car.title}
            rental={rental}
            name={rental.name}
            pickUp={rental.pickUp}
            pickUpDateAndTime={rental.pickUpDateAndTime}
            dropOff={rental.dropOff}
            dropOffDateAndTime={rental.dropOffDateAndTime}
            createdAt={rental.createdAt}
          />
        ))}
      </div>
    </React.Fragment>
  );
}
export default Rentals;
