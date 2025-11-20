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
             src="/src/assets/landing/navbar/logo.png"
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
      
      {/* Hero Section */}
     <section className="hero-section">
       <div className="hero-content">
         <div className="hero-text">
           <h1 className="hero-headline">
             <span className="highlight">Quality</span> Healthcare For Everyone
           </h1>
           <p className="hero-subtext">
             Get immediate health guidance from our AI, connect with volunteer doctors, and access hyperlocal healthcare services tailored to your community's needs.
           </p>
           <div className="hero-cta-group">
             <button className="primary-cta-button">Find Doctors</button>
             <a href="#how-it-works" className="secondary-cta-link">
               <span className="play-icon">▶</span> How It Works
             </a>
           </div>
         </div>
         <div className="hero-visual">
           <img
             src="/src/assets/landing/hero/mascot.png"
             alt="Clinico AI Assistant"
             className="mascot-img"
           />
           <img
             src="/src/assets/landing/hero/patient.png"
             alt="Patient"
             className="patient-img"
           />
           <div className="chat-bubble bubble-1">Hi, how can I help you today?</div>
           <div className="chat-bubble bubble-2">I've been feeling anxious lately.</div>
           <div className="chat-bubble bubble-3">I understand. Let's find a doctor.</div>
         </div>
       </div>
     </section>
     
     {/* For Professionals Section */}
     <section id="for-professionals" className="prof-section">
       <div className="prof-content">
         <div className="prof-text">
           <h2 className="prof-headline">
             Make a <span className="highlight">Difference</span>, On Your Schedule
           </h2>
           
           <ul className="benefit-list">
             <li className="benefit-item">
               <span className="check-icon">✓</span>
               <p><strong>Flexible Volunteering:</strong> Set your own availability and work at your convenience.</p>
             </li>
             <li className="benefit-item">
               <span className="check-icon">✓</span>
               <p><strong>Impactful Work:</strong> Provide essential healthcare support to underserved communities.</p>
             </li>
             <li className="benefit-item">
               <span className="check-icon">✓</span>
               <p><strong>Professional Growth:</strong> Expand your skills while making a meaningful difference.</p>
             </li>
           </ul>

           <a href="/signup-professional" className="cta-link">
             Join Our Volunteer Network <span className="arrow-icon">→</span>
           </a>
         </div>

         <div className="prof-visuals">
           <div className="blob-bg"></div>
           <div className="image-wrapper">
             <img src="/src/assets/doctor/features.png" alt="Doctor Consulting" />
           </div>
           <div className="feature-cards-row">
             <div className="feature-card">
               <span className="badge badge-purple">Feature</span>
               <h3>Smart Calendar</h3>
               <p>Easily set and manage your availability with our intelligent scheduling system.</p>
             </div>
             <div className="feature-card">
               <span className="badge badge-blue">Feature</span>
               <h3>AI Briefings</h3>
               <p>Receive automated patient summaries and care recommendations powered by AI.</p>
             </div>
             <div className="feature-card">
               <span className="badge badge-green">Feature</span>
               <h3>Workspace</h3>
               <p>Access a streamlined dashboard with all your patient interactions and records.</p>
             </div>
           </div>
         </div>
       </div>
     </section>
     
     {/* Main Content - Placeholder for now */}
     <main className="main-content">
       <h1>Welcome to Clinico</h1>
       <p>Your healthcare companion for better health outcomes</p>
     </main>
   </div>
 );
};

export default LandingPage;