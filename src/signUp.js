import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const response = await fetch(
      "https://car-rentals-backend.vercel.app/api/v1/user/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email, password }),
      }
    );

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      navigate({
        pathname: "/home",
        state: { name: username },
      });
    } else {
      // Handle error
    }
  };

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
            <h2>Create MachWheels Account</h2>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className="button">
              Create Account
            </button>
            <div className="logintag">
              <span>Already have an account?</span>
              <span className="signuplink">Sign In</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
