import "./navbar.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../assets/images/logo.png";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { useNavigate } from "react-router-dom";

import { Avatar } from "@mui/material";

function Navbar({ user }) {
  const navigate = useNavigate();
  function SignIn() {
    navigate({
      pathname: "/signIn",
    });
  }
  function SignOut(){
    user=null;
  }
    
  function Dashboard() {
    navigate("/dashboard", { state: { user: user } });
  }
  return (
    <div className="navbar">
      <div className="section1">
        <img src={logo} alt="logo" className="img" />
        <p>about</p>
        <p>contact</p>
        <p>reviews</p>
      </div>

      <div className="section2">
        <div className="avadiv">
          <Avatar className="avatar m" sx={{ bgcolor: "#fff" }}>
            <LocalPhoneIcon className="phone m" />
          </Avatar>
          <span></span>
          <p> +254-7935-216-90</p>
        </div>
        <div className="btn-grad m" onClick={Dashboard}>
          <span>EXPLORE VEHICLES</span>
        </div>
        <div className="m">
          <PersonIcon />{" "}
          {user ? (
            <span onClick={SignOut}>{user.name}</span>
          ) : (
            <span onClick={SignIn}>Log In</span>
          )}
        </div>
        <span className="span"></span>
        <SignalCellularAltIcon className="menu" />
      </div>
    </div>
  );
}
export default Navbar;
