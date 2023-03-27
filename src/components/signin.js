import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signUp.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://car-rentals-backend.vercel.app/api/v1/user/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, password }),
      }
    );

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      navigate("/home", { state: { user: data } });
    } else {
    }
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
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="button">
              Sign In
            </button>
            <div className="logintag">
              <span>New to MachWheels?</span>
              <span className="signuplink" onClick={SignUp}>
                Sign Up
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
