import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import logo from "./assets/logo.png";

// Lazy load all page components
const LandingPage = lazy(() => import("./components/landing/LandingPage"));
const SignInPage = lazy(() => import("./components/auth/SignInPage"));
const LogInPage = lazy(() => import("./components/auth/LogInPage"));
const ForgotPasswordPage = lazy(() => import("./components/auth/ForgotPasswordPage"));
const DashboardPage = lazy(() => import("./components/dashboard/DashboardPage").then(module => ({ default: module.DashboardPage })));
const SchedulePage = lazy(() => import("./components/schedule/SchedulePage").then(module => ({ default: module.SchedulePage })));
const AppointmentsPage = lazy(() => import("./components/appointments/AppointmentsPage").then(module => ({ default: module.AppointmentsPage })));
const LiveConsultationPage = lazy(() => import("./components/consultation/LiveConsultationPage").then(module => ({ default: module.LiveConsultationPage })));
const PatientDirectoryPage = lazy(() => import("./components/patients/PatientDirectoryPage").then(module => ({ default: module.PatientDirectoryPage })));
const PatientDetailsPage = lazy(() => import("./components/patients/PatientDetailsPage").then(module => ({ default: module.PatientDetailsPage })));
const ReportRequestsPage = lazy(() => import("./components/reports/ReportRequestsPage").then(module => ({ default: module.ReportRequestsPage })));
const SecureMessagesPage = lazy(() => import("./components/messages/SecureMessagesPage").then(module => ({ default: module.SecureMessagesPage })));
const MyProfilePage = lazy(() => import("./components/profile/MyProfilePage").then(module => ({ default: module.MyProfilePage })));
const HelpSupportPage = lazy(() => import("./components/support/HelpSupportPage").then(module => ({ default: module.HelpSupportPage })));
const NotificationSettingsPage = lazy(() => import("./components/settings/NotificationSettingsPage").then(module => ({ default: module.NotificationSettingsPage })));
const TermsConditionsPage = lazy(() => import("./components/legal/TermsConditionsPage").then(module => ({ default: module.TermsConditionsPage })));
const PrivacyPolicyPage = lazy(() => import("./components/legal/PrivacyPolicyPage").then(module => ({ default: module.PrivacyPolicyPage })));

// Loading component
function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      color: '#00224A'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem'
      }}>
        {/* Container for logo with fallback placeholder */}
        <div style={{
          width: '120px',
          height: '120px',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}>
          {/* Placeholder circle while image loads */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: '#e2e8f0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '3rem',
            color: '#94a3b8',
            fontWeight: 'bold'
          }}>
            C
          </div>
          <img
            src={logo}
            alt="Clinico Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              animation: 'pulse 2s infinite',
              opacity: 0,
              transition: 'opacity 0.5s ease-in-out'
            }}
            onLoad={(e) => {
              // Fade in the image when it loads
              (e.target as HTMLImageElement).style.opacity = '1';
            }}
            loading="eager"
          />
        </div>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '0.5rem',
          color: '#00224A'
        }}>
          Clinico
        </h2>
        <p style={{
          fontSize: '1rem',
          color: '#64748b',
          marginBottom: '1.5rem'
        }}>
          Loading your healthcare experience...
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#00224A',
            borderRadius: '50%',
            animation: 'bounce 1.5s infinite ease-in-out'
          }}></div>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#00224A',
            borderRadius: '50%',
            animation: 'bounce 1.5s infinite ease-in-out',
            animationDelay: '0.2s'
          }}></div>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#00224A',
            borderRadius: '50%',
            animation: 'bounce 1.5s infinite ease-in-out',
            animationDelay: '0.4s'
          }}></div>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          @keyframes bounce {
            0%, 80%, 10% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
    </div>
  );
}

// Wrapper so each page still gets onNavigate + patientId props (from old app)
function PageWrapper({ Component }: { Component: any }) {
  const navigate = useNavigate();
  const params = useParams();
  
  const handleNavigate = (path: string, id?: string) => {
    if (id) {
      navigate(`${path}/${id}`);
    } else {
      navigate(path);
    }
  };
  
  return <Component onNavigate={handleNavigate} patientId={params.id} />;
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignInPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Internal Authenticated Pages */}
          <Route path="/dashboard" element={<PageWrapper Component={DashboardPage} />} />
          <Route path="/schedule" element={<PageWrapper Component={SchedulePage} />} />
          <Route path="/appointments" element={<PageWrapper Component={AppointmentsPage} />} />
          <Route path="/consultation" element={<PageWrapper Component={LiveConsultationPage} />} />
          <Route path="/patients" element={<PageWrapper Component={PatientDirectoryPage} />} />
          <Route path="/patient-details/:id" element={<PageWrapper Component={PatientDetailsPage} />} />
          <Route path="/report-requests" element={<PageWrapper Component={ReportRequestsPage} />} />
          <Route path="/messages" element={<PageWrapper Component={SecureMessagesPage} />} />
          <Route path="/profile" element={<PageWrapper Component={MyProfilePage} />} />
          <Route path="/help" element={<PageWrapper Component={HelpSupportPage} />} />
          <Route path="/notifications" element={<PageWrapper Component={NotificationSettingsPage} />} />
          <Route path="/terms" element={<PageWrapper Component={TermsConditionsPage} />} />
          <Route path="/privacy" element={<PageWrapper Component={PrivacyPolicyPage} />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      
    </Router>
  );
}