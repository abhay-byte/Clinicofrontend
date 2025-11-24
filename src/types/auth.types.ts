// Authentication request/response types

// Register
export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
 phone_number?: string;
  role: 'Patient' | 'Professional' | 'NGO' | 'Admin';
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    user_id: number;
    email: string;
    full_name: string;
    role: string;
    created_at: string;
  };
}

// Login
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    user_id: number;
    email: string;
    full_name: string;
    role: string;
  };
}

// Logout
export interface LogoutResponse {
  message: string;
}

// User profile
export interface UserProfile {
  user_id: number;
  user_id_uuid?: string | null;
  email: string;
  full_name: string;
  phone_number?: string;
  role: string;
  created_at: string;
  patient_id?: number;
  patient_id_uuid?: string | null;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  blood_group?: string;
  marital_status?: string;
  known_allergies?: string;
  chronic_conditions?: string;
  current_medications?: string;
  lifestyle_notes?: string;
  member_since?: string;
  patient_code?: string;
  current_location?: string;
  current_full_address?: string;
  professional_id?: number;
  professional_id_uuid?: string | null;
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
  ngo_user_id?: number;
  ngo_user_id_uuid?: string | null;
  ngo_name?: string;
}