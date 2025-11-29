import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Footer from './Footer';
import styles from "./LandingPage.module.css";

// Import all assets
import logoNavbar from '/src/assets/landing/navbar/logo.png';
import mascotHero from '/src/assets/landing/hero/mascot.png';
import patientHero from '/src/assets/landing/hero/patient.png';
import doctorFeatures from '/src/assets/doctor/features.png';
import heartImage from '/src/assets/mission/heart-image.png';
import heartIcon from '/src/assets/mission/heart-icon.png';
import designFeatures from '/src/assets/landing/features/design.png';
import feature1 from '/src/assets/landing/features/feature_1.png';
import feature2 from '/src/assets/landing/features/feature_2.png';
import feature3 from '/src/assets/landing/features/feature_3.png';
import appStore from '/src/assets/patient/app_store.png';
import playStore from '/src/assets/patient/play_store.png';
import backgroundBlobs from '/src/assets/patient/background_blobs.png';
import phoneRobot from '/src/assets/patient/phone_robot.png';
import iconsRow from '/src/assets/patient/icons_row.png';


const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

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
        setIsMissionHeadlineVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
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
        threshold: 0.2,
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
        threshold: 0.2,
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFeaturesSectionVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
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
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPatientsSectionVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
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
        threshold: 0.2,
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

  const calculateParallax = (element: 'blob' | 'card' | 'img1' | 'img2' | 'img3') => {
    if (!isFeaturesSectionVisible) return { transform: 'none' };
    
    const { x, y } = mousePosition;
    const moveFactor = {
      blob: 0.02,
      card: 0.04,
      img1: 0.06,
      img2: 0.07,
      img3: 0.05
    }[element];
    
    const moveX = (x - 275) * moveFactor;
    const moveY = (y - 300) * moveFactor;
    
    return {
      transform: `translate(${moveX}px, ${moveY}px)`
    };
  };

  return (
    <div className={styles.landingPage}>
      {/* Navigation Bar */}
      <nav className={styles.navbarContainer}>
        <div className={styles.navbarContent}>
          {/* Logo */}
          <div className={styles.logoSection}>
            <img
              src={logoNavbar}
              alt="Clinico Logo"
              className={styles.logo}
            />
          </div>
          
          {/* Navigation Links */}
          <div className={styles.navLinks}>
            <a href="#patients" className={styles.navLink}>For Patients</a>
            <a href="#professionals" className={styles.navLink}>For Professionals</a>
            <a href="#mission" className={styles.navLink}>Our Mission</a>
            <div className={styles.navDropdown}>
              <a href="#features" className={styles.navLink}>
                Features <span className={styles.dropdownArrow}>⌄</span>
              </a>
            </div>
          </div>
          
          {/* Authentication & Action */}
          <div className={styles.authSection}>
            {loading ? (
              // Show loading state while checking auth status
              <div>Loading...</div>
            ) : isAuthenticated ? (
              // Show Dashboard button when authenticated
              <button
                onClick={() => navigate('/dashboard')}
                className={styles.signupButton}
              >
                Dashboard
              </button>
            ) : (
              // Show Login and Signup buttons when not authenticated
              <>
                <Link to="/login" className={styles.loginLink}>Log In</Link>
                <Link to="/signup" className={styles.signupButton}>Sign Up Now</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1
              ref={heroHeadlineRef}
              className={`${styles.heroHeadline} ${isHeroHeadlineVisible ? styles.animateActive : ''}`}
            >
              <span className={styles.highlight}>Quality</span> Healthcare For Everyone
            </h1>
            <p className={styles.heroSubtext}>
              Get immediate health guidance from our AI, connect with volunteer doctors, and access hyperlocal healthcare services tailored to your community's needs.
            </p>
            <div className={styles.heroCtaGroup}>
              <button className={styles.primaryCtaButton}>Find Doctors</button>
              <a href="#how-it-works" className={styles.secondaryCtaLink}>
                <span className={styles.playIcon}>▶</span> How It Works
              </a>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <img
              src={mascotHero}
              alt="Clinico AI Assistant"
              className={styles.mascotImg}
            />
            <img
              src={patientHero}
              alt="Patient"
              className={styles.patientImg}
            />
            <div className={`${styles.chatBubble} ${styles.bubble1}`}>Hi, how can I help you today?</div>
            <div className={`${styles.chatBubble} ${styles.bubble2}`}>I've been feeling anxious lately.</div>
            <div className={`${styles.chatBubble} ${styles.bubble3}`}>I understand. Let's find a doctor.</div>
          </div>
        </div>
      </section>
      
      {/* For Professionals Section */}
      <section id="for-professionals" className={styles.forProfessionalsSection}>
        <div className={styles.profContent}>
          <div className={styles.profText}>
            <h2
              ref={profHeadlineRef}
              className={`${styles.profHeadline} ${isProfHeadlineVisible ? styles.animateActive : ''}`}
            >
              Make a <span className={styles.highlight}>Difference</span><br />On Your Schedule
            </h2>
            
            <ul className={styles.benefitList}>
              <li className={styles.benefitItem}>
                <span className={styles.checkIcon}>✓</span>
                <p><strong>Flexible Volunteering:</strong> Set your own availability and work at your convenience.</p>
              </li>
              <li className={styles.benefitItem}>
                <span className={styles.checkIcon}>✓</span>
                <p><strong>Impactful Work:</strong> Provide essential healthcare support to underserved communities.</p>
              </li>
              <li className={styles.benefitItem}>
                <span className={styles.checkIcon}>✓</span>
                <p><strong>Professional Growth:</strong> Expand your skills while making a meaningful difference.</p>
              </li>
            </ul>

            <a href="/signup-professional" className={styles.ctaLink}>
              Join Our Volunteer Network <span className={styles.arrowIcon}>→</span>
            </a>
          </div>

          <div className={styles.profVisuals}>
            <img src={doctorFeatures} alt="Doctor Consulting" className={styles.profImage} />
            <div className={styles.featureCardsRow}>
              <div className={styles.featureCard}>
                <span className={`${styles.badge} ${styles.badgePurple}`}>Feature</span>
                <h3>Smart Calendar</h3>
                <p>Easily set and manage your availability with our intelligent scheduling system.</p>
              </div>
              <div className={styles.featureCard}>
                <span className={`${styles.badge} ${styles.badgeBlue}`}>Feature</span>
                <h3>AI Briefings</h3>
                <p>Receive automated patient summaries and care recommendations powered by AI.</p>
              </div>
              <div className={styles.featureCard}>
                <span className={`${styles.badge} ${styles.badgeGreen}`}>Feature</span>
                <h3>Workspace</h3>
                <p>Access a streamlined dashboard with all your patient interactions and records.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Mission Section */}
      <section id="mission" className={styles.missionSection}>
        <div className={styles.missionContainer}>
          <div className={styles.missionVisuals}>
            <img
              src={heartImage}
              alt="Heart of Care - representing our mission to connect communities with healthcare"
              className={styles.heartCollage}
            />
          </div>
          
          <div className={styles.missionContent}>
            <div className={styles.missionIcon}>
              <img
                src={heartIcon}
                alt="Heart with Plus Sign Icon"
              />
            </div>
            <h2
              ref={missionHeadlineRef}
              className={`${styles.missionHeadline} ${isMissionHeadlineVisible ? styles.animateActive : ''}`}
            >
              Bridging the Gap to <span className={styles.highlight}>Quality</span> Healthcare
            </h2>
            <p className={styles.missionText}>
              We believe that quality healthcare is a fundamental human right, not a privilege.
              Our mission is to bridge the gap between underserved communities and essential
              medical services through innovative technology, volunteer healthcare professionals,
              and community-driven solutions. We're committed to making healthcare accessible,
              affordable, and effective for everyone, regardless of their location or economic status.
            </p>
            <a href="#learn-more" className={styles.missionCta}>
              Learn More About Our Impact <span className={styles.arrowIcon}>→</span>
            </a>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section
        id="features"
        className={styles.featuresSection}
        ref={featuresSectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.featuresContainer}>
          <div className={styles.featuresText}>
            <h2
              ref={featuresHeadlineRef}
              className={`${styles.featuresHeadline} ${isFeaturesHeadlineVisible ? styles.animateActive : ''}`}
            >
              Healthcare, <span className={styles.highlight}>Re-imagined</span> for You
            </h2>
            <p className={styles.featuresBody}>
              Clinico is more than just an app. It's your comprehensive healthcare companion,
              designed to make quality healthcare accessible, personalized, and effortless.
              From AI-powered assistance to seamless teleconsultations, we're revolutionizing
              how you manage your health.
            </p>
            <a href="#all-features" className={styles.featuresCta}>
              View all the features <span className={styles.arrowIcon}>→</span>
            </a>
          </div>
          
          <div className={styles.featuresVisualWrapper}>
            <img
              src={designFeatures}
              alt="Background design element"
              className={styles.bgBlob}
              style={calculateParallax('blob')}
            />
            
            <div
              className={styles.featureInfoCard}
              style={calculateParallax('card')}
            >
              <span className={`${styles.badge} ${styles.badgeBlue}`}>Chat with AI Now</span>
              <h3>Design for how people think</h3>
              <p>Get instant, trusted answers to your health questions with our advanced AI companion.</p>
              <button className={styles.aiChatButton}>Chat with AI Now</button>
            </div>
            
            <img
              src={feature1}
              alt="AI Companion"
              className={`${styles.featImg} ${styles.featImg1}`}
              style={calculateParallax('img1')}
            />
            <img
              src={feature2}
              alt="Teleconsultation"
              className={`${styles.featImg} ${styles.featImg2}`}
              style={calculateParallax('img2')}
            />
            <img
              src={feature3}
              alt="Geolocation"
              className={`${styles.featImg} ${styles.featImg3}`}
              style={calculateParallax('img3')}
            />
          </div>
        </div>
      </section>
      
      {/* For Patients Section */}
      <section id="for-patients" className={styles.forPatientsSection}>
        <div className={styles.patientsContent}>
          <h2
            ref={patientsHeadlineRef}
            className={`${styles.patientsHeadline} ${isPatientsSectionVisible ? styles.animateActive : ''}`}
          >
            Your Complete <span className={styles.highlight}>Health</span> Companion
          </h2>
          
          <p className={styles.patientsSubtext}>
            From instant AI health advice to booking appointments with trusted doctors, Clinico puts all your healthcare needs right at your fingertips. Manage your health journey with confidence and ease.
          </p>
          
          <div className={styles.appStoreButtons}>
            <a href="#" className={styles.appStoreBtn}>
              <img
                src={appStore}
                alt="Download on App Store"
              />
            </a>
            <a href="#" className={styles.playStoreBtn}>
              <img
                src={playStore}
                alt="Get it on Google Play"
              />
            </a>
          </div>
          
          <div className={styles.mainVisualStack}>
            <img
              src={backgroundBlobs}
              alt="Background decorative blobs"
              className={styles.backgroundBlobs}
            />
            <img
              src={phoneRobot}
              alt="Elephant Robot next to iPhone"
              className={styles.phoneRobot}
            />
          </div>
          
          <div className={styles.featureIconsRow}>
            <img
              src={iconsRow}
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