import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Alert } from "@mui/material";

const SignUp = () => {
  const [isClicked, setIsClicked] = React.useState(false);
  const handleReservationClick = () => {
    setIsClicked(true);
  };
  function toggle() {
    setPasswordtoggle(!passwordtoggle);
  }
  function toggleb() {
    setConfirmPasswordtg(!confirmpasswordtg);
  }

  const [success, setSuccess] = useState(false);
  const { errorCheck, setErrorCheck } = useState(false);
  const [passwordtoggle, setPasswordtoggle] = useState(false);
  let [responsestatus, setResponsestatus] = useState(0);
  const navigate = useNavigate();
  const [error, setError] = useState(" Check Credentials");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpasswordtg, setConfirmPasswordtg] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    fetch("https://car-rentals-backend.vercel.app/api/v1/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: username, email, password }),
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
          setError("User already exists");
        }

        setErrorCheck(true);
      });
  };
  function SignIn() {
    navigate({
      pathname: "/signin",
    });
  }

  return (
    <div className="signUp">
      <ToastContainer />
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
            className="logo up"
          />

          <form onSubmit={handleSubmit}>
            <h2 className="up2">Create MachWheels Account</h2>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-group" id="password">
              <input
                type={confirmpasswordtg ? "text" : "password"}
                className="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmpasswordtg ? (
                <VisibilityOff onClick={toggleb} sx={{ fontSize: "14px" }} />
              ) : (
                <Visibility onClick={toggleb} sx={{ fontSize: "14px" }} />
              )}
            </div>
            <button
              type="submit"
              className="button"
              onClick={handleReservationClick}
            >
              Create Account
            </button>
            <div className="logintag">
              <span>Already have an account?</span>
              <span className="signuplink" onClick={SignIn}>
                Sign In
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

export default SignUp;
