export interface DoctorProfile {
  professional_id: number;
  professional_id_uuid?: string | null;
  full_name: string;
  email: string;
  phone_number?: string;
  specialty?: string;
  credentials?: string;
 years_of_experience?: number;
  verification_status?: string;
  rating?: number;
 total_reviews?: number;
  patients_treated?: number;
  languages_spoken?: string;
  working_hours?: string;
  is_volunteer?: boolean;
  completed_appointments?: number;
  upcoming_appointments?: number;
  today_appointments?: number;
  user_id?: number;
  user_id_uuid?: string | null;
  role?: string;
  created_at?: string;
  availability?: Array<{
    slot_id: number;
    start_time: string;
    end_time: string;
    is_booked: boolean;
    slot_date: string;
  }>;
}

export interface DoctorDashboardStats {
  rating: number;
  total_reviews: number;
  patients_treated: number;
  verification_status: string;
  is_volunteer: boolean;
  appointments_today_count: number;
  pending_reports_count: number;
}