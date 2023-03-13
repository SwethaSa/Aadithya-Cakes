import React from "react";
import gif from "../assets/Preloader.gif";
import '../Css/HomePage.css'

const Preloader = () => {
  return (
    <div className="preloader">
      <img src={gif} alt="Loading..." />
    </div>
  );
};

export default Preloader;
