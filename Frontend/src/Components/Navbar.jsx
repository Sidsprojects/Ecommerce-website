import { React, useState } from "react";
import "./Navbar.css";
import Cart from "../assets/Cart.svg";
import Profile from "../assets/Profile.svg";
import Search from "../assets/Search.svg";

const Navbar = () => {
  const [productDisplay, setproductDisplay] = useState(false);
  const [homeunderlineDisplay, sethomeunderlineDisplay] = useState(false);
  const [productunderlineDisplay, setproductunderlineDisplay] = useState(false);
  return (
    <>
      <div className="Navbar">
        <div className="complete-logo">
          <img
            src="../src/assets/white-logo1.png"
            alt="armentia-logo"
            width={60}
            height={45}
          />
        </div>
        <ul>
          <div>
            <li
              onMouseEnter={() => {
                sethomeunderlineDisplay(true);
              }}
              onMouseLeave={() => {
                sethomeunderlineDisplay(false);
              }}
            >
              Home
            </li>
            <span
              style={{
                transform: homeunderlineDisplay ? "scaleX(1)" : "scaleX(0)",
              }}
              className="Underline"
            />
          </div>
          <div>
            <li
              onMouseEnter={() => {
                setproductunderlineDisplay(true);
              }}
              onClick={() => {
                setproductDisplay(!productDisplay);
              }}
              onMouseLeave={() => {
                setproductunderlineDisplay(false);
              }}
            >
              <a href="#container" style={{textDecoration: "none",color:"white"}}>Products</a>
            </li>
            <span
              style={{
                transform: productunderlineDisplay ? "scaleX(1)" : "scaleX(0)",
              }}
              className="Underline-products"
            />
          </div>
        </ul>
        <div className="interactions">
          <img src={Search} alt="search" />
          <input type="text" placeholder="Enter the product" />
          <img src={Cart} alt="cart" />
          <img src={Profile} alt="profile" />
        </div>
      </div>
      <div
        className="products-display"
        style={{
          transform: productDisplay ? "translateY(15%)" : "translateY(-100%)",
        }}
      >
        <h1>Products:-</h1>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
          <li>Item 5</li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
