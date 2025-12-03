import { apiRequest } from './api.service';
import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse, LogoutResponse } from '../types/auth.types';
import { doctorStorageService } from './doctor-storage.service';
import { DoctorProfile } from '../types/doctor.types';

// Define the type for the auth service
interface AuthService {
  register: (userData: RegisterRequest) => Promise<RegisterResponse>;
  login: (credentials: LoginRequest, rememberMe?: boolean) => Promise<LoginResponse>;
  logout: () => Promise<{ message: string }>;
 getProfile: () => Promise<any>;
  isAuthenticated: () => boolean;
 getToken: () => string | null;
  cacheDoctorDetails: () => Promise<void>;
  updateDoctorProfile: (profileData: Partial<DoctorProfile>) => Promise<void>;
}

// Auth service methods
class AuthServiceImplementation implements AuthService {
  // Register a new user
  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await apiRequest.post('/auth/register', userData);
      const data = response.data as RegisterResponse;
      // Store the token in localStorage if registration is successful
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error: any) {
      // Normalize error response
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      throw new Error(errorMessage);
    }
  }

  // Login user
  async login(credentials: LoginRequest, rememberMe: boolean = true): Promise<LoginResponse> {
    try {
      const response = await apiRequest.post('/auth/login', credentials);
      const data = response.data as LoginResponse;
      // Store the token in localStorage or sessionStorage based on rememberMe setting
      if (data.token) {
        if (rememberMe) {
          localStorage.setItem('token', data.token);
        } else {
          sessionStorage.setItem('token', data.token);
        }
      }
      
      // If user is a professional, fetch and cache their profile data
      if (data.user?.role === 'Professional') {
        await this.cacheDoctorDetails();
      }
      
      return data;
    } catch (error: any) {
      // Normalize error response
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      throw new Error(errorMessage);
    }
  }

  // Logout user - clear token from localStorage and sessionStorage
  async logout(): Promise<{ message: string }> {
    try {
      // Clear the token from both localStorage and sessionStorage
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      // Clear cached doctor data
      doctorStorageService.clearDoctorData();
      return { message: 'Logged out successfully' };
    } catch (error: any) {
      // In case of error during logout
      const errorMessage = error.message || 'Logout failed';
      throw new Error(errorMessage);
    }
  }

  // Get current user profile (if needed)
  async getProfile() {
    try {
      const response = await apiRequest.get('/users/me');
      const profileData = response.data as any;
      
      // If user is a professional, cache their profile data
      if (profileData.role === 'Professional') {
        await this.cacheDoctorDetails();
      }
      
      return profileData;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch profile';
      throw new Error(errorMessage);
    }
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }
  
  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return !!token;
  }

  // Cache doctor details for professionals
  async cacheDoctorDetails() {
    try {
      // Get the user profile to determine if they're a professional
      const profile = await apiRequest.get('/users/me');
      const userData = profile.data;
      
      if (userData.role === 'Professional') {
        // Get professional-specific details
        const professionalDetails = await apiRequest.get('/professionals/me/dashboard');
        const dashboardStats = professionalDetails.data;
        
        // Combine profile and dashboard data for complete doctor profile
        const doctorProfile = {
          professional_id: userData.professional_id,
          professional_id_uuid: userData.professional_id_uuid,
          full_name: userData.full_name,
          email: userData.email,
          phone_number: userData.phone_number,
          specialty: userData.specialty,
          credentials: userData.credentials,
          years_of_experience: userData.years_of_experience,
          verification_status: userData.verification_status,
          rating: userData.rating,
          total_reviews: userData.total_reviews,
          patients_treated: userData.patients_treated,
          languages_spoken: userData.languages_spoken,
          working_hours: userData.working_hours,
          is_volunteer: userData.is_volunteer,
          user_id: userData.user_id,
          user_id_uuid: userData.user_id_uuid,
          role: userData.role,
          created_at: userData.created_at
        };
        
        // Store the doctor profile and dashboard stats in local storage
        doctorStorageService.setDoctorProfile(doctorProfile);
        doctorStorageService.setDoctorDashboardStats(dashboardStats);
      }
    } catch (error: any) {
      console.error('Error caching doctor details:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to cache doctor details';
      throw new Error(errorMessage);
    }
  }
  
  // Update doctor profile information
  async updateDoctorProfile(profileData: Partial<DoctorProfile>) {
    try {
      // Update the profile via API
      const response = await apiRequest.put('/professionals/me/profile', profileData);
      
      // Update the local storage with the new data
      doctorStorageService.updateDoctorProfile(profileData);
      
      console.log('Doctor profile updated successfully:', profileData);
      return response.data;
    } catch (error: any) {
      console.error('Error updating doctor profile:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update doctor profile';
      throw new Error(errorMessage);
    }
  }
}

export const authService = new AuthServiceImplementation();