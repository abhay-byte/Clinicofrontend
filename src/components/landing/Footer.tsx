import React from 'react';
import { FaYoutube, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowRight } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='footer-container'>
      <div className='footer-top'>
        <div className='footer-brand'>
          <img
            src="/src/assets/logo.png"
            alt="Clinico Logo"
            className="footer-logo"
          />
          <div className="footer-brand-text">
            <div className="footer-brand-name">CLINICO</div>
            <div className="footer-brand-subtitle">The Healing Hand Initiative</div>
          </div>
        </div> {/* Close footer-brand */}
        <div className='footer-links'>
          {/* For Patients */}
          <div className="footer-links-column">
            <div className="footer-link-header">For Patients</div>
            <ul className="footer-link-items">
              <li><a href="#">Find a Doctor</a></li>
              <li><a href="#">AI Health Assistant</a></li>
              <li><a href="#">Health Records</a></li>
              <li><a href="#">Sign Up</a></li>
            </ul>
          </div>

          {/* For Professionals */}
          <div className="footer-links-column">
            <div className="footer-link-header">For Professionals</div>
            <ul className="footer-link-items">
              <li><a href="#">Join as a Volunteer</a></li>
              <li><a href="#">Our Technology</a></li>
              <li><a href="#">Medical Advisory Board</a></li>
              <li><a href="#">Dashboard Login</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-links-column">
            <div className="footer-link-header">Resources</div>
            <ul className="footer-link-items">
              <li><a href="#">Health & Wellness Blog</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-links-column">
            <div className="footer-link-header">Support</div>
            <ul className="footer-link-items">
              <li><a href="#">Get Help</a></li>
              <li><a href="#">Give Feedback</a></li>
              <li><a href="#">Community Guidelines</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-links-column">
            <div className="footer-link-header">Company</div>
            <ul className="footer-link-items">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Mission</a></li>
              <li><a href="#">Partnerships (NGOs)</a></li>
              <li><a href="#">Press <span className="arrow-icon"><FaArrowRight /></span></a></li>
            </ul>
          </div>
        </div> {/* Close footer-links */}
      </div> {/* Close footer-top */}
      
      <div className='footer-divider'></div>
      
      <div className='footer-bottom'>
        <div className='copyright'>
          © 2025 Clinico. All rights reserved.
        </div>
        <div className='legal-links'>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Support</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
        <div className='social-apps'>
          <div className="social-icons">
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
          <div className="app-buttons">
            <img
              src="/src/assets/patient/app_store.png"
              alt="App Store"
              className="app-store-button"
            />
            <img
              src="/src/assets/patient/play_store.png"
              alt="Play Store"
              className="play-store-button"
            />
          </div>
        </div>
      </div> {/* Close footer-bottom */}
    </footer>
  );
};

export default Footer;