export interface Appointment {
  appointment_id: number;
  appointment_id_uuid?: string;
  appointment_time: string; // ISO date string
  status: string; // enum values like 'Scheduled', 'Completed', 'Cancelled', etc.
  appointment_type: string; // enum values like 'Virtual', 'In-Person', etc.
  appointment_code?: string;
  patient_notes?: string;
  scheduled_at: string; // ISO date string
 completed_at?: string; // ISO date string
  duration_minutes?: number;
  patient_name?: string; // for professional view
  patient_id?: number;
  professional_name?: string; // for patient view
  specialty?: string; // for patient view
}

export interface AppointmentForToday extends Appointment {
  time: string; // formatted time for display
  patientName: string; // formatted patient name for display
  concern: string; // primary concern for the appointment
  type: string; // appointment type for display
}