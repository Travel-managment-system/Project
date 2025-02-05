import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>Travent</h4>
            <p>Your perfect travel companion, helping you explore the world with ease and comfort.</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Flights</a></li>
              <li><a href="#">Hotels</a></li>
              <li><a href="#">Holiday Packages</a></li>
              <li><a href="#">Offers</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f">facebook</i></a>
              <a href="#"><i className="fab fa-twitter">Twitter</i></a>
              <a href="#"><i className="fab fa-instagram">Instagram</i></a>
              <a href="#"><i className="fab fa-linkedin-in">linkedIn</i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Travent. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
