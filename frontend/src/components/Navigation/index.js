import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./index.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const currentPath = useLocation().pathname;

  const isActive = (path) => path === currentPath;

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li>
          <NavLink to="/gallery">
            <button
              className={`nav-btn ${isActive("/gallery") ? "active" : ""}`}
            >
              Gallery
            </button>
          </NavLink>
          <NavLink to="/models">
            <button
              className={`nav-btn ${isActive("/models") ? "active" : ""}`}
            >
              Models
            </button>
          </NavLink>
          <NavLink to="/orders">
            <button
              className={`nav-btn ${isActive("/orders") ? "active" : ""}`}
            >
              Orders
            </button>
          </NavLink>
          <NavLink to="/cart">
            <button className={`nav-btn ${isActive("/cart") ? "active" : ""}`}>
            <i class='bx bx-cart'></i>
              Cart
            </button>
          </NavLink>
        </li>
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <li>
        <NavLink to="/login">
          <button className="auth-btn">Log In</button>
        </NavLink>
        <NavLink to="/signup">
          <button className="auth-btn signup">Sign Up</button>
        </NavLink>
      </li>
    );
  }

  return (
    <ul id="nav">
        <NavLink exact to="/" className={`home-btn ${isActive("/") ? "active" : ""}`}>
          Home
        </NavLink>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
