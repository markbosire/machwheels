import React from "react";
import "./locations.css";

function Locations() {
  return (
    <React.Fragment>
      <div className="locations">
        <div className="loct-sect">
          <section className="images">
            <img src="./assets/images/kenya.png" alt="kenya" />
          </section>
          <section className="paragraph">
            <p>
              <strong>Largest Car Rental service in Kenya</strong> with
              locations in every city and 24hr customer service
            </p>
            <div className="btn-graad">
              <span>FIND NEAREST LOCATION</span>
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Locations;
