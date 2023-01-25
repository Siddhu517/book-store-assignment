import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-dark bg-opacity-75 text-light d-flex justify-content-between align-items-center ">
      <div className="d-flex justify-content-center align-items-center">
        <Link to="/" className="nav-link fs-2 p-3 fw-bold">
          Book Store
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
