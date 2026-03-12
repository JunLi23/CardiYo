import React from "react";
import "../styles/Footer.css";
import instaLogo from "../assets/insta-logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-email">
          <span className="footer-title">Contact us</span>
          <p>
            Email Address:<br />
            <a href="mailto:c4rd1.y0@gmail.com">c4rd1.y0@gmail.com</a>
          </p>
        </div>

        <div className="footer-about">
          <span className="footer-title">About Us</span>
          <p>Group 6 &mdash; Edinburgh Campus</p>
          <p>F29SO Software Engineering</p>
          <p>Heriot-Watt University</p>
        </div>

        <div className="footer-socials">
          <span className="footer-title">Follow us</span>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/cardi.yo/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Instagram"
            >
              <img src={instaLogo} width="26" height="26" alt="Instagram" className="social-icon-img" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Cardi Co. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
