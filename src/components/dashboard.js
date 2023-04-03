import { useState, useEffect, useRef } from "react";
import CarCard from "./carCard";
import { Avatar } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import "./dashboard.css";
import React from "react";
import { Alert, AlertTitle } from "@mui/material";

import { Search as SearchIcon, Person } from "@mui/icons-material";
import "./dashnavbar.css";
import logo from "../assets/images/logoimg.png";
import { AppBar, Toolbar, InputBase } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Checkout from "./checkout";

const Dashboard = () => {
  const inputEl = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const DashNavbar = ({ user }) => {
    return (
      <div className="dash">
        <AppBar position="static">
          <Toolbar className="toolbar">
            <div
              className="m"
              onClick={() => navigate("/home", { state: { user: user } })}
            >
              {" "}
              <img src={logo} alt="Logo" className="logo" />{" "}
              <span className="logoTitle">MachWheels</span>{" "}
            </div>
            <div className="m long">
              <div className="searchbar">
                <div className="searchbar-icon">
                  <SearchIcon />
                </div>
                <InputBase
                  key="search-input"
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  fullWidth
                  inputRef={inputEl}
                />
                {isClicked && !user && (
                  <Alert severity="warning">
                    <AlertTitle>Please Log In</AlertTitle>
                    You need to be logged in to Checkout.
                  </Alert>
                )}
              </div>
              <div
                className="btn-grad"
                onClick={() => {
                  setCurrentPage(1);
                  setSearchQuery(inputEl?.current?.value);
                }}
              >
                <span>Search</span>
              </div>
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
  const location = useLocation();
  const user = location.state?.user || null;
  console.log(location);

  const [currentPage, setCurrentPage] = useState(1);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    passengers: "",
    carType: "",
    gearType: "",
  });

  const buttonStyle = {
    bgcolor: "#000",
    margin: "0 10px",
    // adjust the padding as needed
  };

  useEffect(() => {
    fetch("https://car-rentals-backend.vercel.app/api/v1/car/all")
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
        setFilteredCars(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    let tempFilteredCars = cars;
    switch (filters.passengers) {
      case "1-2":
        tempFilteredCars = tempFilteredCars.filter((car) => car.seats <= 2);
        break;
      case "3-4":
        tempFilteredCars = tempFilteredCars.filter(
          (car) => car.seats >= 3 && car.seats <= 4
        );
        break;
      case "5-6":
        tempFilteredCars = tempFilteredCars.filter(
          (car) => car.seats >= 5 && car.seats <= 6
        );
        break;
      case "6+":
        tempFilteredCars = tempFilteredCars.filter((car) => car.seats > 6);
        break;
      default:
        break;
    }

    switch (filters.carType) {
      case "Economy":
        tempFilteredCars = tempFilteredCars.filter((car) => car.price < 7500);
        break;
      case "Luxury":
        tempFilteredCars = tempFilteredCars.filter((car) => car.price > 7500);
        break;
      default:
        break;
    }
    switch (filters.gearType) {
      case "Manual":
        tempFilteredCars = tempFilteredCars.filter(
          (car) => car.gear === "Manual"
        );
        break;
      case "Automatic":
        tempFilteredCars = tempFilteredCars.filter(
          (car) => car.gear === "Automatic"
        );
        break;
      default:
        break;
    }

    const searchfilteredCars = tempFilteredCars.filter((car) =>
      car.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(searchfilteredCars);
    if (searchQuery.length > 1) {
      setFilteredCars(searchfilteredCars);
    } else {
      setFilteredCars(tempFilteredCars);
    }
  }, [filters, cars, searchQuery]);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (newPage > totalPages) {
      setCurrentPage(newPage - 1);
    }
    if (newPage < 1) {
      setCurrentPage(1);
    }
  };
  const maxCarsPerPage = 24;
  const totalPages = Math.ceil(filteredCars.length / maxCarsPerPage);
  const carsToDisplay = filteredCars.slice(
    (currentPage - 1) * maxCarsPerPage,
    currentPage * maxCarsPerPage
  );

  const handleRadioButtonChange = (event) => {
    setCurrentPage(1);
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",

    boxShadow: 24,
    p: 4,
  };
  const [carID, setCarID] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const [isClicked, setIsClicked] = React.useState(false);
  const handleReservationClick = () => {
    if (!user) {
      setIsClicked(true);
      console.log("yu");
    } else {
      // handle reservation logic for logged in user
    }
  };

  return (
    <div className="dashboardnav">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Checkout user={user} car_id={carID} close={handleClose} />
        </Box>
      </Modal>
      <DashNavbar user={user} />
      <div className="dashboard">
        <div className="filters">
          <div className="passengers">
            <div>
              <h1>Passengers</h1>
              <label>
                <input
                  type="radio"
                  name="passengers"
                  value=""
                  checked={filters.passengers === ""}
                  onChange={handleRadioButtonChange}
                />
                All
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="passengers"
                  value="1-2"
                  checked={filters.passengers === "1-2"}
                  onChange={handleRadioButtonChange}
                />
                1-2 passengers
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="passengers"
                  value="3-4"
                  checked={filters.passengers === "3-4"}
                  onChange={handleRadioButtonChange}
                />
                3-4 passengers
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="passengers"
                  value="5-6"
                  checked={filters.passengers === "5-6"}
                  onChange={handleRadioButtonChange}
                />
                5-6 passengers
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="passengers"
                  value="6+"
                  checked={filters.passengers === "6+"}
                  onChange={handleRadioButtonChange}
                />
                6+ passengers
              </label>
            </div>
          </div>
          <div className="prices">
            <div>
              <h1>Price Level</h1>
              <label>
                <input
                  type="radio"
                  name="carType"
                  value=""
                  checked={filters.carType === ""}
                  onChange={handleRadioButtonChange}
                />
                All
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="carType"
                  value="Economy"
                  checked={filters.carType === "Economy"}
                  onChange={handleRadioButtonChange}
                />
                Economy
              </label>
              <label>
                <input
                  type="radio"
                  name="carType"
                  value="Luxury"
                  checked={filters.carType === "Luxury"}
                  onChange={handleRadioButtonChange}
                />
                Luxury
              </label>
            </div>
          </div>
          <div className="gear-type">
            <div>
              <h1>Gear Type</h1>
              <label>
                <input
                  type="radio"
                  name="gearType"
                  value=""
                  checked={filters.gearType === ""}
                  onChange={handleRadioButtonChange}
                />
                All
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="gearType"
                  value="Manual"
                  checked={filters.gearType === "Manual"}
                  onChange={handleRadioButtonChange}
                />
                Manual
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="gearType"
                  value="Automatic"
                  checked={filters.gearType === "Automatic"}
                  onChange={handleRadioButtonChange}
                />
                Automatic
              </label>
            </div>
          </div>
        </div>

        <div className="car-cards">
          {carsToDisplay.length > 0 ? (
            carsToDisplay.map((car, index) => (
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
            ))
          ) : (
            <div>No cars found matching the selected filters</div>
          )}
          <div className="pagination">
            <Avatar
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              sx={buttonStyle}
            >
              <ChevronLeftIcon />
            </Avatar>
            <span>
              {currentPage}/{totalPages}
            </span>
            <Avatar
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              sx={buttonStyle}
            >
              <ChevronRightIcon />
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
