import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '/src/assets/logo.png';
import mascotForgot from '/src/assets/signin/mascot_forgot.png';
import './SignInPage.css';

const ForgotPasswordPage = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailOrPhone(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Forgot password submitted:', emailOrPhone);
    // In a real app, this would send a password reset email
  };

  return (
    <div className="signin-page-wrapper" id="forgot-password-page-wrapper">
      <div className="signin-content-wrapper">
        {/* Left Panel - Brand & Vision */}
        <div className="signin-left-panel signin-brand-panel">
          <div className="signin-brand-content">
            <a href="/" className="signin-logo-link">
              <img
                src={logo}
                alt="Clinico Logo"
                className="signin-logo"
              />
            </a>
            <h2 className="signin-brand-name">CLINICO</h2>
            <p className="signin-initiative-name">The Healing Hand Initiative</p>
            <h1 className="signin-headline">Forgot Your Password?</h1>
            <p className="signin-subtext">
              No problem. Enter the email or phone number, we'll send you a secure link to reset it.
            </p>
          </div>
          <img
            src={mascotForgot}
            alt="Mascot"
            className="signin-mascot"
          />
        </div>

        {/* Right Panel - Form */}
        <div className="signin-right-panel">
          <div className="signin-form-container">
            <h1 className="signin-form-title">Reset Your Password</h1>
            
            {/* Forgot Password Form */}
            <form onSubmit={handleSubmit} className="signin-registration-form">
              <div className="signin-input-group">
                <input
                  type="text"
                  name="emailOrPhone"
                  value={emailOrPhone}
                  onChange={handleInputChange}
                  placeholder=" "
                  className="signin-form-input"
                  required
                />
                <label className="signin-form-label">Email or Phone Number</label>
              </div>

              <button type="submit" className="signin-submit-btn">Send Reset Link</button>
            </form>

            <div className="signin-login-link">
              Remembered it? <Link to="/login"><strong>Log In</strong></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;