import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";

import { DashboardPage } from "./components/dashboard/DashboardPage";
import { SchedulePage } from "./components/schedule/SchedulePage";
import { AppointmentsPage } from "./components/appointments/AppointmentsPage";
import { LiveConsultationPage } from "./components/consultation/LiveConsultationPage";
import { PatientDirectoryPage } from "./components/patients/PatientDirectoryPage";
import { PatientDetailsPage } from "./components/patients/PatientDetailsPage";
import { ReportRequestsPage } from "./components/reports/ReportRequestsPage";
import { SecureMessagesPage } from "./components/messages/SecureMessagesPage";
import { MyProfilePage } from "./components/profile/MyProfilePage";
import { HelpSupportPage } from "./components/support/HelpSupportPage";
import { NotificationSettingsPage } from "./components/settings/NotificationSettingsPage";
import { TermsConditionsPage } from "./components/legal/TermsConditionsPage";
import { PrivacyPolicyPage } from "./components/legal/PrivacyPolicyPage";

import LandingPage from "./components/landing/LandingPage";
import SignInPage from "./components/auth/SignInPage";
import LogInPage from "./components/auth/LogInPage";

// Wrapper so each page still gets onNavigate + patientId props (from old app)
function PageWrapper({ Component }: { Component: any }) {
  const navigate = useNavigate();
  const params = useParams();

  const handleNavigate = (path: string, id?: string) => {
    if (id) navigate(`${path}/${id}`);
    else navigate(path);
  };

  return <Component onNavigate={handleNavigate} patientId={params.id} />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignInPage />} />
        <Route path="/login" element={<LogInPage />} />

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
    </Router>
  );
}
