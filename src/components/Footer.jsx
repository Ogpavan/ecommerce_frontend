import React from "react";
import logo from "../assets/insiderStats.png";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-y-7 pt-20 pb-10 justify-between">
        <div className="  md:w-1/2">
          <img src={logo} alt="logo" className="w-28" />
          <p className="text-sm pt-4 text-gray-600 outfit-light ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            quibusdam architecto voluptate ducimus corrupti? Omnis quis
            voluptatibus animi ipsam commodi sequi repudiandae quas. Illum
            officiis consequatur tempore consectetur pariatur nostrum.
          </p>
        </div>

        <div className="flex flex-col gap-y-2 outfit-light">
          <h1 className="outfit-bold text-gray-600 uppercase">company</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/collection">Collection</NavLink>
          <NavLink to="/cart">Cart</NavLink>
        </div>

        <div className="outfit-light">
          <h1 className="outfit-bold text-gray-600 uppercase mb-3">
            GET in touch
          </h1>
          <p>+91 7302667115</p>
          <p>connect.pawan69@gmail.com</p>
        </div>
      </div>
      <h1 className="text-center text-sm">Copyright © 2023 Insider Stats</h1>
    </div>
  );
}

export default Footer;
