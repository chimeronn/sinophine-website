import React, {useState} from "react";
import "./css/Navbar.css"; // Move the CSS styles into this file
import logo from "/sinophine.jpg"; // If not using public/

const Navbar = ({setSearchQuery}) => {
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <nav id="bar">
      <div id="home-icons">
        <ul className="bar">
          <li>
            <a href="/">
              <img id="icon" src={logo} alt="Logo" />
            </a>
          </li>
          <li>
            <a href="/">Sinophine</a>
          </li>
        </ul>
      </div>

      <div id="home-button">
        <a id="home-link" href="/">Home</a>
        <a id="playlist-link" href="/playlist">My Playlists</a>
      </div>

      <div id="searchbar-parent">
        <div id="searchbar-container">
          <div className="input-group search p-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
              id="searchbar"
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
            />
            <button className="btn btn-dark" type="button">
              🔍
            </button>
          </div>
        </div>
      </div>

      <div id="Login">
        <a id="login-link" href="/login">Login</a>
      </div>
    </nav>
  );
};

export default Navbar;