import { useState } from "react";
import { DashboardLayout } from "./DashboardLayout";
import { ScheduleCalendar } from "./ScheduleCalendar";
import { AvailabilityDrawer } from "./AvailabilityDrawer";
import { AppointmentDialog } from "./AppointmentDialog";
import { Button } from "../ui/button";
import { Plus, Calendar, Clock, CheckCircle } from "lucide-react";
import { addDays, addMinutes, setHours, setMinutes, startOfDay, eachDayOfInterval } from "date-fns";
import { toast } from "sonner@2.0.3";
import { Toaster } from "../ui/sonner";
import imgMascot from "figma:asset/94d7ed97816124a20809c9809845a675f7f2459a.png";
import svgPaths from "../../imports/svg-30312lo6h9";

interface SchedulePageProps {
  onNavigate: (page: string, patientId?: string) => void;
}

export function SchedulePage({ onNavigate }: SchedulePageProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Sample appointments
  const [appointments] = useState([
    {
      id: "1",
      title: "Follow-up for Anxiety",
      patientName: "Abhay Raj",
      start: setHours(setMinutes(new Date(), 0), 10),
      end: setHours(setMinutes(new Date(), 30), 10),
      type: "Virtual" as const,
      status: "Scheduled" as const,
      primaryConcern: "Anxiety Management",
    },
    {
      id: "2",
      title: "Sore Throat & Fever",
      patientName: "Alok Ranjan",
      start: setHours(setMinutes(new Date(), 30), 11),
      end: setHours(setMinutes(new Date(), 0), 12),
      type: "Virtual" as const,
      status: "Scheduled" as const,
      primaryConcern: "Cold & Flu Symptoms",
    },
    {
      id: "3",
      title: "General Wellness Check",
      patientName: "Tejashwi Singh",
      start: setHours(setMinutes(addDays(new Date(), 1), 0), 14),
      end: setHours(setMinutes(addDays(new Date(), 1), 0), 15),
      type: "In-Person" as const,
      status: "Scheduled" as const,
      primaryConcern: "Annual checkup",
    },
  ]);

  const [availabilitySlots, setAvailabilitySlots] = useState([
    {
      id: "avail-1",
      title: "Available",
      start: setHours(setMinutes(new Date(), 0), 14),
      end: setHours(setMinutes(new Date(), 0), 15),
      isBooked: false,
      isAvailability: true,
    },
    {
      id: "avail-2",
      title: "Available",
      start: setHours(setMinutes(new Date(), 0), 15),
      end: setHours(setMinutes(new Date(), 0), 16),
      isBooked: false,
      isAvailability: true,
    },
  ]);

  const handleAddSlot = (slot: any) => {
    const newSlot = {
      id: `avail-${Date.now()}`,
      title: "Available",
      start: new Date(
        slot.date.getFullYear(),
        slot.date.getMonth(),
        slot.date.getDate(),
        parseInt(slot.startTime.split(":")[0]),
        parseInt(slot.startTime.split(":")[1])
      ),
      end: new Date(
        slot.date.getFullYear(),
        slot.date.getMonth(),
        slot.date.getDate(),
        parseInt(slot.endTime.split(":")[0]),
        parseInt(slot.endTime.split(":")[1])
      ),
      isBooked: false,
      isAvailability: true,
    };
    setAvailabilitySlots([...availabilitySlots, newSlot]);
    toast.success("Availability slot added successfully!");
    setDrawerOpen(false);
  };

  const handleAddRecurring = (template: any) => {
    const dates = eachDayOfInterval({
      start: startOfDay(template.applyFrom),
      end: startOfDay(template.applyUntil),
    });

    const dayMap: { [key: string]: number } = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };

    const selectedDayNumbers = template.days.map((day: string) => dayMap[day]);

    const newSlots: any[] = [];

    dates.forEach((date) => {
      if (selectedDayNumbers.includes(date.getDay())) {
        const startHour = parseInt(template.startTime.split(":")[0]);
        const startMinute = parseInt(template.startTime.split(":")[1]);
        const endHour = parseInt(template.endTime.split(":")[0]);
        const endMinute = parseInt(template.endTime.split(":")[1]);

        let currentStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), startHour, startMinute);
        const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), endHour, endMinute);

        while (currentStart < dayEnd) {
          const slotEnd = addMinutes(currentStart, template.slotDuration);
          if (slotEnd <= dayEnd) {
            newSlots.push({
              id: `avail-${Date.now()}-${newSlots.length}`,
              title: "Available",
              start: new Date(currentStart),
              end: new Date(slotEnd),
              isBooked: false,
              isAvailability: true,
            });
          }
          currentStart = slotEnd;
        }
      }
    });

    setAvailabilitySlots([...availabilitySlots, ...newSlots]);
    toast.success(`${newSlots.length} recurring slots created successfully!`);
    setDrawerOpen(false);
  };

  const handleSelectEvent = (event: any) => {
    if (event.resource?.type === "appointment") {
      setSelectedEvent(event.resource.data);
      setDialogOpen(true);
    }
  };

  const handleCancelAppointment = (id: string) => {
    toast.success("Appointment cancelled successfully!");
    setDialogOpen(false);
  };

  const todayAppointments = appointments.filter(
    (apt) => apt.start.toDateString() === new Date().toDateString()
  ).length;

  const upcomingAppointments = appointments.filter((apt) => apt.start > new Date()).length;

  const availableSlots = availabilitySlots.filter((slot) => !slot.isBooked).length;

  return (
    <DashboardLayout onNavigate={onNavigate} currentPage="schedule">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900" style={{ fontSize: "24px", fontWeight: 600 }}>
              My Schedule
            </h1>
          </div>
          <Button
            onClick={() => setDrawerOpen(true)}
            style={{ backgroundColor: "#174880" }}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Set Availability
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Appointments Today</p>
                <p className="text-3xl" style={{ color: "#174880", fontWeight: 600 }}>
                  {todayAppointments}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#EBF1FA" }}>
                <Calendar className="h-6 w-6" style={{ color: "#174880" }} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Upcoming Appointments</p>
                <p className="text-3xl" style={{ color: "#174880", fontWeight: 600 }}>
                  {upcomingAppointments}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#EBF1FA" }}>
                <Clock className="h-6 w-6" style={{ color: "#174880" }} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Available Slots</p>
                <p className="text-3xl" style={{ color: "#2C5300", fontWeight: 600 }}>
                  {availableSlots}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#E1FFBF" }}>
                <CheckCircle className="h-6 w-6" style={{ color: "#2C5300" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <ScheduleCalendar
          appointments={appointments}
          availabilitySlots={availabilitySlots}
          onSelectEvent={handleSelectEvent}
        />

        {/* Mascot */}
        <div className="fixed bottom-8 right-8 w-32 h-32 pointer-events-none">
          <img src={imgMascot} alt="Clinico Mascot" className="w-full h-full object-contain" />
        </div>
      </div>

      <AvailabilityDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onAddSlot={handleAddSlot}
        onAddRecurring={handleAddRecurring}
      />

      <AppointmentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        appointment={selectedEvent}
        onCancel={handleCancelAppointment}
      />

      <Toaster />
    </DashboardLayout>
  );
}