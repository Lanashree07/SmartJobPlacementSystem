import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        Smart Job Placement System © {new Date().getFullYear()} | CSE Final Year Project
      </div>
    </footer>
  );
};

export default Footer;
