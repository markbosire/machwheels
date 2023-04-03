import React from "react";

import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import "./dashnavbar.css";
import logo from "../assets/images/logoimg.png";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
} from "@mui/material";

const DashNavbar = () => {
  return (
    <div className="dash">
      <AppBar position="static">
        <Toolbar className="toolbar">
          <Typography variant="h6" className="title">
            <img src={logo} alt="Logo" className="logo" />
          </Typography>
          <div className="searchbar">
            <div className="searchbar-icon">
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              fullWidth
            />
          </div>
          <IconButton color="inherit" aria-label="account">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default DashNavbar;
