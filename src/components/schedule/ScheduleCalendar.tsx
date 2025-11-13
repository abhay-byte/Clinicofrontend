import { useState, useMemo } from "react";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addMinutes } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

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
  title: string;
  start: Date;
  end: Date;
  isBooked: boolean;
  isAvailability: boolean;
}

interface ScheduleCalendarProps {
  appointments: Appointment[];
  availabilitySlots: AvailabilitySlot[];
  onSelectEvent: (event: any) => void;
}

export function ScheduleCalendar({ 
  appointments, 
  availabilitySlots, 
  onSelectEvent 
}: ScheduleCalendarProps) {
  const [view, setView] = useState<View>("week");
  const [date, setDate] = useState(new Date());

  // Combine appointments and availability slots
  const events = useMemo(() => {
    const appointmentEvents = appointments.map((apt) => ({
      ...apt,
      resource: { type: "appointment", data: apt },
    }));

    const availabilityEvents = availabilitySlots
      .filter((slot) => !slot.isBooked)
      .map((slot) => ({
        ...slot,
        resource: { type: "availability", data: slot },
      }));

    return [...appointmentEvents, ...availabilityEvents];
  }, [appointments, availabilitySlots]);

  const eventStyleGetter = (event: any) => {
    if (event.resource?.type === "availability") {
      return {
        style: {
          backgroundColor: "#E1FFBF",
          color: "#2C5300",
          border: "2px dashed #84B54C",
          borderRadius: "6px",
        },
      };
    }

    // Appointment
    return {
      style: {
        backgroundColor: "#174880",
        color: "white",
        borderRadius: "6px",
        border: "none",
      },
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4" style={{ height: "700px" }}>
      <style>
        {`
          .rbc-calendar {
            font-family: 'Roboto', sans-serif;
          }
          
          .rbc-toolbar {
            padding: 16px 0;
            flex-wrap: wrap;
            gap: 12px;
          }
          
          .rbc-toolbar button {
            padding: 8px 16px;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
            background: white;
            color: #374151;
            font-weight: 500;
            transition: all 0.2s;
          }
          
          .rbc-toolbar button:hover {
            background: #f3f4f6;
          }
          
          .rbc-toolbar button.rbc-active {
            background: #174880;
            color: white;
            border-color: #174880;
          }
          
          .rbc-header {
            padding: 12px 4px;
            font-weight: 600;
            color: #174880;
            border-bottom: 2px solid #e5e7eb;
          }
          
          .rbc-today {
            background-color: #EBF1FA;
          }
          
          .rbc-off-range-bg {
            background-color: #f9fafb;
          }
          
          .rbc-event {
            padding: 4px 8px;
            font-size: 13px;
          }
          
          .rbc-event-label {
            font-size: 11px;
          }
          
          .rbc-time-slot {
            min-height: 40px;
          }
          
          .rbc-time-header-content {
            border-left: none;
          }
          
          .rbc-day-slot .rbc-time-slot {
            border-top: 1px solid #f3f4f6;
          }
          
          .rbc-timeslot-group {
            min-height: 80px;
          }
          
          .rbc-current-time-indicator {
            background-color: #FF6E6E;
            height: 2px;
          }
          
          /* Fix the top-left corner cell (0,0 intersection) */
          .rbc-time-header-gutter {
            background-color: #f9fafb;
            border-right: 1px solid #e5e7eb;
            border-bottom: 2px solid #e5e7eb;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            color: #6b7280;
            font-size: 12px;
          }
          
          .rbc-time-header-gutter::after {
            content: 'TIME';
          }
          
          /* Add border to time gutter */
          .rbc-time-content > .rbc-time-gutter {
            border-right: 1px solid #e5e7eb;
            background-color: #f9fafb;
          }
          
          .rbc-label {
            padding: 8px;
            font-weight: 500;
            color: #6b7280;
            font-size: 12px;
          }
        `}
      </style>
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        onSelectEvent={onSelectEvent}
        eventPropGetter={eventStyleGetter}
        views={["month", "week", "day"]}
        step={30}
        showMultiDayTimes
        defaultDate={new Date()}
        tooltipAccessor={(event: any) => {
          if (event.resource?.type === "availability") {
            return "Available - Click to manage";
          }
          return `${event.patientName} - ${event.type}`;
        }}
      />
    </div>
  );
}