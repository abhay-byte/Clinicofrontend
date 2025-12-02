import { useState, useEffect } from "react";
import { DashboardLayout } from "../schedule/DashboardLayout";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
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
  Search,
  Bell,
  XCircle,
  Eye,
  Download,
  Send,
  CheckCircle,
  MessageSquare,
  FileImage,
  Upload,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { medicalRecordsService } from "../../services/medicalRecords.service";
import { MedicalRecord } from "../../types/user.types";

interface ReportRequestFile {
  id: string;
  fileName: string;
  fileType: string;
  uploadedAt: string;
  url: string;
}

interface ReportRequest {
  id: string;
  patientName: string;
  patientCode: string;
  requestedTests: string;
  dateRequested: string;
  dueDate: string;
  dateSubmitted?: string;
  status: "Pending" | "Submitted" | "Reviewed" | "Cancelled";
  submittedFiles?: ReportRequestFile[];
  additionalNotes?: string;
}

interface Patient {
  id: string;
  name: string;
  code: string;
}

interface ReportRequestsPageProps {
  onNavigate: (page: string, patientId?: string) => void;
}

const MOCK_REQUESTS: ReportRequest[] = [
  {
    id: "REQ-2025-001",
    patientName: "Abhay Raj",
    patientCode: "PT-2025-1847",
    requestedTests: "CBC, BMP, X-ray",
    dateRequested: "2025-11-12",
    dueDate: "2025-11-19",
    status: "Pending",
  },
  {
    id: "REQ-2025-002",
    patientName: "Tejaswini Singh",
    patientCode: "PT-2025-1848",
    requestedTests: "TSH Panel",
    dateRequested: "2025-11-11",
    dueDate: "2025-11-18",
    status: "Pending",
  },
  {
    id: "REQ-2025-003",
    patientName: "Riya Patel",
    patientCode: "PT-2025-1849",
    requestedTests: "CBC, BMP",
    dateRequested: "2025-11-10",
    dueDate: "2025-11-17",
    dateSubmitted: "2025-11-12",
    status: "Submitted",
    submittedFiles: [
      {
        id: "1",
        fileName: "CBC_Report_RiyaPatel_Nov12.pdf",
        fileType: "pdf",
        uploadedAt: "2025-11-12T10:30:00",
        url: "#",
      },
      {
        id: "2",
        fileName: "BMP_Scan_Nov12.jpg",
        fileType: "image",
        uploadedAt: "2025-11-12T10:35:00",
        url: "#",
      },
    ],
  },
  {
    id: "REQ-2025-004",
    patientName: "Vikram Singh",
    patientCode: "PT-2025-1850",
    requestedTests: "Lipid Profile, HbA1c",
    dateRequested: "2025-11-09",
    dueDate: "2025-11-16",
    dateSubmitted: "2025-11-11",
    status: "Submitted",
    submittedFiles: [
      {
        id: "3",
        fileName: "Lipid_Profile_Nov11.pdf",
        fileType: "pdf",
        uploadedAt: "2025-11-11T14:20:00",
        url: "#",
      },
    ],
  },
  {
    id: "REQ-2025-005",
    patientName: "Priya Sharma",
    patientCode: "PT-2025-1851",
    requestedTests: "Thyroid Function Test",
    dateRequested: "2025-11-05",
    dueDate: "2025-11-12",
    dateSubmitted: "2025-11-08",
    status: "Reviewed",
  },
];

const MOCK_PATIENTS: Patient[] = [
  { id: "1", name: "Abhay Raj", code: "PT-2025-1847" },
  { id: "2", name: "Riya Sharma", code: "PT-2025-1652" },
  { id: "3", name: "Tejaswini Singh", code: "PT-2025-1423" },
  { id: "4", name: "Rajesh Kumar", code: "PT-2025-1298" },
];

