import "./index.css";
import Banner from "./components/banner";
import Navbar from "./components/navbar";
import React from "react";
import { useState, useRef } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import ReservationWidget from "./components/reservationWidget";
import MidSection from "./components/midSection";
import LowerMidSection from "./components/lowermidsection";
import Locations from "./components/locations";
import Achievements from "./components/achievements";
import FAQ from "./components/FAQ";
import Subscribe from "./components/subscribe";
import faqData from "./FAQ.json";
import { useLocation, useNavigate } from "react-router-dom";
import { BookmarkAddRounded, Person2 } from "@mui/icons-material";

function Home() {
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const navigate = useNavigate();
  function aboutScroll() {
    aboutRef.current.scrollIntoView();
  }
  function contactScroll() {
    contactRef.current.scrollIntoView();
  }
  function logout() {
    navigate({
      pathname: "/signIn",
    });
  }
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const location = useLocation();
  function rentals() {
    navigate("/rentals", { state: { user: user } });
  }
  const user = location.state?.user || null;
  console.log(location);

  return (
    <React.Fragment>
      <div className="nav">
        <Navbar
          user={user}
          sidebar={toggleDrawer}
          aboutScroll={aboutScroll}
          contactScroll={contactScroll}
        />
      </div>
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer}>
        <List>
          <ListItem onClick={rentals}>
            <ListItemIcon>
              <BookmarkAddRounded />
            </ListItemIcon>
            <ListItemText primary="Rentals" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BookmarkAddRounded />
            </ListItemIcon>
            <ListItemText primary="About Us" onClick={aboutScroll} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Person2 />
            </ListItemIcon>
            <ListItemText primary="Contact" onClick={contactScroll} />
          </ListItem>
          <ListItem onClick={logout}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </Drawer>

      <Banner />

      <ReservationWidget className="rw" user={user} />
      <MidSection user={user} />
      <LowerMidSection aboutRef={aboutRef} />
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
      <Subscribe contactRef={contactRef} />
    </React.Fragment>
  );
}
export default Home;
