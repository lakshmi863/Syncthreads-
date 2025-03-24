import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Logo Image instead of Dashboard text */}
      <img
        src="https://media.licdn.com/dms/image/v2/C510BAQHC4BeBy10nUw/company-logo_200_200/company-logo_200_200/0/1630614193199/syncthreads_computing_logo?e=2147483647&v=beta&t=FBU8oS8O1M6oDZxe8eufYEvpPuDjoDoxt1s3aNrZDKI"
        alt="Company Logo"
        className="navbar-logo"
      />
      
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/map">Map View</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
