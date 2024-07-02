import React from "react";
import videoBg from "../assets/Video/banner-recording.mp4";
import "./Hero.css";
const Hero = () => {
  return (
    <div className="Hero">
      <video src={videoBg} autoPlay muted loop />
      <div className="overlay-content">
        <div className="content">
          <h1>New month, New drops</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. In,
            tempora!
          </p>
        <button className="btn">Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
