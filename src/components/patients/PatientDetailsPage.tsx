import { useState } from "react";
import { DashboardLayout } from "../schedule/DashboardLayout";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  FileText,
  Heart,
  Mail,
  MessageSquare,
  Pill,
  Phone,
  Plus,
  User,
  MapPin,
  Stethoscope,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  Download,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { CreatePrescriptionDialog } from "./CreatePrescriptionDialog";
import { RequestLabTestDialog } from "./RequestLabTestDialog";

interface PatientDetailsPageProps {
  onNavigate: (page: string, patientId?: string) => void;
  patientId?: string;
}

// Mock patient data
const MOCK_PATIENT = {
  id: "1",
  fullName: "Abhay Raj",
  patientCode: "PT-2025-1847",
  age: 34,
  gender: "Male",
  dateOfBirth: "1991-03-15",
  bloodGroup: "O+",
  maritalStatus: "Single",
  email: "abhay@example.com",
  phone: "+91 98765 43210",
  address: "Flat 304, Silver Oak Apartments, MG Road, Bangalore, Karnataka - 560001",
  knownAllergies: "Penicillin, Sulfa drugs",
  chronicConditions: "Hypertension",
  currentMedications: "Amlodipine 5mg (once daily)",
  lifestyleNotes: "Non-smoker, occasional drinker, exercises 3x per week",
  medicalVault: {
    labReports: [
      {
        id: "1",
        name: "CBC Report - Nov 2025",
        uploadedAt: "2025-11-09",
        uploadedBy: "Self",
        url: "#",
      },
      {
        id: "2",
        name: "Lipid Profile - Oct 2025",
        uploadedAt: "2025-10-01",
        uploadedBy: "Self",
        url: "#",
      },
    ],
    prescriptions: [
      {
        id: "1",
        name: "Prescription - Nov 12, 2025",
        uploadedAt: "2025-11-12",
        uploadedBy: "Doctor",
        url: "#",
      },
      {
        id: "2",
        name: "Prescription - Oct 05, 2025",
        uploadedAt: "2025-10-05",
        uploadedBy: "Doctor",
        url: "#",
      },
    ],
    radiology: [
      {
        id: "1",
        name: "Chest X-Ray - Oct 2025",
        uploadedAt: "2025-10-15",
        uploadedBy: "Self",
        url: "#",
      },
    ],
  },
  activePrescriptions: [
    {
      id: "1",
      medication: "Amlodipine",
      dosage: "5mg",
      frequency: "Once daily",
      duration: "Ongoing",
      isActive: true,
    },
    {
      id: "2",
      medication: "Paracetamol",
      dosage: "650mg",
      frequency: "As needed",
      duration: "5 days",
      isActive: true,
    },
  ],
  adherenceStats: {
    overallPercentage: 85,
    missedDoses: 5,
    totalDoses: 28,
    period: "14 days",
  },
  reminderLogs: [
    {
      id: "1",
      medication: "Amlodipine",
      scheduled: "2025-11-12T08:00:00",
      status: "Taken",
      reportedAt: "2025-11-12T08:05:00",
    },
    {
      id: "2",
      medication: "Amlodipine",
      scheduled: "2025-11-12T14:00:00",
      status: "Missed",
      reportedAt: null,
    },
    {
      id: "3",
      medication: "Paracetamol",
      scheduled: "2025-11-12T10:00:00",
      status: "Taken",
      reportedAt: "2025-11-12T10:02:00",
    },
  ],
  consultationHistory: [
    {
      id: "1",
      date: "2025-11-12",
      type: "Virtual Consultation",
      status: "Completed",
      diagnosis: "Acute Pharyngitis",
      clinicalNotes:
        "Patient presents with sore throat, fever of 101°F. No cough. Lungs clear on auscultation. Pharynx shows erythema.",
      prescriptions: ["Amoxicillin 500mg", "Paracetamol 650mg"],
    },
    {
      id: "2",
      date: "2025-11-12",
      type: "Lab Test Request",
      status: "Submitted",
      requestedTests: "CBC, BMP",
      notes: "Follow-up tests to monitor treatment progress",
    },
    {
      id: "3",
      date: "2025-10-05",
      type: "Virtual Consultation",
      status: "Completed",
      diagnosis: "Common Cold",
      clinicalNotes: "Patient reports mild cold symptoms. No fever. Advised rest and hydration.",
      prescriptions: ["Vitamin C supplements"],
    },
  ],
};

