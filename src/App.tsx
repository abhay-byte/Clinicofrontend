import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

export default function App() {
  const [currentPage, setCurrentPage] = useState<"dashboard" | "schedule" | "appointments" | "consultation" | "patients" | "patient-details" | "report-requests" | "messages" | "profile" | "help" | "notifications" | "terms" | "privacy" | "landing" | "signup">("landing");
 const [selectedPatientId, setSelectedPatientId] = useState<string | undefined>(undefined);

 const handleNavigate = (page: string, patientId?: string) => {
    setCurrentPage(page as any);
    if (patientId) {
      setSelectedPatientId(patientId);
    }
 };


  // Render the appropriate component based on state for non-routed pages
  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'schedule':
        return <SchedulePage onNavigate={handleNavigate} />;
      case 'consultation':
        return <LiveConsultationPage onNavigate={handleNavigate} />;
      case 'patients':
        return <PatientDirectoryPage onNavigate={handleNavigate} />;
      case 'patient-details':
        return <PatientDetailsPage onNavigate={handleNavigate} patientId={selectedPatientId} />;
      case 'report-requests':
        return <ReportRequestsPage onNavigate={handleNavigate} />;
      case 'messages':
        return <SecureMessagesPage onNavigate={handleNavigate} />;
      case 'profile':
        return <MyProfilePage onNavigate={handleNavigate} />;
      case 'help':
        return <HelpSupportPage onNavigate={handleNavigate} />;
      case 'notifications':
        return <NotificationSettingsPage onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsConditionsPage onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacyPolicyPage onNavigate={handleNavigate} />;
      case 'appointments':
      default:
        return <AppointmentsPage onNavigate={handleNavigate} />;
    }
  };

 return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignInPage />} />
        <Route path="*" element={
          currentPage === 'landing' ?
          <LandingPage /> :
          renderCurrentPage()
        } />
      </Routes>
    </Router>
  );
}