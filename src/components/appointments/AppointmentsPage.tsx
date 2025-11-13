import { useState } from "react";
import { DashboardLayout } from "../schedule/DashboardLayout";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
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
import { Calendar as CalendarIcon, Search, Plus, Video, User, Eye, FileText, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { toast } from "sonner@2.0.3";

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  dateTime: Date;
  type: "Virtual" | "In-Person";
  status: "Scheduled" | "Completed" | "Cancelled";
  consultationLink?: string;
  cancelledBy?: string;
  cancelReason?: string;
  notes?: string;
  prescriptionId?: string;
}

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    patientName: "Abhay Raj",
    patientId: "P001",
    dateTime: new Date("2025-11-15T14:00:00"),
    type: "Virtual",
    status: "Scheduled",
    consultationLink: "https://meet.clinico.com/abc123",
  },
  {
    id: "2",
    patientName: "Riya Sharma",
    patientId: "P002",
    dateTime: new Date("2025-11-16T10:30:00"),
    type: "In-Person",
    status: "Scheduled",
  },
  {
    id: "3",
    patientName: "Tejaswini Singh",
    patientId: "P003",
    dateTime: new Date("2025-11-12T10:00:00"),
    type: "Virtual",
    status: "Completed",
    notes: "Patient showing improvement. Prescribed medication for 7 days.",
    prescriptionId: "RX001",
  },
  {
    id: "4",
    patientName: "Priya Verma",
    patientId: "P004",
    dateTime: new Date("2025-11-10T15:00:00"),
    type: "In-Person",
    status: "Completed",
    notes: "Regular checkup completed. All vitals normal.",
    prescriptionId: "RX002",
  },
  {
    id: "5",
    patientName: "Abhay Raj",
    patientId: "P001",
    dateTime: new Date("2025-11-14T10:30:00"),
    type: "In-Person",
    status: "Cancelled",
    cancelledBy: "Patient",
    cancelReason: "Patient had an emergency and requested rescheduling.",
  },
  {
    id: "6",
    patientName: "Rahul Kumar",
    patientId: "P005",
    dateTime: new Date("2025-11-17T16:00:00"),
    type: "Virtual",
    status: "Scheduled",
    consultationLink: "https://meet.clinico.com/xyz789",
  },
  {
    id: "7",
    patientName: "Anita Desai",
    patientId: "P006",
    dateTime: new Date("2025-11-18T09:00:00"),
    type: "In-Person",
    status: "Scheduled",
  },
  {
    id: "8",
    patientName: "Vikram Singh",
    patientId: "P007",
    dateTime: new Date("2025-11-08T11:00:00"),
    type: "Virtual",
    status: "Cancelled",
    cancelledBy: "Professional",
    cancelReason: "Doctor was unavailable due to emergency.",
  },
];

interface AppointmentsPageProps {
  onNavigate: (page: string, patientId?: string) => void;
}

