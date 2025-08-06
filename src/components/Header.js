import React from 'react';
// Change dans Header.js :
import './Header.css'; // ✅ correspond exactement au nom du fichier
import headerBg from '../assets/header-bg.jpg';

function Header() {
  return (
    <section
      className="header-section"
      style={{
        backgroundImage: `url(${headerBg})`,
      }}
    >
      <div className="overlay">
        <div className="container text-center">
    
          <div className="divider">
            <i className="flaticon-shapes-2"></i>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
