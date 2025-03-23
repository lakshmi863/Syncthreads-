import React from "react";
import { Link } from "react-router-dom";
import "../components/styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Dashboard</h2>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/map">Map View</Link>
        <button onClick={() => localStorage.removeItem("token")}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
