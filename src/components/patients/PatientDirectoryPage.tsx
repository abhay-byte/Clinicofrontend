import { useState } from "react";
import { DashboardLayout } from "../schedule/DashboardLayout";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Search, Eye, MessageSquare, AlertCircle, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface Patient {
  id: string;
  fullName: string;
  patientCode: string;
  email: string;
  phone: string;
  lastInteraction: Date;
  status?: "Pending Lab Request" | "Unread Message" | "Active Treatment" | null;
  hasPendingLabRequest: boolean;
  hasUnreadMessages: boolean;
}

const MOCK_PATIENTS: Patient[] = [
  {
    id: "1",
    fullName: "Abhay Raj",
    patientCode: "PT-2025-1847",
    email: "abhay@example.com",
    phone: "+91 98765 43210",
    lastInteraction: new Date("2025-11-12T14:00:00"),
    status: "Pending Lab Request",
    hasPendingLabRequest: true,
    hasUnreadMessages: false,
  },
  {
    id: "2",
    fullName: "Riya Sharma",
    patientCode: "PT-2025-1652",
    email: "riya.sharma@example.com",
    phone: "+91 98765 43211",
    lastInteraction: new Date("2025-11-10T10:30:00"),
    status: "Unread Message",
    hasPendingLabRequest: false,
    hasUnreadMessages: true,
  },
  {
    id: "3",
    fullName: "Tejaswini Singh",
    patientCode: "PT-2025-1423",
    email: "tejaswini@example.com",
    phone: "+91 98765 43212",
    lastInteraction: new Date("2025-11-08T15:00:00"),
    status: "Active Treatment",
    hasPendingLabRequest: false,
    hasUnreadMessages: false,
  },
  {
    id: "4",
    fullName: "Rajesh Kumar",
    patientCode: "PT-2025-1298",
    email: "rajesh.k@example.com",
    phone: "+91 98765 43213",
    lastInteraction: new Date("2025-11-05T09:00:00"),
    status: null,
    hasPendingLabRequest: false,
    hasUnreadMessages: false,
  },
  {
    id: "5",
    fullName: "Priya Patel",
    patientCode: "PT-2025-1156",
    email: "priya.patel@example.com",
    phone: "+91 98765 43214",
    lastInteraction: new Date("2025-11-03T11:30:00"),
    status: "Pending Lab Request",
    hasPendingLabRequest: true,
    hasUnreadMessages: false,
  },
  {
    id: "6",
    fullName: "Anita Desai",
    patientCode: "PT-2025-1089",
    email: "anita.d@example.com",
    phone: "+91 98765 43215",
    lastInteraction: new Date("2025-11-01T16:00:00"),
    status: null,
    hasPendingLabRequest: false,
    hasUnreadMessages: false,
  },
  {
    id: "7",
    fullName: "Vikram Singh",
    patientCode: "PT-2025-0987",
    email: "vikram@example.com",
    phone: "+91 98765 43216",
    lastInteraction: new Date("2025-10-28T14:30:00"),
    status: "Unread Message",
    hasPendingLabRequest: false,
    hasUnreadMessages: true,
  },
  {
    id: "8",
    fullName: "Meera Reddy",
    patientCode: "PT-2025-0856",
    email: "meera.reddy@example.com",
    phone: "+91 98765 43217",
    lastInteraction: new Date("2025-10-25T10:00:00"),
    status: "Active Treatment",
    hasPendingLabRequest: false,
    hasUnreadMessages: false,
  },
];

interface PatientDirectoryPageProps {
  onNavigate: (page: string, patientId?: string) => void;
}

export function PatientDirectoryPage({ onNavigate }: PatientDirectoryPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const filteredPatients = MOCK_PATIENTS.filter((patient) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !patient.fullName.toLowerCase().includes(query) &&
        !patient.patientCode.toLowerCase().includes(query) &&
        !patient.email.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Status filter
    if (filterType === "pending-lab") {
      return patient.hasPendingLabRequest;
    } else if (filterType === "unread-messages") {
      return patient.hasUnreadMessages;
    }

    return true;
  });

  // Sort by last interaction (most recent first)
  const sortedPatients = [...filteredPatients].sort(
    (a, b) => b.lastInteraction.getTime() - a.lastInteraction.getTime()
  );

  // Pagination
  const totalPages = Math.ceil(sortedPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = sortedPatients.slice(startIndex, endIndex);

  const handleViewDetails = (patientId: string) => {
    onNavigate("patient-details", patientId);
  };

  const handleSendMessage = (patientName: string) => {
    toast.success(`Opening message thread with ${patientName}...`);
    // In production, navigate to messages page
  };

  const getStatusBadge = (status: Patient["status"]) => {
    if (!status) return null;

    const variants: Record<string, string> = {
      "Pending Lab Request": "bg-yellow-100 text-yellow-800",
      "Unread Message": "bg-blue-100 text-blue-800",
      "Active Treatment": "bg-green-100 text-green-800",
    };

    return (
      <Badge className={variants[status]}>
        {status === "Pending Lab Request" && <FileText className="mr-1 h-3 w-3" />}
        {status === "Unread Message" && <MessageSquare className="mr-1 h-3 w-3" />}
        {status === "Active Treatment" && <AlertCircle className="mr-1 h-3 w-3" />}
        {status}
      </Badge>
    );
  };

  return (
    <DashboardLayout currentPage="patients" onNavigate={onNavigate}>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-[#174880]">Patient Directory</h1>
          <p className="text-sm text-gray-600">
            A list of all patients you have previously interacted with.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by Patient Name, Patient ID, or Email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-[250px]">
                  <SelectValue placeholder="Filter patients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="pending-lab">With Pending Lab Requests</SelectItem>
                  <SelectItem value="unread-messages">With Unread Messages</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Patient List Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Patients ({sortedPatients.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Last Interaction</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPatients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-gray-500">
                        No patients found matching your criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{patient.fullName}</p>
                            <p className="text-xs text-gray-500">
                              Patient ID: {patient.patientCode}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{patient.email}</p>
                            <p className="text-gray-500">{patient.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {formatDate(patient.lastInteraction)}
                          </span>
                        </TableCell>
                        <TableCell>{getStatusBadge(patient.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(patient.id)}
                            >
                              <Eye className="mr-1 h-4 w-4" />
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSendMessage(patient.fullName)}
                            >
                              <MessageSquare className="mr-1 h-4 w-4" />
                              Send Message
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {startIndex + 1}-{Math.min(endIndex, sortedPatients.length)} of{" "}
                  {sortedPatients.length} patients
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? "bg-[#174880]" : ""}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
