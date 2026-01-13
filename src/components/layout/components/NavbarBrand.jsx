// src/components/common/NavbarBrand.jsx
import React from "react";
import { Link } from "react-router-dom";

const NavbarBrand = ({ isScrolled = false, brandName = "ShopHub" }) => (
  <Link to="/" className="flex items-center group flex-shrink-0">
    <div className={`relative ${isScrolled ? "text-blue-600" : "text-white"}`}>
      <span
        className={`text-3xl font-black transition-all duration-300 ${
          isScrolled
            ? "bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent"
            : "text-white"
        }`}
      >
        {brandName}
      </span>
      <span
        className={`absolute -top-2 -right-8 text-xl opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-all duration-500 ${
          isScrolled ? "text-yellow-500" : "text-yellow-300"
        }`}
      >
        ✨
      </span>
    </div>
  </Link>
);

export default NavbarBrand;
