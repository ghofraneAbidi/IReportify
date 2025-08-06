import React from 'react';
import { Link } from 'react-router-dom'; // Import de Link
import './Navbar.css';
import logo from '../assets/logo.png'; // Assure-toi que le chemin est correct

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src={logo} alt="TAC-TIC Logo" className="logo" />
        <ul className="nav-links">
          <li><a href="#">TAC–TIC</a></li>
          <li><a href="#">SERVICES</a></li>
          <li><a href="#">ACTUALITÉS</a></li>
          <li><a href="#">REJOIGNEZ NOUS</a></li>
          <li><a href="#">CONTACT</a></li>
          <li>
            <Link to="/reporter" className="reporter-link">
              Tac-Tic Reporter
            </Link>
          </li>
        </ul>
        <div className="search-box">
          <input type="text" placeholder="Rechercher..." />
          <span className="search-icon">🔍</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