export function ReportRequestsPage({ onNavigate }: ReportRequestsPageProps) {
  const [activeFilter, setActiveFilter] = useState<"pending" | "submitted" | "reviewed" | "all">("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [requests, setRequests] = useState<ReportRequest[]>(MOCK_REQUESTS);
  const [selectedRequest, setSelectedRequest] = useState<ReportRequest | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [requestToCancel, setRequestToCancel] = useState<string | null>(null);

  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [requestedTests, setRequestedTests] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Medical records state
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [commentsNotes, setCommentsNotes] = useState("");
  const [reportDate, setReportDate] = useState("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Fetch medical records on component mount
  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        setLoading(true);
        const records = await medicalRecordsService.getAllRecords();
        setMedicalRecords(records);
      } catch (error) {
        console.error('Error fetching medical records:', error);
        toast.error('Failed to fetch medical records');
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalRecords();
  }, []);

  const getFilteredRequests = () => {
    return requests.filter((req) => {
      if (activeFilter !== "all" && req.status.toLowerCase() !== activeFilter) {
        return false;
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !req.patientName.toLowerCase().includes(query) &&
          !req.patientCode.toLowerCase().includes(query) &&
          !req.id.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      if (dateFrom && new Date(req.dateRequested) < new Date(dateFrom)) {
        return false;
      }
      if (dateTo && new Date(req.dateRequested) > new Date(dateTo)) {
        return false;
      }

      return true;
    });
  };

  const getStatusCounts = () => {
    return {
      pending: requests.filter((r) => r.status === "Pending").length,
      submitted: requests.filter((r) => r.status === "Submitted").length,
      reviewed: requests.filter((r) => r.status === "Reviewed").length,
      all: requests.length,
    };
  };

  const handleSendReminder = (requestId: string, patientName: string) => {
    toast.success(`Reminder sent to ${patientName} successfully!`);
  };

  const handleCancelRequest = (requestId: string) => {
    setRequestToCancel(requestId);
    setShowCancelDialog(true);
  };

  const confirmCancelRequest = () => {
    if (requestToCancel) {
      setRequests(
        requests.map((req) =>
          req.id === requestToCancel ? { ...req, status: "Cancelled" as const } : req
        )
      );
      toast.success("Request cancelled successfully");
      setShowCancelDialog(false);
      setRequestToCancel(null);
    }
  };

  const handleReviewReport = (request: ReportRequest) => {
    setSelectedRequest(request);
    setShowReviewModal(true);
  };

  const handleMarkAsReviewed = () => {
    if (selectedRequest) {
      setRequests(
        requests.map((req) =>
          req.id === selectedRequest.id ? { ...req, status: "Reviewed" as const } : req
        )
      );
      toast.success("Report marked as reviewed");
      setShowReviewModal(false);
      setSelectedRequest(null);
    }
  };

  const handleMarkAsReviewedAndMessage = () => {
    if (selectedRequest) {
      setRequests(
        requests.map((req) =>
          req.id === selectedRequest.id ? { ...req, status: "Reviewed" as const } : req
        )
      );
      toast.success(`Report reviewed. Opening message thread with ${selectedRequest.patientName}...`);
      setShowReviewModal(false);
      setSelectedRequest(null);
    }
  };

  const handleCreateRequest = () => {
    if (!selectedPatient || !requestedTests || !dueDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const patient = MOCK_PATIENTS.find((p) => p.id === selectedPatient);
    if (!patient) return;

    const requestNumber = requests.length + 1;
    const paddedNumber = requestNumber < 10 ? `00${requestNumber}` : requestNumber < 100 ? `0${requestNumber}` : `${requestNumber}`;

    const newRequest: ReportRequest = {
      id: `REQ-2025-${paddedNumber}`,
      patientName: patient.name,
      patientCode: patient.code,
      requestedTests,
      dateRequested: new Date().toISOString().split("T")[0],
      dueDate,
      status: "Pending",
      additionalNotes,
    };

    setRequests([newRequest, ...requests]);
    toast.success(`Request sent to ${patient.name} successfully!`);

    setSelectedPatient("");
    setSelectedAppointment("");
    setRequestedTests("");
    setDueDate("");
    setAdditionalNotes("");
  };

  // Medical records functions
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentFile(e.target.files[0]);
    }
  };

  const handleUploadRecord = async () => {
    if (!documentFile || !documentName || !documentType) {
      toast.error("Please fill in all required fields and select a file");
      return;
    }

    try {
      setUploading(true);
      
      const formData = new FormData();
      formData.append('documentFile', documentFile);
      formData.append('documentName', documentName);
      formData.append('documentType', documentType);
      
      if (commentsNotes) {
        formData.append('commentsNotes', commentsNotes);
      }
      
      if (reportDate) {
        formData.append('reportDate', reportDate);
      }

      const response = await medicalRecordsService.uploadRecord(formData);
      toast.success(response.message);

      // Refresh the records list
      const updatedRecords = await medicalRecordsService.getAllRecords();
      setMedicalRecords(updatedRecords);

      // Reset form
      setDocumentFile(null);
      setDocumentName("");
      setDocumentType("");
      setCommentsNotes("");
      setReportDate("");
      setShowUploadModal(false);
    } catch (error: any) {
      console.error('Error uploading record:', error);
      toast.error(error.message || 'Failed to upload medical record');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteRecord = async (recordId: number) => {
    try {
      const response = await medicalRecordsService.deleteRecord(recordId);
      toast.success(response.message);

      // Refresh the records list
      const updatedRecords = await medicalRecordsService.getAllRecords();
      setMedicalRecords(updatedRecords);
    } catch (error: any) {
      console.error('Error deleting record:', error);
      toast.error(error.message || 'Failed to delete medical record');
    }
  };

  const handleDownloadRecord = (url: string, fileName: string) => {
    // Create a temporary link to download the file
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRequests = getFilteredRequests();
  const statusCounts = getStatusCounts();

  return (
    <DashboardLayout currentPage="report-requests" onNavigate={onNavigate}>
      <div className="space-y-6">
        <div>
          <h1 className="text-[#174880]">Patient Report Requests</h1>
          <p className="text-sm text-gray-600">
            Track the status of all lab reports and documents you have requested from your patients.
          </p>
        </div>

        <Tabs defaultValue="track" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="track">Track Requests</TabsTrigger>
            <TabsTrigger value="create">Create New Request</TabsTrigger>
            <TabsTrigger value="my-records">My Medical Records</TabsTrigger>
          </TabsList>

          <TabsContent value="track" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={activeFilter === "pending" ? "default" : "outline"}
                    onClick={() => setActiveFilter("pending")}
                    className={activeFilter === "pending" ? "bg-[#174880]" : ""}
                  >
                    Pending ({statusCounts.pending})
                  </Button>
                  <Button
                    variant={activeFilter === "submitted" ? "default" : "outline"}
                    onClick={() => setActiveFilter("submitted")}
                    className={activeFilter === "submitted" ? "bg-[#174880]" : ""}
                  >
                    Submitted ({statusCounts.submitted})
                  </Button>
                  <Button
                    variant={activeFilter === "reviewed" ? "default" : "outline"}
                    onClick={() => setActiveFilter("reviewed")}
                    className={activeFilter === "reviewed" ? "bg-[#174880]" : ""}
                  >
                    Reviewed ({statusCounts.reviewed})
                  </Button>
                  <Button
                    variant={activeFilter === "all" ? "default" : "outline"}
                    onClick={() => setActiveFilter("all")}
                    className={activeFilter === "all" ? "bg-[#174880]" : ""}
                  >
                    All ({statusCounts.all})
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Search & Date Filter */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-[2fr,1fr,1fr]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search by Patient Name or Request Code..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="dateFrom" className="text-xs text-gray-500">From Date</Label>
                    <Input
                      id="dateFrom"
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="dateTo" className="text-xs text-gray-500">To Date</Label>
                    <Input
                      id="dateTo"
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Requests ({filteredRequests.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient Name</TableHead>
                        <TableHead>Requested Tests</TableHead>
                        <TableHead>Date Requested</TableHead>
                        <TableHead>
                          {activeFilter === "submitted" ? "Date Submitted" : "Due Date"}
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-gray-500">
                            No requests found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{request.patientName}</p>
                                <p className="text-xs text-gray-500">{request.patientCode}</p>
                              </div>
                            </TableCell>
                            <TableCell>{request.requestedTests}</TableCell>
                            <TableCell>{formatDate(request.dateRequested)}</TableCell>
                            <TableCell>
                              {activeFilter === "submitted" && request.dateSubmitted
                                ? formatDate(request.dateSubmitted)
                                : formatDate(request.dueDate)}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                {request.status === "Pending" && (
                                  <>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleSendReminder(request.id, request.patientName)}
                                    >
                                      <Bell className="mr-1 h-4 w-4" />
                                      Send Reminder
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleCancelRequest(request.id)}
                                      className="text-red-600 hover:bg-red-50"
                                    >
                                      <XCircle className="mr-1 h-4 w-4" />
                                      Cancel
                                    </Button>
                                  </>
                                )}
                                {request.status === "Submitted" && (
                                  <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => handleReviewReport(request)}
                                    className="bg-[#174880]"
                                  >
                                    <Eye className="mr-1 h-4 w-4" />
                                    Review Report(s)
                                  </Button>
                                )}
                                {request.status === "Reviewed" && (
                                  <Badge className="bg-green-100 text-green-800">
                                    <CheckCircle className="mr-1 h-3 w-3" />
                                    Reviewed
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create a New Report Request</CardTitle>
                <CardDescription>
                  Select a patient and specify the reports you need them to upload.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="patient">
                      Patient <span className="text-red-600">*</span>
                    </Label>
                    <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                      <SelectTrigger id="patient">
                        <SelectValue placeholder="Select a patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_PATIENTS.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.name} ({patient.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="consultation">Link to Consultation (Optional)</Label>
                    <Select
                      value={selectedAppointment}
                      onValueChange={setSelectedAppointment}
                      disabled={!selectedPatient}
                    >
                      <SelectTrigger id="consultation">
                        <SelectValue placeholder="Select a consultation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apt1">Nov 12, 2025 - Virtual Consultation</SelectItem>
                        <SelectItem value="apt2">Oct 05, 2025 - Virtual Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tests">
                      Requested Tests <span className="text-red-600">*</span>
                    </Label>
                    <Textarea
                      id="tests"
                      placeholder="e.g., CBC, TSH Panel, and a standard Lipid Profile"
                      rows={3}
                      value={requestedTests}
                      onChange={(e) => setRequestedTests(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">
                      List all the tests and reports you need the patient to upload.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dueDate">
                      Due Date <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="e.g., Please ensure you are fasting for at least 8 hours before the tests."
                      rows={4}
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                    />
                  </div>

                  <Button
                    onClick={handleCreateRequest}
                    className="w-full bg-[#174880]"
                    disabled={!selectedPatient || !requestedTests || !dueDate}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Request to Patient
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Medical Records Tab */}
          <TabsContent value="my-records" className="space-y-6">
            <div className="flex justify-between items-center">
              <CardTitle>My Medical Records</CardTitle>
              <Button
                onClick={() => setShowUploadModal(true)}
                className="bg-[#174880]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Upload New Record
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading medical records...</p>
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Document Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Uploaded Date</TableHead>
                          <TableHead>Report Date</TableHead>
                          <TableHead>File Format</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {medicalRecords.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500">
                              No medical records found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          medicalRecords.map((record) => (
                            <TableRow key={record.record_id}>
                              <TableCell>
                                <div className="font-medium">{record.document_name}</div>
                                <div className="text-xs text-gray-500 truncate max-w-xs">
                                  {record.comments_notes || "No comments"}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary">{record.document_type}</Badge>
                              </TableCell>
                              <TableCell>{formatDate(record.uploaded_at)}</TableCell>
                              <TableCell>
                                {record.report_date ? formatDate(record.report_date) : "-"}
                              </TableCell>
                              <TableCell>{record.file_format || "-"}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDownloadRecord(record.document_url, record.document_name)}
                                  >
                                    <Download className="mr-1 h-4 w-4" />
                                    Download
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDeleteRecord(record.record_id)}
                                    className="text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="mr-1 h-4 w-4" />
                                    Delete
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Review Submitted Reports</DialogTitle>
            <DialogDescription>
              {selectedRequest && (
                <span>
                  Patient: {selectedRequest.patientName} ({selectedRequest.patientCode})
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto pr-2">
            {selectedRequest && (
              <div className="space-y-6">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="grid gap-3 text-sm">
                      <div>
                        <span className="font-medium">Requested:</span> {selectedRequest.requestedTests}
                      </div>
                      <div>
                        <span className="font-medium">Request Sent:</span>{" "}
                        {formatDate(selectedRequest.dateRequested)}
                      </div>
                      {selectedRequest.dateSubmitted && (
                        <div>
                          <span className="font-medium">Submitted On:</span>{" "}
                          {formatDate(selectedRequest.dateSubmitted)}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <h3 className="font-medium">Submitted Files</h3>
                  {selectedRequest.submittedFiles && selectedRequest.submittedFiles.length > 0 ? (
                    <div className="space-y-2">
                      {selectedRequest.submittedFiles.map((file) => (
                        <Card key={file.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              <FileImage className="h-8 w-8 text-blue-600 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{file.fileName}</p>
                                <p className="text-xs text-gray-500">
                                  Uploaded on {formatDate(file.uploadedAt)}
                                </p>
                              </div>
                              <div className="flex gap-2 flex-shrink-0">
                                <Button variant="outline" size="sm">
                                  <Eye className="mr-1 h-4 w-4" />
                                  View
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="mr-1 h-4 w-4" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No files submitted yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex-shrink-0 gap-2 pt-4">
            <Button variant="outline" onClick={handleMarkAsReviewed}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Reviewed
            </Button>
            <Button className="bg-[#174880]" onClick={handleMarkAsReviewedAndMessage}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Mark as Reviewed & Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this request? The patient will be notified that this
              request is no longer active.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Request</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancelRequest}
              className="bg-red-600 hover:bg-red-700"
            >
              Cancel Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}