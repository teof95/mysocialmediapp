import React from "react";
import hatebook from "../pages/images/hatebook-words.jpg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="landing-wrapper">
      <div className="text-wrapper">
        <div className="text-header-wrapper">
          <p className="text-header font__p p__size">Welcome to</p>
          <Link to="/"> <span>Hatebook! </span></Link>
        </div>

        <div className="text-section font__p p__size">
          
          <br />
          Because everyone loves to hate
          <ul>
            <li>Do you hate your Job?</li>
            <li>Do you hate the Weather?</li>
            <li>Do you hate your Flatmates?</li>
            <li>Do you hate your Schoolmates?</li>
          </ul>
          <div className="text-button-wrapper">
            <Link to="/register">Register</Link> or <Link to="/Login">Login</Link>and give some  <span>Hate! </span>
          </div>
        </div>
      </div>
      <div className="image-wrapper">
        <img src={hatebook} className="landing-image" alt=""  />

      </div>
    </div>
  );
};

export default HomePage;
