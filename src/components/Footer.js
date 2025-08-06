import React from 'react';
import footerImage from '../assets/footer.PNG';

const Footer = () => {
  return (
    <div style={{ width: '100%' }}>
      <img
        src={footerImage}
        alt="footer"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  );
};

export default Footer;
