import React from "react";
import { Link } from "react-router-dom";
import fingerlogo from "../../pages/images/finger.png";

const NavbarLogo = () => {
  return (
    <div className="logo-wrapper">
      <Link to="/">
        <img src={fingerlogo} alt="" />
      </Link>
    </div>
  );
};

export default NavbarLogo;
