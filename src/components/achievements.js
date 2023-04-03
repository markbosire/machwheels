import "./achievements.css";
import React from "react";
import { Check } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import BlurredBackgroundComponent from "./bluredBackgroundComponent";

function Achievements() {
  return (
    <React.Fragment>
      <div className="achievements">
        <section className="image">
          <img src="./assets/images/2.png" alt="kenya" />
        </section>
        <section className="paragraph">
          <p className="paragraphh1">
            You Will Not Regret
            <strong> Your Choice</strong>
          </p>
          <p className="paragraphp">
            With our focus on providing the utmost comfort to our customers, you
            can sit back, unwind, and enjoy the journey. From the plush seats to
            the advanced suspension systems, our cars are designed to make your
            ride as comfortable as possible. Selecting the best car rental deals
            has never been easier. Our company offers a variety of options to
            fit your budget and travel needs. Booking your car rental has never
            been easier. With our streamlined online booking process, you can
            reserve your vehicle in just a few clicks.
          </p>
          <div className="rows">
            <section>
              <Avatar
                sx={{ bgcolor: "#Ffecf9", width: "24px", height: "24px" }}
              >
                <Check
                  sx={{
                    color: "#F75F86",
                    fontSize: "15px",
                  }}
                />
              </Avatar>
              <p className="pp1">Faster Booking</p>
              <Avatar
                sx={{ bgcolor: "#Ffecf9", width: "24px", height: "24px" }}
              >
                <Check
                  sx={{
                    color: "#F75F86",
                    fontSize: "15px",
                  }}
                />
              </Avatar>
              <p>24/7 support</p>
            </section>
            <section>
              <Avatar
                sx={{ bgcolor: "#Ffecf9", width: "24px", height: "24px" }}
              >
                <Check
                  sx={{
                    color: "#F75F86",
                    fontSize: "15px",
                  }}
                />
              </Avatar>
              <p className="pp2">Various Payment Options</p>
              <Avatar
                sx={{ bgcolor: "#Ffecf9", width: "24px", height: "24px" }}
              >
                <Check
                  sx={{
                    color: "#F75F86",
                    fontSize: "15px",
                  }}
                />
              </Avatar>
              <p>No hidden Charges</p>
            </section>
            <section>
              <Avatar
                sx={{ bgcolor: "#Ffecf9", width: "24px", height: "24px" }}
              >
                <Check
                  sx={{
                    color: "#F75F86",
                    fontSize: "15px",
                  }}
                />
              </Avatar>
              <p>100% satisfaction</p>
            </section>
          </div>
        </section>
        <div
          className="blurred"
          style={{
            zIndex: 2,
            position: "absolute",
            top: "257rem",
            left: "45rem",

            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <BlurredBackgroundComponent text1="500" text2="+" text3="locations" />
          <BlurredBackgroundComponent text1="1" text2="k+" text3="vehicles" />
          <BlurredBackgroundComponent
            text1="24"
            text2="hr"
            text3="customer service"
          />
          <BlurredBackgroundComponent
            text1="100"
            text2="%"
            text3="serviced vehicles"
          />
        </div>
      </div>
    </React.Fragment>
  );
}
export default Achievements;
