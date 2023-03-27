import React from "react";
import { ChevronRight } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import "./lowermidsection.css";
function LowerMidSection() {
  return (
    <React.Fragment>
      <div className="sectionRow">
        <div className="sect1 baseline-aligned">
          <h1>
            We are <strong>Machwheels</strong>
          </h1>
          <p>
            <strong>You start the engine and your adventure begins</strong>
          </p>
        </div>
        <div className="sect2 baseline-aligned">
          <p>
            Are you looking for a convenient and affordable way to rent a car?
            Whether you need a vehicle for business, leisure or any other
            occasion, you can find the right car rental service with Machwheels
            . Enterprise offers a wide range of vehicles, from compact cars to
            luxury cars, SUVs to minivans. Our selection of premium vehicles is
            meticulously maintained and inspected to ensure that you can drive
            with confidence. With our commitment to quality and reliability, you
            can rest assured that your rental car will exceed your expectations.
          </p>
          <section>
            <span>
              <strong>Find more about us</strong>
            </span>
            <Avatar
              sx={{
                background: "linear-gradient(to right, #F518E3, #FBAE24)",
                marginLeft: "20px",
                width: "20px",
                height: "20px",
              }}
            >
              <ChevronRight sx={{ color: "#fff" }} />
            </Avatar>
          </section>
        </div>
        <div className="sect3">
          <img src="./assets/images/1.jpg" alt="img" />
        </div>
      </div>
    </React.Fragment>
  );
}
export default LowerMidSection;
