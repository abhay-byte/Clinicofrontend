import React from 'react';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
         <div className="logo-section">
           <img
             src="../assets/landing/navbar/logo.png"
             alt="Clinico Logo"
             className="logo"
           />
          </div>
          
          {/* Navigation Links */}
          <div className="nav-links">
            <a href="#patients" className="nav-link">For Patients</a>
            <a href="#professionals" className="nav-link">For Professionals</a>
            <a href="#mission" className="nav-link">Our Mission</a>
            <div className="nav-dropdown">
              <a href="#features" className="nav-link">
                Features <span className="dropdown-arrow">⌄</span>
              </a>
            </div>
          </div>
          
          {/* Authentication & Action */}
          <div className="auth-section">
            <a href="#login" className="login-link">Log In</a>
            <button className="signup-button">Sign Up Now</button>
          </div>
        </div>
      </nav>
      
      {/* Main Content - Placeholder for now */}
      <main className="main-content">
        <h1>Welcome to Clinico</h1>
        <p>Your healthcare companion for better health outcomes</p>
      </main>
    </div>
  );
};

export default LandingPage;