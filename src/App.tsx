import { useState } from "react";
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

export default function App() {
  const [currentPage, setCurrentPage] = useState<"dashboard" | "schedule" | "appointments" | "consultation" | "patients" | "patient-details" | "report-requests" | "messages" | "profile" | "help" | "notifications" | "terms" | "privacy" | "landing">("landing");
  const [selectedPatientId, setSelectedPatientId] = useState<string | undefined>(undefined);

  const handleNavigate = (page: string, patientId?: string) => {
    setCurrentPage(page as any);
    if (patientId) {
      setSelectedPatientId(patientId);
    }
  };

  return (
    <>
      {currentPage === "landing" ? (
        <LandingPage />
      ) : currentPage === "dashboard" ? (
        <DashboardPage onNavigate={handleNavigate} />
      ) : currentPage === "schedule" ? (
        <SchedulePage onNavigate={handleNavigate} />
      ) : currentPage === "consultation" ? (
        <LiveConsultationPage onNavigate={handleNavigate} />
      ) : currentPage === "patients" ? (
        <PatientDirectoryPage onNavigate={handleNavigate} />
      ) : currentPage === "patient-details" ? (
        <PatientDetailsPage onNavigate={handleNavigate} patientId={selectedPatientId} />
      ) : currentPage === "report-requests" ? (
        <ReportRequestsPage onNavigate={handleNavigate} />
      ) : currentPage === "messages" ? (
        <SecureMessagesPage onNavigate={handleNavigate} />
      ) : currentPage === "profile" ? (
        <MyProfilePage onNavigate={handleNavigate} />
      ) : currentPage === "help" ? (
        <HelpSupportPage onNavigate={handleNavigate} />
      ) : currentPage === "notifications" ? (
        <NotificationSettingsPage onNavigate={handleNavigate} />
      ) : currentPage === "terms" ? (
        <TermsConditionsPage onNavigate={handleNavigate} />
      ) : currentPage === "privacy" ? (
        <PrivacyPolicyPage onNavigate={handleNavigate} />
      ) : (
        <AppointmentsPage onNavigate={handleNavigate} />
      )}
    </>
  );
}