export function PatientDetailsPage({ onNavigate, patientId }: PatientDetailsPageProps) {
  const [activeVaultCategory, setActiveVaultCategory] = useState("lab-reports");
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
  const [showLabTestDialog, setShowLabTestDialog] = useState(false);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(dateString));
  };

  const formatDateTime = (dateString: string) => {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  const handleCreatePrescription = () => {
    setShowPrescriptionDialog(true);
  };

  const handleRequestLabTest = () => {
    setShowLabTestDialog(true);
  };

  const handleSendMessage = () => {
    toast.success("Opening message thread...");
    // In production: navigate to messages
  };

  const getVaultDocuments = () => {
    switch (activeVaultCategory) {
      case "lab-reports":
        return MOCK_PATIENT.medicalVault.labReports;
      case "prescriptions":
        return MOCK_PATIENT.medicalVault.prescriptions;
      case "radiology":
        return MOCK_PATIENT.medicalVault.radiology;
      default:
        return [];
    }
  };

  return (
    <DashboardLayout currentPage="patients" onNavigate={onNavigate}>
      <div className="space-y-6">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => onNavigate("patients")}
          className="mb-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Patient Directory
        </Button>

        {/* Sticky Page Header */}
        <Card className="sticky top-0 z-10 border-2 border-[#174880]/20 bg-white shadow-md">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#174880] text-white">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-[#174880]">
                    {MOCK_PATIENT.fullName} ({MOCK_PATIENT.age}y, {MOCK_PATIENT.gender[0]})
                  </h1>
                  <p className="text-sm text-gray-600">
                    Patient ID: {MOCK_PATIENT.patientCode}
                  </p>
                </div>
              </div>
            </div>

            {/* Critical Alert Box */}
            <div className="mt-4 rounded-lg border-2 border-red-300 bg-red-50 p-4 pb-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-700">Critical Health Information</p>
                  <p className="mt-1 text-sm text-red-900">
                    <span className="font-medium">Known Allergies:</span>{" "}
                    {MOCK_PATIENT.knownAllergies}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Sticky Action Bar */}
        <Card className="sticky top-[180px] z-10 border-[#174880]/20 bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleCreatePrescription} className="bg-[#174880]">
                <Plus className="mr-2 h-4 w-4" />
                Create New Prescription
              </Button>
              <Button onClick={handleRequestLabTest} className="bg-[#174880]">
                <Plus className="mr-2 h-4 w-4" />
                Request Lab Test
              </Button>
              <Button variant="outline" onClick={handleSendMessage}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabbed Interface */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Patient Profile</TabsTrigger>
            <TabsTrigger value="vault">Medical Vault</TabsTrigger>
            <TabsTrigger value="medication">Medication & Adherence</TabsTrigger>
            <TabsTrigger value="history">Consultation History</TabsTrigger>
          </TabsList>

          {/* Tab 1: Patient Profile */}
          <TabsContent value="profile">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Critical Health Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    Critical Health Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Known Allergies</p>
                    <p className="text-red-700">{MOCK_PATIENT.knownAllergies}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Chronic Conditions</p>
                    <p>{MOCK_PATIENT.chronicConditions}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Current Medications</p>
                    <p>{MOCK_PATIENT.currentMedications}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Lifestyle Notes</p>
                    <p className="text-sm">{MOCK_PATIENT.lifestyleNotes}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Blood Group</p>
                    <p>{MOCK_PATIENT.bloodGroup}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-[#174880]" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Full Name</p>
                    <p>{MOCK_PATIENT.fullName}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                    <p>{formatDate(MOCK_PATIENT.dateOfBirth)}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Gender</p>
                    <p>{MOCK_PATIENT.gender}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Marital Status</p>
                    <p>{MOCK_PATIENT.maritalStatus}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-[#174880]" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {MOCK_PATIENT.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        {MOCK_PATIENT.phone}
                      </p>
                    </div>
                    <div className="md:col-span-1">
                      <p className="text-sm font-medium text-gray-500">Address</p>
                      <p className="flex items-start gap-2 text-sm">
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                        {MOCK_PATIENT.address}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 2: Medical Vault */}
          <TabsContent value="vault">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#174880]" />
                  Medical Documents Vault
                </CardTitle>
                <CardDescription>
                  All documents uploaded by the patient, organized by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-12">
                  {/* Category List */}
                  <div className="md:col-span-3">
                    <div className="space-y-2">
                      <Button
                        variant={activeVaultCategory === "lab-reports" ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          activeVaultCategory === "lab-reports" ? "bg-[#174880]" : ""
                        }`}
                        onClick={() => setActiveVaultCategory("lab-reports")}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Lab Reports ({MOCK_PATIENT.medicalVault.labReports.length})
                      </Button>
                      <Button
                        variant={activeVaultCategory === "prescriptions" ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          activeVaultCategory === "prescriptions" ? "bg-[#174880]" : ""
                        }`}
                        onClick={() => setActiveVaultCategory("prescriptions")}
                      >
                        <Pill className="mr-2 h-4 w-4" />
                        Prescriptions ({MOCK_PATIENT.medicalVault.prescriptions.length})
                      </Button>
                      <Button
                        variant={activeVaultCategory === "radiology" ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          activeVaultCategory === "radiology" ? "bg-[#174880]" : ""
                        }`}
                        onClick={() => setActiveVaultCategory("radiology")}
                      >
                        <Activity className="mr-2 h-4 w-4" />
                        Radiology ({MOCK_PATIENT.medicalVault.radiology.length})
                      </Button>
                    </div>
                  </div>

                  {/* Document List */}
                  <div className="md:col-span-9">
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-3">
                        {getVaultDocuments().map((doc) => (
                          <Card key={doc.id} className="border-l-4 border-l-[#174880]">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className="font-medium">{doc.name}</p>
                                  <p className="text-xs text-gray-500">
                                    Uploaded {formatDate(doc.uploadedAt)} by {doc.uploadedBy}
                                  </p>
                                </div>
                                <Button variant="outline" size="sm">
                                  <Download className="mr-1 h-4 w-4" />
                                  View
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Medication & Adherence */}
          <TabsContent value="medication">
            <div className="grid gap-6">
              {/* Active Prescriptions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="h-5 w-5 text-[#174880]" />
                    Active Prescriptions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {MOCK_PATIENT.activePrescriptions.map((rx) => (
                      <div
                        key={rx.id}
                        className="flex items-center justify-between rounded-lg border p-4"
                      >
                        <div>
                          <p className="font-medium">
                            {rx.medication} {rx.dosage}
                          </p>
                          <p className="text-sm text-gray-600">
                            {rx.frequency} • {rx.duration}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Adherence Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-[#174880]" />
                    Adherence Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-[#174880]">
                          {MOCK_PATIENT.adherenceStats.overallPercentage}%
                        </p>
                        <p className="text-sm text-gray-600">Overall Adherence</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">
                          <span className="font-medium">
                            {MOCK_PATIENT.adherenceStats.missedDoses}
                          </span>{" "}
                          missed doses
                        </p>
                        <p className="text-xs text-gray-500">
                          in last {MOCK_PATIENT.adherenceStats.period}
                        </p>
                      </div>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full bg-[#174880]"
                        style={{
                          width: `${MOCK_PATIENT.adherenceStats.overallPercentage}%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Reminder Log */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#174880]" />
                    Detailed Reminder Log
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3">
                      {MOCK_PATIENT.reminderLogs.map((log) => (
                        <div
                          key={log.id}
                          className="flex items-center justify-between rounded-lg border p-3"
                        >
                          <div className="flex-1">
                            <p className="font-medium">{log.medication}</p>
                            <p className="text-xs text-gray-500">
                              Scheduled: {formatDateTime(log.scheduled)}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            {log.status === "Taken" ? (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Taken
                              </Badge>
                            ) : (
                              <Badge className="bg-red-100 text-red-800">
                                <XCircle className="mr-1 h-3 w-3" />
                                Missed
                              </Badge>
                            )}
                            {log.reportedAt && (
                              <p className="text-xs text-gray-500">
                                at {formatDateTime(log.reportedAt)}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 4: Consultation & Event History */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-[#174880]" />
                  Consultation & Event History
                </CardTitle>
                <CardDescription>
                  Complete timeline of all interactions with this patient
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {MOCK_PATIENT.consultationHistory.map((event, index) => (
                      <Card
                        key={event.id}
                        className={`border-l-4 ${
                          event.type === "Virtual Consultation"
                            ? "border-l-[#174880]"
                            : "border-l-yellow-500"
                        }`}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-base">
                                {formatDate(event.date)}: {event.type}
                              </CardTitle>
                              <Badge
                                className={
                                  event.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {event.status}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {event.diagnosis && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">Diagnosis</p>
                              <p>{event.diagnosis}</p>
                            </div>
                          )}
                          {event.clinicalNotes && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">Clinical Notes</p>
                              <p className="text-sm">{event.clinicalNotes}</p>
                            </div>
                          )}
                          {event.prescriptions && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Prescriptions Issued
                              </p>
                              <div className="mt-1 flex flex-wrap gap-2">
                                {event.prescriptions.map((rx, i) => (
                                  <Badge key={i} variant="outline">
                                    {rx}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          {event.requestedTests && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">Requested Tests</p>
                              <p>{event.requestedTests}</p>
                              {event.notes && (
                                <p className="mt-1 text-sm text-gray-600">{event.notes}</p>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <CreatePrescriptionDialog
        open={showPrescriptionDialog}
        onClose={() => setShowPrescriptionDialog(false)}
        patientName={MOCK_PATIENT.fullName}
        patientId={MOCK_PATIENT.patientCode}
      />
      <RequestLabTestDialog
        open={showLabTestDialog}
        onClose={() => setShowLabTestDialog(false)}
        patientName={MOCK_PATIENT.fullName}
        patientId={MOCK_PATIENT.patientCode}
      />
    </DashboardLayout>
  );
}