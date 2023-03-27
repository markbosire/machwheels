import "./index.css";
import Banner from "./components/banner";
import Navbar from "./components/navbar";
import React from "react";

import ReservationWidget from "./components/reservationWidget";
import MidSection from "./components/midSection";
import LowerMidSection from "./components/lowermidsection";
import Locations from "./components/locations";
import Achievements from "./components/achievements";
import FAQ from "./components/FAQ";
import Subscribe from "./components/subscribe";
import faqData from "./FAQ.json";
import { useLocation } from "react-router-dom";
function Home() {
  const location = useLocation();
  const user = location.state?.user || null;
  console.log(location);
  return (
    <React.Fragment>
      <div className="nav">
        <Navbar user={user} />
      </div>

      <Banner />

      <ReservationWidget className="rw" />
      <MidSection user={user} />
      <LowerMidSection />
      <Locations />
      <Achievements />
      <div className="faq">
        <div>
          <p>
            Frequently <strong>Asked Questions</strong>
          </p>
          <img src="./assets/images/juke.png" alt="faq" />
        </div>
        <FAQ faqs={faqData.faqs} />
      </div>
      <Subscribe />
    </React.Fragment>
  );
}
export default Home;
