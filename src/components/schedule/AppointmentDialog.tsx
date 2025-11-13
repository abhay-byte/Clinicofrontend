import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Calendar, Clock, Video, User, Trash2, FileText, Activity } from "lucide-react";
import { format } from "date-fns";
import imgStatusIcon from "figma:asset/b3f2de9b0e800ed51abbe05512c35ab0f0bf2ed9.png";

interface Appointment {
  id: string;
  title: string;
  patientName: string;
  start: Date;
  end: Date;
  type: "Virtual" | "In-Person";
  status: "Scheduled" | "Completed" | "Cancelled";
  primaryConcern?: string;
}

interface AvailabilitySlot {
  id: string;
  start: Date;
  end: Date;
  isBooked: boolean;
}

interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: Appointment | AvailabilitySlot | null;
  onDeleteSlot?: (id: string) => void;
  onJoinCall?: (id: string) => void;
}

export function AppointmentDialog({ 
  open, 
  onOpenChange, 
  event, 
  onDeleteSlot,
  onJoinCall 
}: AppointmentDialogProps) {
  if (!event) return null;

  const isAppointment = "patientName" in event;

  if (isAppointment) {
    const appointment = event as Appointment;
    const isNearTime = new Date().getTime() - appointment.start.getTime() < 3600000; // Within 1 hour

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>View appointment information and take action</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <div className="text-sm text-gray-500">Patient Name</div>
                <div>{appointment.patientName}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <div className="text-sm text-gray-500">Date</div>
                <div>{format(appointment.start, "EEEE, MMMM d, yyyy")}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <div className="text-sm text-gray-500">Time</div>
                <div>
                  {format(appointment.start, "h:mm a")} - {format(appointment.end, "h:mm a")}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Video className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <div className="text-sm text-gray-500">Appointment Type</div>
                <Badge variant="secondary">{appointment.type}</Badge>
              </div>
            </div>

            {appointment.primaryConcern && (
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 text-gray-500 mt-0.5">📋</div>
                <div>
                  <div className="text-sm text-gray-500">Primary Concern</div>
                  <div>{appointment.primaryConcern}</div>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="h-5 w-5 text-gray-500 mt-0.5">📊</div>
              <div>
                <div className="text-sm text-gray-500">Status</div>
                <Badge 
                  variant={appointment.status === "Scheduled" ? "default" : "secondary"}
                  style={appointment.status === "Scheduled" ? { backgroundColor: "#174880" } : {}}
                >
                  {appointment.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {appointment.type === "Virtual" && isNearTime && (
              <Button 
                className="flex-1"
                style={{ backgroundColor: "#84B54C" }}
                onClick={() => onJoinCall?.(appointment.id)}
              >
                <Video className="mr-2 h-4 w-4" />
                Join Call
              </Button>
            )}
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Availability Slot
  const slot = event as AvailabilitySlot;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Availability Slot</DialogTitle>
          <DialogDescription>Manage your availability slot</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <div className="text-sm text-gray-500">Date</div>
              <div>{format(slot.start, "EEEE, MMMM d, yyyy")}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <div className="text-sm text-gray-500">Time</div>
              <div>
                {format(slot.start, "h:mm a")} - {format(slot.end, "h:mm a")}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg" style={{ backgroundColor: "#E1FFBF" }}>
            <div className="text-sm">
              {slot.isBooked ? (
                <span className="text-red-600">⚠️ This slot is already booked and cannot be deleted.</span>
              ) : (
                <span style={{ color: "#84B54C" }}>✓ This slot is available for booking.</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {!slot.isBooked && (
            <Button 
              variant="destructive" 
              className="flex-1"
              onClick={() => {
                onDeleteSlot?.(slot.id);
                onOpenChange(false);
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Slot
            </Button>
          )}
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}