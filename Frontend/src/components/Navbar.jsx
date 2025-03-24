import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate(); // ✅ Get navigate function

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // ✅ Remove token
    navigate("/login"); // ✅ Redirect to login
  };

  return (
    <nav className="navbar">
      <h2>Dashboard</h2>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/map">Map View</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
