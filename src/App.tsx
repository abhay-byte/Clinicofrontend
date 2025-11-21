import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ChatWidget } from "./components/chat/ChatWidget";

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
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      fontSize: '1.2rem',
      color: '#00224A'
    }}>
      Loading...
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