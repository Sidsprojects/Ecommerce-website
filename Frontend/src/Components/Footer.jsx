import React from "react";
import "./Footer.css";
import insta from "../assets/insta.svg";
import facebook from "../assets/facebook.svg";
import youtube from "../assets/youtube.svg";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <div className="cols">
          <div className="col">
            <h3>Help</h3>
            <a href="">Faq</a>
            <a href="">Info</a>
            <a href="">orders</a>
            <a href="">Contact</a>
          </div>
          <div className="col">
            <h3>My account</h3>
            <a href="">login</a>
            <a href="">register</a> 
          </div>
        </div>
      </div>

      <div className="midFooter">
        <h1>Armentia</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; Armentia</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <div className="icons">
        <a href="https://www.instagram.com/armentiaofficial/">
          <img src={insta} alt="insta" />
        </a>
        <a href="http://youtube.com/armentia">
          <img src={youtube} alt="youtube" />
        </a>
        <a href="http://instagram.com/armentia">
          <img src={facebook} alt="facebook" />
        </a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
