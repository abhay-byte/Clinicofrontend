import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { LoginRequest } from '../../types/auth.types';
import { toast } from 'sonner';
import logo from '/src/assets/logo.png';
import mascotSignin from '/src/assets/signin/mascot_signin.png';
import './SignInPage.css';

const LogInPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare the login data
      const loginData: LoginRequest = {
        email: formData.emailOrPhone, // The API expects email field
        password: formData.password
      };

      // Call the auth service to login the user
      const response = await authService.login(loginData);
      
      // Show success message
      toast.success(response.message || 'Login successful!');
      
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (error: any) {
      // Show error message
      toast.error(error.message || 'Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page-wrapper">
      <div className="signin-content-wrapper">
        {/* Left Panel - Brand & Vision */}
        <div className="signin-left-panel">
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
            <img
              src={mascotSignin}
              alt="Mascot"
              className="signin-mascot"
            />
            <h1 className="signin-headline">Welcome Back.</h1>
            <p className="signin-subtext">
              Your health journey continues here. Securely access your appointments, health records, and our AI assistant.
            </p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="signin-right-panel">
          <div className="signin-form-container">
            <h1 className="signin-form-title">Log in to Your Clinico Account</h1>
            
            {/* Google Log In Button */}
            <button className="signin-google-btn">
              <svg className="signin-google-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.6 9.21053C17.6 8.36842 17.52 7.60526 17.36 6.84211H9V10.421H13.84C13.68 1.5789 12.96 12.5263 11.84 13.1579V15.5789H14.64C16.24 14.2105 17.6 12.4211 17.6 9.21053Z" fill="#4285F4"/>
                <path d="M9 18C11.2 18 13.12 17.2 14.64 15.5789L11.84 13.1579C11 13.6842 10 14.0526 9 14.0526C6.92 14.0526 5.12 12.6842 4.56 10.8421H1.56V13.4211C2.72 15.7368 5.4 17.2632 9 18Z" fill="#34A853"/>
                <path d="M4.56 10.8421C4.4 10.3158 4.24 9.78947 4.24 9.21053C4.24 8.63158 4.4 8.10526 4.56 7.57895V5.05263H1.56C0.96 6.21053 0.64 7.57895 0.64 9.21053C0.64 10.8421 0.96 12.2105 1.56 13.421L4.56 10.8421Z" fill="#FBBC05"/>
                <path d="M9 3.94737C10.12 3.94737 11.12 4.31579 11.84 4.94737L14.72 2.05263C13.12 0.68421 11.2 0 9 0C5.44 0 2.72 1.52632 1.56 3.84211L4.56 6.42105C5.12 4.57895 6.92 3.21053 9 3.21053V3.94737Z" fill="#EA4335"/>
              </svg>
              Log In with Google
            </button>

            {/* Divider */}
            <div className="signin-divider">
              <span className="signin-divider-text">or</span>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="signin-registration-form">
              <div className="signin-input-group">
                <input
                  type="text"
                  name="emailOrPhone"
                  value={formData.emailOrPhone}
                  onChange={handleInputChange}
                  placeholder=" "
                  className="signin-form-input"
                  required
                />
                <label className="signin-form-label">Email or Phone Number</label>
              </div>

              <div className="signin-input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder=" "
                  className="signin-form-input"
                  required
                />
                <label className="signin-form-label">Password</label>
                <button
                  type="button"
                  className="signin-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>

              <div className="signin-checkbox-group">
                <input
                  type="checkbox"
                  id="rememberMe"
                  required
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>

              <button
                type="submit"
                className="signin-submit-btn"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'LOG IN'}
              </button>
            </form>

            <div className="signin-forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <div className="signin-login-link">
              No Account yet? <Link to="/signup"><strong>SIGN UP</strong></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;