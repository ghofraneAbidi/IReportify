// src/components/Services.js
import React from 'react';
import './services.css';
import siteVitrine from '../assets/site-vitrine.jpg';
import mobileApp from '../assets/mobile-app.jpg';
import desktopApp from '../assets/desktop-app.jpg';

function Services() {
  return (
    <div className="services-container">
     

      <div className="service-row">
        <div className="service-img">
          <img src={siteVitrine} alt="Site vitrine" />
        </div>
        <div className="service-text">
          <h3>Développement et conception de sites Web :</h3>
          <p>Site web vitrine, e-commerce, plateforme, etc.</p>
        </div>
      </div>

      <div className="service-row reverse">
        <div className="service-img">
          <img src={mobileApp} alt="Application mobile" />
        </div>
        <div className="service-text">
          <h3>Développement des applications Mobiles sur mesure :</h3>
        </div>
      </div>

      <div className="service-row">
        <div className="service-img">
          <img src={desktopApp} alt="Application sur mesure" />
        </div>
        <div className="service-text">
          <h3>Développement sur mesure :</h3>
          <p>Intranet, extranet, application, logiciels métiers.</p>
        </div>
      </div>
    </div>
  );
}

export default Services;
