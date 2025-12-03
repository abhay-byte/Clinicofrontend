import { doctorStorageService } from '../doctor-storage.service';
import { DoctorProfile, DoctorDashboardStats } from '../../types/doctor.types';

// Mock data for testing
const mockDoctorProfile: DoctorProfile = {
 professional_id: 1,
  professional_id_uuid: 'uuid-123',
  full_name: 'Dr. John Smith',
  email: 'john.smith@example.com',
  phone_number: '+1234567890',
  specialty: 'Cardiology',
  credentials: 'MD, PhD',
  years_of_experience: 10,
  verification_status: 'Verified',
  rating: 4.8,
  total_reviews: 150,
  patients_treated: 1200,
  languages_spoken: 'English, Spanish',
  working_hours: '9AM - 5PM',
  is_volunteer: false,
 user_id: 1,
  user_id_uuid: 'user-uuid-123',
  role: 'Professional',
  created_at: '2023-01-01T00:00:00Z'
};

const mockDashboardStats: DoctorDashboardStats = {
  rating: 4.8,
  total_reviews: 150,
  patients_treated: 1200,
  verification_status: 'Verified',
  is_volunteer: false,
  appointments_today_count: 8,
  pending_reports_count: 3
};

describe('DoctorStorageService', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('should store and retrieve doctor profile', () => {
    // Store the profile
    doctorStorageService.setDoctorProfile(mockDoctorProfile);
    
    // Retrieve the profile
    const retrievedProfile = doctorStorageService.getDoctorProfile();
    
    expect(retrievedProfile).toEqual(mockDoctorProfile);
  });

  test('should store and retrieve doctor dashboard stats', () => {
    // Store the stats
    doctorStorageService.setDoctorDashboardStats(mockDashboardStats);
    
    // Retrieve the stats
    const retrievedStats = doctorStorageService.getDoctorDashboardStats();
    
    expect(retrievedStats).toEqual(mockDashboardStats);
  });

 test('should update doctor profile', () => {
    // Store initial profile
    doctorStorageService.setDoctorProfile(mockDoctorProfile);
    
    // Update the profile
    const updates = { specialty: 'Neurology', years_of_experience: 15 };
    doctorStorageService.updateDoctorProfile(updates);
    
    // Retrieve the updated profile
    const updatedProfile = doctorStorageService.getDoctorProfile();
    
    expect(updatedProfile?.specialty).toBe('Neurology');
    expect(updatedProfile?.years_of_experience).toBe(15);
    expect(updatedProfile?.full_name).toBe(mockDoctorProfile.full_name); // Should remain unchanged
  });

  test('should update a single doctor profile field', () => {
    // Store initial profile
    doctorStorageService.setDoctorProfile(mockDoctorProfile);
    
    // Update a single field
    doctorStorageService.updateDoctorProfileField('specialty', 'Dermatology');
    
    // Retrieve the updated profile
    const updatedProfile = doctorStorageService.getDoctorProfile();
    
    expect(updatedProfile?.specialty).toBe('Dermatology');
    expect(updatedProfile?.full_name).toBe(mockDoctorProfile.full_name); // Should remain unchanged
  });

  test('should clear doctor data', () => {
    // Store data
    doctorStorageService.setDoctorProfile(mockDoctorProfile);
    doctorStorageService.setDoctorDashboardStats(mockDashboardStats);
    
    // Verify data is stored
    expect(doctorStorageService.hasDoctorData()).toBe(true);
    
    // Clear the data
    doctorStorageService.clearDoctorData();
    
    // Verify data is cleared
    expect(doctorStorageService.getDoctorProfile()).toBeNull();
    expect(doctorStorageService.getDoctorDashboardStats()).toBeNull();
    expect(doctorStorageService.hasDoctorData()).toBe(false);
  });

  test('should return null when no doctor data exists', () => {
    const profile = doctorStorageService.getDoctorProfile();
    const stats = doctorStorageService.getDoctorDashboardStats();
    
    expect(profile).toBeNull();
    expect(stats).toBeNull();
    expect(doctorStorageService.hasDoctorData()).toBe(false);
  });
});