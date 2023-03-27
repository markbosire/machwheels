import React from "react";
import "./subscribe.css";

const Subscribe = () => {
  return (
    <div className="container">
      <img src="./assets/images/3.jpeg" alt="img" className="image-div"></img>
      <div className="content-div">
        <div className="section tile">
          <p>
            Subscribe for <strong>exclusive deals and offers!</strong>
          </p>
        </div>
        <div className="section desc">
          <p>Enter your email to receive our latest news and promotions:</p>
        </div>
        <div className="section email">
          <input type="email" placeholder="Email" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
};
export default Subscribe;
