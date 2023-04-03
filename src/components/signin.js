import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import "./signUp.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignIn = () => {
  const [isClicked, setIsClicked] = React.useState(false);
  const handleReservationClick = () => {
    setIsClicked(true);
  };
  const [passwordtoggle, setPasswordtoggle] = useState(false);
  const [success, setSuccess] = useState(false);
  const { errorCheck, setErrorCheck } = useState(false);

  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [error, setError] = useState(" Check Credentials");

  function toggle() {
    setPasswordtoggle(!passwordtoggle);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch("https://car-rentals-backend.vercel.app/api/v1/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccess(true);
        navigate("/home", { state: { user: data } });
      })
      .catch((error) => {
        console.log(error);
        let errorText = `Error ${error}`;

        if (errorText.toLowerCase().includes("user")) {
          setError("User does not exist");
        }

        setErrorCheck(true);
      });
  };
  function SignUp() {
    navigate({
      pathname: "/signUp",
    });
  }
  return (
    <div className="signUp">
      <div className="contain">
        <div className="left">
          <div className="gradient-container">
            <p>
              Instantly get a car for a roadtrip with your friends and family
            </p>
          </div>
        </div>
        <div className="right">
          <img
            src="./assets/images/logoimg.png"
            alt="Your Logo"
            className="logo"
          />

          <form onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <div className="input-group" id="password">
              <input
                type={passwordtoggle ? "text" : "password"}
                className="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordtoggle ? (
                <VisibilityOff onClick={toggle} sx={{ fontSize: "14px" }} />
              ) : (
                <Visibility onClick={toggle} sx={{ fontSize: "14px" }} />
              )}
            </div>

            <button
              type="submit"
              className="button"
              onClick={handleReservationClick}
            >
              Sign In
            </button>
            <div className="logintag">
              <span>New to MachWheels?</span>
              <span className="signuplink" onClick={SignUp}>
                Sign Up
              </span>
            </div>
          </form>
          {success && (
            <Alert severity="success">"You signed in successfully"</Alert>
          )}
          {errorCheck && <Alert severity="error">error</Alert>}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
