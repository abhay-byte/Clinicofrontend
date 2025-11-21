import React from 'react';
import { FaYoutube, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import logo from '/src/assets/logo.png';
import appStore from '/src/assets/patient/app_store.png';
import playStore from '/src/assets/patient/play_store.png';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <img
            src={logo}
            alt="Clinico Logo"
            className={styles.footerLogo}
          />
          <div className={styles.footerBrandText}>
            <div className={styles.footerBrandName}>CLINICO</div>
            <div className={styles.footerBrandSubtitle}>The Healing Hand Initiative</div>
          </div>
        </div>
        
        <div className={styles.footerLinks}>
          {/* For Patients */}
          <div className={styles.footerLinksColumn}>
            <div className={styles.footerLinkHeader}>For Patients</div>
            <ul className={styles.footerLinkItems}>
              <li><a href="#">Find a Doctor</a></li>
              <li><a href="#">AI Health Assistant</a></li>
              <li><a href="#">Health Records</a></li>
              <li><a href="#">Sign Up</a></li>
            </ul>
          </div>

          {/* For Professionals */}
          <div className={styles.footerLinksColumn}>
            <div className={styles.footerLinkHeader}>For Professionals</div>
            <ul className={styles.footerLinkItems}>
              <li><a href="#">Join as a Volunteer</a></li>
              <li><a href="#">Our Technology</a></li>
              <li><a href="#">Medical Advisory Board</a></li>
              <li><a href="#">Dashboard Login</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className={styles.footerLinksColumn}>
            <div className={styles.footerLinkHeader}>Resources</div>
            <ul className={styles.footerLinkItems}>
              <li><a href="#">Health & Wellness Blog</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className={styles.footerLinksColumn}>
            <div className={styles.footerLinkHeader}>Support</div>
            <ul className={styles.footerLinkItems}>
              <li><a href="#">Get Help</a></li>
              <li><a href="#">Give Feedback</a></li>
              <li><a href="#">Community Guidelines</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className={styles.footerLinksColumn}>
            <div className={styles.footerLinkHeader}>Company</div>
            <ul className={styles.footerLinkItems}>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Mission</a></li>
              <li><a href="#">Partnerships (NGOs)</a></li>
              <li>
                <a href="#">
                  Press <span className={styles.arrowIcon}><FaArrowRight /></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className={styles.footerDivider}></div>
      
      <div className={styles.footerBottom}>
        <div className={styles.copyright}>
          © 2025 Clinico. All rights reserved.
        </div>
        
        <div className={styles.legalLinks}>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Support</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
        
        <div className={styles.socialApps}>
          <div className={styles.socialIcons}>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
          
          <div className={styles.appButtons}>
            <a href="#" aria-label="Download on App Store">
              <img
                src={appStore}
                alt="Download on App Store"
                className={styles.appStoreButton}
              />
            </a>
            <a href="#" aria-label="Get it on Google Play">
              <img
                src={playStore}
                alt="Get it on Google Play"
                className={styles.playStoreButton}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;