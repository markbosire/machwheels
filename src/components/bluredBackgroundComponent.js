import React from "react";
import "./bgc.css";

function BlurredBackgroundComponent(props) {
  return (
    <div className="modal">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px 25px",
        }}
      >
        <div
          style={{
            display: "flex",
            margin: "0",
          }}
        >
          <p style={{ fontSize: "40px", margin: "0 5px" }}>
            <strong>{props.text1}</strong>
          </p>
          <p style={{ fontSize: "40px", margin: 0 }}>{props.text2}</p>
        </div>
        <div style={{ fontSize: "16px", margin: "10px 5px" }}>
          {props.text3}
        </div>
      </div>
    </div>
  );
}
export default BlurredBackgroundComponent;