export function AppointmentsPage({ onNavigate }: AppointmentsPageProps) {
  const [appointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [appointmentTypeFilter, setAppointmentTypeFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [prescriptionDialogOpen, setPrescriptionDialogOpen] = useState(false);

  const filterAppointments = (status: Appointment["status"]) => {
    return appointments.filter((apt) => {
      // Status filter
      if (apt.status !== status) return false;

      // Search filter
      if (searchQuery && !apt.patientName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Type filter
      if (appointmentTypeFilter !== "all" && apt.type !== appointmentTypeFilter) {
        return false;
      }

      // Date range filter
      if (dateFrom && apt.dateTime < new Date(dateFrom)) return false;
      if (dateTo && apt.dateTime > new Date(dateTo)) return false;

      return true;
    });
  };

  const handleCancelAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setCancelDialogOpen(true);
  };

  const confirmCancel = () => {
    toast.success(`Appointment with ${selectedAppointment?.patientName} has been cancelled.`);
    setCancelDialogOpen(false);
    setSelectedAppointment(null);
  };

  const handleJoinCall = (appointment: Appointment) => {
    // Navigate to live consultation page
    toast.success("Joining consultation call...");
    setTimeout(() => {
      onNavigate("consultation");
    }, 500);
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }) + " - " + date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const upcomingAppointments = filterAppointments("Scheduled");
  const pastAppointments = filterAppointments("Completed");
  const cancelledAppointments = filterAppointments("Cancelled");

  return (
    <DashboardLayout currentPage="appointments" onNavigate={onNavigate}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[#174880]">Appointments</h1>
            <p className="mt-1 text-gray-600">
              Review and manage all your scheduled, completed, and cancelled patient appointments.
            </p>
          </div>
          <Button
            onClick={() => onNavigate("schedule")}
            className="bg-[#174880] hover:bg-[#174880]/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Set Availability
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by patient name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={appointmentTypeFilter} onValueChange={setAppointmentTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Appointment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Virtual">Virtual</SelectItem>
                <SelectItem value="In-Person">In-Person</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Input
                type="date"
                placeholder="From"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="flex-1"
              />
              <Input
                type="date"
                placeholder="To"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* Tabbed Interface */}
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList className="bg-white">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-[#174880] data-[state=active]:text-white">
              Upcoming
              <Badge variant="secondary" className="ml-2">
                {upcomingAppointments.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-[#174880] data-[state=active]:text-white">
              Past
              <Badge variant="secondary" className="ml-2">
                {pastAppointments.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="data-[state=active]:bg-[#174880] data-[state=active]:text-white">
              Cancelled
              <Badge variant="secondary" className="ml-2">
                {cancelledAppointments.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Tab */}
          <TabsContent value="upcoming">
            <div className="rounded-lg border bg-white shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Patient</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingAppointments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No upcoming appointments found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    upcomingAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>{appointment.patientName}</TableCell>
                        <TableCell>{formatDateTime(appointment.dateTime)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {appointment.type === "Virtual" ? (
                              <Video className="h-4 w-4 text-blue-600" />
                            ) : (
                              <User className="h-4 w-4 text-gray-600" />
                            )}
                            {appointment.type}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {appointment.type === "Virtual" && (
                              <Button
                                size="sm"
                                onClick={() => handleJoinCall(appointment)}
                                className="bg-[#174880] hover:bg-[#174880]/90"
                              >
                                <Video className="mr-1 h-3 w-3" />
                                Join Call
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedAppointment(appointment);
                                setDetailsDialogOpen(true);
                              }}
                            >
                              <Eye className="mr-1 h-3 w-3" />
                              Details
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleCancelAppointment(appointment)}
                            >
                              <X className="mr-1 h-3 w-3" />
                              Cancel
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Past Tab */}
          <TabsContent value="past">
            <div className="rounded-lg border bg-white shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Patient</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastAppointments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No past appointments found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    pastAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>{appointment.patientName}</TableCell>
                        <TableCell>{formatDateTime(appointment.dateTime)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {appointment.type === "Virtual" ? (
                              <Video className="h-4 w-4 text-blue-600" />
                            ) : (
                              <User className="h-4 w-4 text-gray-600" />
                            )}
                            {appointment.type}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedAppointment(appointment);
                                setNotesDialogOpen(true);
                              }}
                            >
                              <Eye className="mr-1 h-3 w-3" />
                              View Notes
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedAppointment(appointment);
                                setPrescriptionDialogOpen(true);
                              }}
                            >
                              <FileText className="mr-1 h-3 w-3" />
                              Prescription
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Cancelled Tab */}
          <TabsContent value="cancelled">
            <div className="rounded-lg border bg-white shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Patient</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cancelledAppointments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No cancelled appointments found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    cancelledAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>{appointment.patientName}</TableCell>
                        <TableCell>{formatDateTime(appointment.dateTime)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {appointment.type === "Virtual" ? (
                              <Video className="h-4 w-4 text-blue-600" />
                            ) : (
                              <User className="h-4 w-4 text-gray-600" />
                            )}
                            {appointment.type}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                            {appointment.status}
                            {appointment.cancelledBy && ` by ${appointment.cancelledBy}`}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setDetailsDialogOpen(true);
                            }}
                          >
                            <Eye className="mr-1 h-3 w-3" />
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Cancel Appointment Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel the appointment with {selectedAppointment?.patientName}?
              This action cannot be undone and the patient will be notified.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancel}
              className="bg-red-600 hover:bg-red-700"
            >
              Yes, Cancel Appointment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              Detailed information about this appointment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Patient Name</p>
              <p>{selectedAppointment?.patientName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Patient ID</p>
              <p>{selectedAppointment?.patientId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date & Time</p>
              <p>{selectedAppointment && formatDateTime(selectedAppointment.dateTime)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <p>{selectedAppointment?.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p>{selectedAppointment?.status}</p>
            </div>
            {selectedAppointment?.cancelReason && (
              <div>
                <p className="text-sm text-gray-500">Cancellation Reason</p>
                <p>{selectedAppointment.cancelReason}</p>
              </div>
            )}
            {selectedAppointment?.type === "Virtual" && selectedAppointment?.consultationLink && (
              <div>
                <p className="text-sm text-gray-500">Consultation Link</p>
                <p className="break-all text-blue-600">{selectedAppointment.consultationLink}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Notes Dialog */}
      <Dialog open={notesDialogOpen} onOpenChange={setNotesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Consultation Notes</DialogTitle>
            <DialogDescription>
              Notes from the consultation with {selectedAppointment?.patientName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p>{selectedAppointment && formatDateTime(selectedAppointment.dateTime)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Notes</p>
              <p className="rounded-md bg-gray-50 p-3">
                {selectedAppointment?.notes || "No notes available for this consultation."}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNotesDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Prescription Dialog */}
      <Dialog open={prescriptionDialogOpen} onOpenChange={setPrescriptionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Prescription</DialogTitle>
            <DialogDescription>
              Prescription details for {selectedAppointment?.patientName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Prescription ID</p>
              <p>{selectedAppointment?.prescriptionId || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p>{selectedAppointment && formatDateTime(selectedAppointment.dateTime)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Prescription Details</p>
              <div className="rounded-md bg-gray-50 p-3">
                <p className="text-sm">This would display the full prescription details including medications, dosages, and instructions.</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPrescriptionDialogOpen(false)}>
              Close
            </Button>
            <Button className="bg-[#174880] hover:bg-[#174880]/90">
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}