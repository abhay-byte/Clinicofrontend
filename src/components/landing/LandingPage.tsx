import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';


const LandingPage: React.FC = () => {
useEffect(() => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/src/components/landing/LandingPage.css";
  document.head.appendChild(link);

  return () => {
    link.remove(); // cleans up when leaving Landing page
  };
}, []);


  // Create refs for the elements we want to watch
  const missionHeadlineRef = useRef<HTMLHeadingElement>(null);
  const heroHeadlineRef = useRef<HTMLHeadingElement>(null);
  const profHeadlineRef = useRef<HTMLHeadingElement>(null);
  const featuresSectionRef = useRef<HTMLDivElement>(null);
  const featuresHeadlineRef = useRef<HTMLHeadingElement>(null);
  
  // State to toggle the animation class
  const [isMissionHeadlineVisible, setIsMissionHeadlineVisible] = useState(false);
  const [isHeroHeadlineVisible, setIsHeroHeadlineVisible] = useState(false);
  const [isProfHeadlineVisible, setIsProfHeadlineVisible] = useState(false);
  const [isFeaturesSectionVisible, setIsFeaturesSectionVisible] = useState(false);
  const [isPatientsSectionVisible, setIsPatientsSectionVisible] = useState(false);
  const [isFeaturesHeadlineVisible, setIsFeaturesHeadlineVisible] = useState(false);
  const patientsHeadlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle state based on visibility
        // If entry.isIntersecting is true, animation plays.
        // If false, it removes the class, resetting the green line to 0 width.
        setIsMissionHeadlineVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2, /* Trigger when 20% of the item is visible */
      }
    );

    if (missionHeadlineRef.current) {
      observer.observe(missionHeadlineRef.current);
    }

    return () => {
      if (missionHeadlineRef.current) {
        observer.unobserve(missionHeadlineRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroHeadlineVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2, /* Trigger when 20% of the item is visible */
      }
    );

    if (heroHeadlineRef.current) {
      observer.observe(heroHeadlineRef.current);
    }

    return () => {
      if (heroHeadlineRef.current) {
        observer.unobserve(heroHeadlineRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsProfHeadlineVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2, /* Trigger when 20% of the item is visible */
      }
    );

    if (profHeadlineRef.current) {
      observer.observe(profHeadlineRef.current);
    }

    return () => {
      if (profHeadlineRef.current) {
        observer.unobserve(profHeadlineRef.current);
      }
    };
  }, []);

  // Add observer for features section to trigger parallax effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFeaturesSectionVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2, /* Trigger when 20% of the item is visible */
      }
    );

    if (featuresSectionRef.current) {
      observer.observe(featuresSectionRef.current);
    }

    return () => {
      if (featuresSectionRef.current) {
        observer.unobserve(featuresSectionRef.current);
      }
    };
  }, []);
  
  // Add observer for patients section to trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPatientsSectionVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2, /* Trigger when 20% of the item is visible */
      }
    );
    
    if (patientsHeadlineRef.current) {
      observer.observe(patientsHeadlineRef.current);
    }
    
    return () => {
      if (patientsHeadlineRef.current) {
        observer.unobserve(patientsHeadlineRef.current);
      }
    };
  }, []);

  // Add observer for features headline to trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === featuresHeadlineRef.current) {
            setIsFeaturesHeadlineVisible(entry.isIntersecting);
          }
        });
      },
      {
        threshold: 0.2, /* Trigger when 20% of the item is visible */
      }
    );
    
    if (featuresHeadlineRef.current) {
      observer.observe(featuresHeadlineRef.current);
    }
    
    return () => {
      if (featuresHeadlineRef.current) {
        observer.unobserve(featuresHeadlineRef.current);
      }
    };
  }, []);

 // State for mouse position to create parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (featuresSectionRef.current && isFeaturesSectionVisible) {
      const rect = featuresSectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // Calculate parallax transformation based on mouse position
  const calculateParallax = (element: 'blob' | 'card' | 'img1' | 'img2' | 'img3') => {
    if (!isFeaturesSectionVisible) return { transform: 'none' };
    
    const { x, y } = mousePosition;
    const moveFactor = {
      blob: 0.02,   // Slowest movement (background)
      card: 0.04,   // Medium movement
      img1: 0.06,   // Faster movement
      img2: 0.07,   // Fastest movement
      img3: 0.05    // Fast movement
    }[element];
    
    const moveX = (x - 275) * moveFactor; // 275 is approximately center X of features container
    const moveY = (y - 300) * moveFactor; // 300 is approximately center Y of features container
    
    return {
      transform: `translate(${moveX}px, ${moveY}px)`
    };
  };

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
          </div> {/* Close nav-links */}
          
          {/* Authentication & Action */}
          <div className="auth-section">
            <Link to="/dashboard" className="login-link">Log In</Link>
            <Link to="/signup" className="signup-button">Sign Up Now</Link>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1
              ref={heroHeadlineRef}
              className={`hero-headline ${isHeroHeadlineVisible ? 'animate-active' : ''}`}
            >
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
          </div> {/* Close hero-text */}
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
        </div> {/* Close hero-content */}
      </section>
      
      {/* For Professionals Section */}
      <section id="for-professionals" className="for-professionals-section">
        <div className="prof-content">
          <div className="prof-text">
            <h2
              ref={profHeadlineRef}
              className={`prof-headline ${isProfHeadlineVisible ? 'animate-active' : ''}`}
            >
              Make a <span className="highlight">Difference</span><br />On Your Schedule
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
          </div> {/* Close prof-text */}

          <div className="prof-visuals">
            <img src="/src/assets/doctor/features.png" alt="Doctor Consulting" className="prof-image" />
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
          </div> {/* Close prof-visuals */}
        </div> {/* Close prof-content */}
      </section>
      
      {/* Our Mission Section */}
      <section id="mission" className="mission-section">
        <div className="mission-container">
          {/* Left Section: Heart Image Collage */}
          <div className="mission-visuals">
            <img
              src="/src/assets/mission/heart-image.png"
              alt="Heart of Care - representing our mission to connect communities with healthcare"
              className="heart-collage"
            />
          </div>
          
          {/* Right Section: Mission Content */}
          <div className="mission-content">
            <div className="mission-icon">
              <img
                src="/src/assets/mission/heart-icon.png"
                alt="Heart with Plus Sign Icon"
              />
            </div>
            <h2
              ref={missionHeadlineRef}
              className={`mission-headline ${isMissionHeadlineVisible ? 'animate-active' : ''}`}
            >
              Bridging the Gap to <span className="highlight">Quality</span> Healthcare
            </h2>
            <p className="mission-text">
              We believe that quality healthcare is a fundamental human right, not a privilege.
              Our mission is to bridge the gap between underserved communities and essential
              medical services through innovative technology, volunteer healthcare professionals,
              and community-driven solutions. We're committed to making healthcare accessible,
              affordable, and effective for everyone, regardless of their location or economic status.
            </p>
            <a href="#learn-more" className="mission-cta">
              Learn More About Our Impact <span className="arrow-icon">→</span>
            </a>
          </div> {/* Close mission-content */}
        </div> {/* Close mission-container */}
      </section>
      
      {/* Features Section */}
      <section
        id="features"
        className="features-section"
        ref={featuresSectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="features-container">
          {/* Left Column: Text Content */}
          <div className="features-text">
            <h2
              ref={featuresHeadlineRef}
              className={`features-headline ${isFeaturesHeadlineVisible ? 'animate-active' : ''}`}
            >
              Healthcare, <span className="highlight">Re-imagined</span> for You
            </h2>
            <p className="features-body">
              Clinico is more than just an app. It's your comprehensive healthcare companion,
              designed to make quality healthcare accessible, personalized, and effortless.
              From AI-powered assistance to seamless teleconsultations, we're revolutionizing
              how you manage your health.
            </p>
            <a href="#all-features" className="features-cta">
              View all the features <span className="arrow-icon">→</span>
            </a>
          </div>
          
          {/* Right Column: Visual Stack */}
          <div className="features-visual-wrapper">
            {/* Layer 1: Background Blob */}
            <img
              src="/src/assets/landing/features/design.png"
              alt="Background design element"
              className="bg-blob"
              style={calculateParallax('blob')}
            />
            
            {/* Layer 2: Info Card */}
            <div
              className="feature-info-card"
              style={calculateParallax('card')}
            >
              <span className="badge badge-blue">Chat with AI Now</span>
              <h3>Design for how people think</h3>
              <p>Get instant, trusted answers to your health questions with our advanced AI companion.</p>
              <button className="ai-chat-button">Chat with AI Now</button>
            </div>
            
            {/* Layer 3: Floating Images */}
            <img
              src="/src/assets/landing/features/feature_1.png"
              alt="AI Companion"
              className="feat-img feat-img-1"
              style={calculateParallax('img1')}
            />
            <img
              src="/src/assets/landing/features/feature_2.png"
              alt="Teleconsultation"
              className="feat-img feat-img-2"
              style={calculateParallax('img2')}
            />
            <img
              src="/src/assets/landing/features/feature_3.png"
              alt="Geolocation"
              className="feat-img feat-img-3"
              style={calculateParallax('img3')}
            />
          </div>
        </div>
      </section>
      
      {/* For Patients Section */}
      <section id="for-patients">
        <div id="patients-content">
          {/* A. The Headline (H2) */}
          <h2
            ref={patientsHeadlineRef}
            className={`patients-headline ${isPatientsSectionVisible ? 'animate-active' : ''}`}
          >
            Your Complete <span className="highlight">Health</span> Companion
          </h2>
          
          {/* B. The Subtext */}
          <p className="patients-subtext">
            From instant AI health advice to booking appointments with trusted doctors, Clinico puts all your healthcare needs right at your fingertips. Manage your health journey with confidence and ease.
          </p>
          
          {/* C. App Store Buttons */}
          <div className="app-store-buttons">
            <a href="#" className="app-store-btn">
              <img
                src="/src/assets/patient/app_store.png"
                alt="Download on App Store"
              />
            </a>
            <a href="#" className="play-store-btn">
              <img
                src="/src/assets/patient/play_store.png"
                alt="Get it on Google Play"
              />
            </a>
          </div>
          
          {/* D. The Main Visual Stack (Center) */}
          <div className="main-visual-stack">
            <img
              src="/src/assets/patient/background_blobs.png"
              alt="Background decorative blobs"
              className="background-blobs"
            />
            <img
              src="/src/assets/patient/phone_robot.png"
              alt="Elephant Robot next to iPhone"
              className="phone-robot"
            />
          </div>
          
          {/* E. The Feature Icons (Bottom) */}
          <div className="feature-icons-row">
            <img
              src="/src/assets/patient/icons_row.png"
              alt="Feature icons row"
            />
          </div>
        </div>
      </section>
      
      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default LandingPage;