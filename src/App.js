import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/signUp";
import SignIn from "./components/signin";
import Dashboard from "./components/dashboard";
import Checkout from "./components/checkout";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
