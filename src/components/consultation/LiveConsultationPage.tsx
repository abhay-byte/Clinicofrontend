import { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "../schedule/DashboardLayout";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Phone,
  MessageSquare,
  AlertCircle,
  FileText,
  Clock,
  Stethoscope,
  Plus,
  Trash2,
  Save,
  CheckCircle,
  User,
  Calendar,
  Activity,
  Maximize,
  Minimize,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface Medication {
  id: string;
  name: string;
  category: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface LiveConsultationPageProps {
  onNavigate: (page: string, patientId?: string) => void;
  appointmentId?: string;
}

const MOCK_PATIENT = {
  fullName: "Abhay Raj",
  patientCode: "PT-2025-1847",
  age: 34,
  gender: "Male",
  dateOfBirth: "1991-03-15",
  reasonForVisit: "Experiencing persistent headaches and mild fever for the past 3 days. Need consultation.",
  knownAllergies: "Penicillin, Sulfa drugs",
  chronicConditions: "Hypertension",
  currentMedications: "Amlodipine 5mg (once daily)",
  medicalRecords: [
    { id: "1", name: "CBC Report", date: "09 Nov 2025", type: "Lab Report" },
    { id: "2", name: "Chest X-Ray", date: "15 Oct 2025", type: "Imaging" },
    { id: "3", name: "Lipid Profile", date: "01 Oct 2025", type: "Lab Report" },
  ],
  pastConsultations: [
    { id: "1", date: "05 Oct 2025", diagnosis: "Common Cold", doctor: "Dr. Smith" },
    { id: "2", date: "20 Sep 2025", diagnosis: "Hypertension Follow-up", doctor: "Dr. Johnson" },
  ],
  pastPrescriptions: [
    { id: "1", date: "05 Oct 2025", medication: "Paracetamol 650mg" },
    { id: "2", date: "20 Sep 2025", medication: "Amlodipine 5mg" },
  ],
};

export function LiveConsultationPage({ onNavigate, appointmentId }: LiveConsultationPageProps) {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionQuality, setConnectionQuality] = useState<"excellent" | "good" | "poor">("excellent");
  const [showEndCallDialog, setShowEndCallDialog] = useState(false);

  // Form states
  const [diagnosis, setDiagnosis] = useState("");
  const [clinicalNotes, setClinicalNotes] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [followUpInstructions, setFollowUpInstructions] = useState("");
  const [aiBriefing, setAiBriefing] = useState("");
  const [prescriptionAttached, setPrescriptionAttached] = useState(false);

  // Prescription states
  const [medications, setMedications] = useState<Medication[]>([]);
  const [currentMedication, setCurrentMedication] = useState({
    name: "",
    category: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  });
  const [prescriptionNotes, setPrescriptionNotes] = useState("");

  // Lab test states
  const [requestedTests, setRequestedTests] = useState("");
  const [testDueDate, setTestDueDate] = useState("");
  const [testNotes, setTestNotes] = useState("");

  // Call timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAddMedication = () => {
    if (!currentMedication.name || !currentMedication.dosage) {
      toast.error("Please fill in at least medication name and dosage");
      return;
    }

    const newMedication: Medication = {
      id: Date.now().toString(),
      ...currentMedication,
    };

    setMedications([...medications, newMedication]);
    setCurrentMedication({
      name: "",
      category: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    });
    setPrescriptionAttached(true);
    toast.success("Medication added to prescription");
  };

  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter((med) => med.id !== id));
    if (medications.length <= 1) {
      setPrescriptionAttached(false);
    }
  };

  const handleGenerateAIBriefing = () => {
    // Mock AI generation
    const briefing = `Patient presents with ${diagnosis || "unspecified condition"}. ${clinicalNotes ? "Clinical examination reveals: " + clinicalNotes.substring(0, 100) + "..." : ""} Recommended treatment plan has been outlined. ${followUpInstructions ? "Follow-up required." : ""}`;
    setAiBriefing(briefing);
    toast.success("AI briefing generated");
  };

  const handleSaveDraft = () => {
    toast.success("Consultation draft saved successfully");
  };

  const handleEndCall = () => {
    setShowEndCallDialog(true);
  };

  const confirmEndCall = () => {
    toast.success("Consultation completed successfully. Patient has been notified.");
    // Redirect back to appointments
    setTimeout(() => {
      onNavigate("appointments");
    }, 2000);
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        // Request fullscreen
        videoContainerRef.current.requestFullscreen()
          .then(() => {
            setIsFullscreen(true);
          })
          .catch((err) => {
            console.error("Fullscreen error:", err);
            // Fallback: just maximize within viewport using CSS
            if (videoContainerRef.current) {
              videoContainerRef.current.classList.add("fixed", "inset-0", "z-50", "w-screen", "h-screen");
              setIsFullscreen(true);
              toast.success("Video expanded");
            }
          });
      } else {
        // Exit fullscreen
        document.exitFullscreen()
          .then(() => {
            setIsFullscreen(false);
          })
          .catch(() => {
            // Fallback: remove CSS classes
            if (videoContainerRef.current) {
              videoContainerRef.current.classList.remove("fixed", "inset-0", "z-50", "w-screen", "h-screen");
              setIsFullscreen(false);
              toast.success("Video minimized");
            }
          });
      }
    } catch (err) {
      console.error("Fullscreen toggle error:", err);
      // CSS fallback
      if (videoContainerRef.current) {
        if (!videoContainerRef.current.classList.contains("fixed")) {
          videoContainerRef.current.classList.add("fixed", "inset-0", "z-50", "w-screen", "h-screen");
          setIsFullscreen(true);
          toast.success("Video expanded");
        } else {
          videoContainerRef.current.classList.remove("fixed", "inset-0", "z-50", "w-screen", "h-screen");
          setIsFullscreen(false);
          toast.success("Video minimized");
        }
      }
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <DashboardLayout currentPage="appointments" onNavigate={onNavigate} hideNavigation={true}>
      <div className="space-y-4">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#174880]">Live Consultation</h1>
            <p className="text-sm text-gray-600">Video consultation with {MOCK_PATIENT.fullName}</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{formatDuration(callDuration)}</span>
            <Badge
              className={
                connectionQuality === "excellent"
                  ? "bg-green-100 text-green-800"
                  : connectionQuality === "good"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }
            >
              {connectionQuality}
            </Badge>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-12 gap-4">
          {/* Column 1: Patient Context */}
          <div className="col-span-3 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Patient Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#174880] text-white">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">{MOCK_PATIENT.fullName}</p>
                    <p className="text-xs text-gray-500">{MOCK_PATIENT.patientCode}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Age:</span>
                    <span>{MOCK_PATIENT.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Gender:</span>
                    <span>{MOCK_PATIENT.gender}</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="mb-1 text-xs text-gray-500">Reason for Visit</p>
                  <p className="text-sm">{MOCK_PATIENT.reasonForVisit}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  Critical Health Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <p className="font-medium text-red-700">Known Allergies</p>
                  <p className="text-red-900">{MOCK_PATIENT.knownAllergies}</p>
                </div>
                <Separator className="bg-red-200" />
                <div>
                  <p className="font-medium text-gray-700">Chronic Conditions</p>
                  <p className="text-gray-900">{MOCK_PATIENT.chronicConditions}</p>
                </div>
                <Separator className="bg-red-200" />
                <div>
                  <p className="font-medium text-gray-700">Current Medications</p>
                  <p className="text-gray-900">{MOCK_PATIENT.currentMedications}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Patient History</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="records" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="records" className="text-xs">Records</TabsTrigger>
                    <TabsTrigger value="consultations" className="text-xs">Consults</TabsTrigger>
                    <TabsTrigger value="prescriptions" className="text-xs">Rx</TabsTrigger>
                  </TabsList>
                  <TabsContent value="records">
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-2">
                        {MOCK_PATIENT.medicalRecords.map((record) => (
                          <div
                            key={record.id}
                            className="flex items-start justify-between rounded-lg border p-2 text-xs"
                          >
                            <div>
                              <p className="font-medium">{record.name}</p>
                              <p className="text-gray-500">{record.date}</p>
                            </div>
                            <FileText className="h-4 w-4 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="consultations">
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-2">
                        {MOCK_PATIENT.pastConsultations.map((consult) => (
                          <div key={consult.id} className="rounded-lg border p-2 text-xs">
                            <p className="font-medium">{consult.date}</p>
                            <p className="text-gray-600">{consult.diagnosis}</p>
                            <p className="text-gray-500">By {consult.doctor}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="prescriptions">
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-2">
                        {MOCK_PATIENT.pastPrescriptions.map((rx) => (
                          <div key={rx.id} className="rounded-lg border p-2 text-xs">
                            <p className="font-medium">{rx.medication}</p>
                            <p className="text-gray-500">{rx.date}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Column 2: Live Interaction */}
          <div className="col-span-5 space-y-4">
            <Card>
              <CardContent className="p-0">
                {/* Video Feed */}
                <div ref={videoContainerRef} className="relative aspect-video bg-gray-900">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center text-white">
                      <Video className="mx-auto mb-2 h-12 w-12" />
                      <p>Patient Video Feed</p>
                      <p className="text-xs text-gray-400">Live consultation in progress</p>
                    </div>
                  </div>
                  {/* Picture-in-Picture */}
                  <div className="absolute bottom-4 right-4 h-24 w-32 rounded-lg border-2 border-white bg-gray-800">
                    <div className="flex h-full items-center justify-center text-xs text-white">
                      You
                    </div>
                  </div>
                  {/* Call Timer Overlay */}
                  <div className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                    {formatDuration(callDuration)}
                  </div>
                  {/* Fullscreen Button Overlay */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleFullscreen}
                    className="absolute right-4 top-4 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
                    title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  >
                    {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-2 border-t p-4">
                  <Button
                    variant={isMuted ? "destructive" : "outline"}
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    className="rounded-full"
                  >
                    {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant={!isVideoOn ? "destructive" : "outline"}
                    size="icon"
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className="rounded-full"
                  >
                    {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={handleEndCall}
                    className="rounded-full"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Chat Fallback */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <MessageSquare className="h-4 w-4" />
                  Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px] rounded-lg border p-3">
                  <div className="space-y-2">
                    <div className="text-center text-xs text-gray-500">
                      <p>Patient has joined the call</p>
                    </div>
                    <div className="rounded-lg bg-gray-100 p-2 text-sm">
                      <p className="text-xs text-gray-500">Patient</p>
                      <p>Thank you for seeing me today, Doctor.</p>
                    </div>
                  </div>
                </ScrollArea>
                <div className="mt-2 flex gap-2">
                  <Input placeholder="Type a message..." className="text-sm" />
                  <Button size="sm" className="bg-[#174880]">
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Column 3: Doctor's Tools */}
          <div className="col-span-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Stethoscope className="h-4 w-4" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="notes" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                    <TabsTrigger value="prescription">
                      Prescription
                      {medications.length > 0 && (
                        <Badge className="ml-1 bg-[#174880]">{medications.length}</Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="lab">Lab Test</TabsTrigger>
                  </TabsList>

                  {/* Tab 1: Consultation Notes */}
                  <TabsContent value="notes">
                    <ScrollArea className="h-[500px] pr-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="diagnosis">Diagnosis / Condition</Label>
                          <Input
                            id="diagnosis"
                            placeholder="e.g., Acute Pharyngitis"
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="clinicalNotes">Clinical Notes</Label>
                          <Textarea
                            id="clinicalNotes"
                            placeholder="Patient presents with..."
                            rows={5}
                            value={clinicalNotes}
                            onChange={(e) => setClinicalNotes(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="recommendations">Doctor's Recommendations</Label>
                          <Textarea
                            id="recommendations"
                            placeholder="Gargle with salt water, rest, hydrate..."
                            rows={3}
                            value={recommendations}
                            onChange={(e) => setRecommendations(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="followUp">Follow-up Instructions</Label>
                          <Textarea
                            id="followUp"
                            placeholder="Book a follow-up in..."
                            rows={3}
                            value={followUpInstructions}
                            onChange={(e) => setFollowUpInstructions(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="aiBriefing">AI-Generated Briefing</Label>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleGenerateAIBriefing}
                            >
                              Generate
                            </Button>
                          </div>
                          <Textarea
                            id="aiBriefing"
                            placeholder="Click 'Generate' for AI summary..."
                            rows={4}
                            value={aiBriefing}
                            onChange={(e) => setAiBriefing(e.target.value)}
                            className="bg-gray-50"
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="prescriptionAttached"
                            checked={prescriptionAttached}
                            onChange={(e) => setPrescriptionAttached(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <Label htmlFor="prescriptionAttached" className="text-sm">
                            Attach Prescription
                          </Label>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  {/* Tab 2: Create Prescription */}
                  <TabsContent value="prescription">
                    <ScrollArea className="h-[500px] pr-4">
                      <div className="space-y-4">
                        {/* Add Medication Form */}
                        <Card className="border-[#174880]/20">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm">Add Medication</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="space-y-2">
                              <Label htmlFor="medName" className="text-xs">Medication Name</Label>
                              <Input
                                id="medName"
                                placeholder="e.g., Amoxicillin"
                                value={currentMedication.name}
                                onChange={(e) =>
                                  setCurrentMedication({ ...currentMedication, name: e.target.value })
                                }
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="medCategory" className="text-xs">Category</Label>
                              <Select
                                value={currentMedication.category}
                                onValueChange={(value) =>
                                  setCurrentMedication({ ...currentMedication, category: value })
                                }
                              >
                                <SelectTrigger id="medCategory">
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="antibiotic">Antibiotic</SelectItem>
                                  <SelectItem value="analgesic">Analgesic</SelectItem>
                                  <SelectItem value="antipyretic">Antipyretic</SelectItem>
                                  <SelectItem value="antacid">Antacid</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-2">
                                <Label htmlFor="dosage" className="text-xs">Dosage</Label>
                                <Input
                                  id="dosage"
                                  placeholder="500mg"
                                  value={currentMedication.dosage}
                                  onChange={(e) =>
                                    setCurrentMedication({ ...currentMedication, dosage: e.target.value })
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="frequency" className="text-xs">Frequency</Label>
                                <Input
                                  id="frequency"
                                  placeholder="3x/day"
                                  value={currentMedication.frequency}
                                  onChange={(e) =>
                                    setCurrentMedication({ ...currentMedication, frequency: e.target.value })
                                  }
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="duration" className="text-xs">Duration</Label>
                              <Input
                                id="duration"
                                placeholder="5 days"
                                value={currentMedication.duration}
                                onChange={(e) =>
                                  setCurrentMedication({ ...currentMedication, duration: e.target.value })
                                }
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="instructions" className="text-xs">Instructions</Label>
                              <Input
                                id="instructions"
                                placeholder="After meals"
                                value={currentMedication.instructions}
                                onChange={(e) =>
                                  setCurrentMedication({ ...currentMedication, instructions: e.target.value })
                                }
                              />
                            </div>

                            <Button
                              onClick={handleAddMedication}
                              className="w-full bg-[#174880]"
                              size="sm"
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Medication
                            </Button>
                          </CardContent>
                        </Card>

                        {/* Current Prescription List */}
                        {medications.length > 0 && (
                          <div className="space-y-2">
                            <Label>Current Prescription</Label>
                            {medications.map((med) => (
                              <Card key={med.id} className="border-l-4 border-l-[#174880]">
                                <CardContent className="p-3">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1 space-y-1">
                                      <p className="font-medium">{med.name}</p>
                                      <p className="text-xs text-gray-600">
                                        {med.dosage} • {med.frequency} • {med.duration}
                                      </p>
                                      {med.instructions && (
                                        <p className="text-xs text-gray-500">{med.instructions}</p>
                                      )}
                                      {med.category && (
                                        <Badge variant="outline" className="text-xs">
                                          {med.category}
                                        </Badge>
                                      )}
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleRemoveMedication(med.id)}
                                      className="h-8 w-8 text-red-600"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}

                        {/* Prescription Notes */}
                        <div className="space-y-2">
                          <Label htmlFor="prescriptionNotes">Important Notes</Label>
                          <Textarea
                            id="prescriptionNotes"
                            placeholder="Complete the full course of antibiotics..."
                            rows={3}
                            value={prescriptionNotes}
                            onChange={(e) => setPrescriptionNotes(e.target.value)}
                          />
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  {/* Tab 3: Request Lab Test */}
                  <TabsContent value="lab">
                    <ScrollArea className="h-[500px] pr-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="requestedTests">Requested Tests</Label>
                          <Textarea
                            id="requestedTests"
                            placeholder="CBC, BMP, Lipid Profile..."
                            rows={4}
                            value={requestedTests}
                            onChange={(e) => setRequestedTests(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dueDate">Due Date</Label>
                          <Input
                            id="dueDate"
                            type="date"
                            value={testDueDate}
                            onChange={(e) => setTestDueDate(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="testNotes">Additional Notes</Label>
                          <Textarea
                            id="testNotes"
                            placeholder="Please get this done before our next follow-up..."
                            rows={4}
                            value={testNotes}
                            onChange={(e) => setTestNotes(e.target.value)}
                          />
                        </div>

                        <Button
                          className="w-full bg-[#174880]"
                          onClick={() => toast.success("Lab test request will be sent to patient")}
                        >
                          <Activity className="mr-2 h-4 w-4" />
                          Send Request to Patient
                        </Button>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sticky Footer Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-4 shadow-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Activity className="h-4 w-4" />
              <span>Consultation in progress</span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="mr-2 h-4 w-4" />
                Save as Draft
              </Button>
              <Button className="bg-[#174880]" onClick={handleEndCall}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Complete Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* End Call Confirmation Dialog */}
      <AlertDialog open={showEndCallDialog} onOpenChange={setShowEndCallDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Complete Consultation?</AlertDialogTitle>
            <AlertDialogDescription>
              This will end the call and save all consultation records. The patient will be
              notified about the prescription and any lab test requests. Are you sure you want to
              proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmEndCall} className="bg-[#174880]">
              Yes, Complete Consultation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}