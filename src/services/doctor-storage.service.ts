import { DoctorProfile, DoctorDashboardStats } from '../types/doctor.types';

const DOCTOR_PROFILE_KEY = 'doctor_profile';
const DOCTOR_DASHBOARD_STATS_KEY = 'doctor_dashboard_stats';

class DoctorStorageService {
  /**
   * Store doctor profile details in local storage
   * @param profile Doctor profile data
   */
  setDoctorProfile(profile: DoctorProfile): void {
    try {
      localStorage.setItem(DOCTOR_PROFILE_KEY, JSON.stringify(profile));
      console.log('Doctor profile stored in local storage:', profile);
    } catch (error) {
      console.error('Error storing doctor profile in local storage:', error);
    }
  }

 /**
   * Retrieve doctor profile details from local storage
   * @returns Doctor profile data or null if not found
   */
  getDoctorProfile(): DoctorProfile | null {
    try {
      const profileData = localStorage.getItem(DOCTOR_PROFILE_KEY);
      if (profileData) {
        const profile: DoctorProfile = JSON.parse(profileData);
        console.log('Doctor profile retrieved from local storage:', profile);
        return profile;
      }
      return null;
    } catch (error) {
      console.error('Error retrieving doctor profile from local storage:', error);
      return null;
    }
  }

 /**
   * Update specific fields in the doctor profile
   * @param updates Partial doctor profile with fields to update
   */
  updateDoctorProfile(updates: Partial<DoctorProfile>): void {
    try {
      const currentProfile = this.getDoctorProfile();
      if (currentProfile) {
        const updatedProfile = { ...currentProfile, ...updates };
        this.setDoctorProfile(updatedProfile);
        console.log('Doctor profile updated in local storage:', updatedProfile);
      } else {
        console.warn('No existing doctor profile found to update');
      }
    } catch (error) {
      console.error('Error updating doctor profile in local storage:', error);
    }
  }

 /**
   * Update a single field in the doctor profile
   * @param field The field name to update
   * @param value The new value for the field
   */
  updateDoctorProfileField<T extends keyof DoctorProfile>(field: T, value: DoctorProfile[T]): void {
    try {
      const currentProfile = this.getDoctorProfile();
      if (currentProfile) {
        const updatedProfile = { ...currentProfile, [field]: value };
        this.setDoctorProfile(updatedProfile);
        console.log(`Doctor profile field '${field}' updated in local storage:`, value);
      } else {
        console.warn('No existing doctor profile found to update');
      }
    } catch (error) {
      console.error(`Error updating doctor profile field '${field}' in local storage:`, error);
    }
  }

 /**
   * Store doctor dashboard statistics in local storage
   * @param stats Doctor dashboard statistics
   */
  setDoctorDashboardStats(stats: DoctorDashboardStats): void {
    try {
      localStorage.setItem(DOCTOR_DASHBOARD_STATS_KEY, JSON.stringify(stats));
      console.log('Doctor dashboard stats stored in local storage:', stats);
    } catch (error) {
      console.error('Error storing doctor dashboard stats in local storage:', error);
    }
  }

 /**
   * Retrieve doctor dashboard statistics from local storage
   * @returns Doctor dashboard statistics or null if not found
   */
  getDoctorDashboardStats(): DoctorDashboardStats | null {
    try {
      const statsData = localStorage.getItem(DOCTOR_DASHBOARD_STATS_KEY);
      if (statsData) {
        const stats: DoctorDashboardStats = JSON.parse(statsData);
        console.log('Doctor dashboard stats retrieved from local storage:', stats);
        return stats;
      }
      return null;
    } catch (error) {
      console.error('Error retrieving doctor dashboard stats from local storage:', error);
      return null;
    }
  }

 /**
   * Clear all doctor-related data from local storage
   */
  clearDoctorData(): void {
    try {
      localStorage.removeItem(DOCTOR_PROFILE_KEY);
      localStorage.removeItem(DOCTOR_DASHBOARD_STATS_KEY);
      console.log('Doctor data cleared from local storage');
    } catch (error) {
      console.error('Error clearing doctor data from local storage:', error);
    }
  }

 /**
   * Check if doctor data exists in local storage
   * @returns Boolean indicating if doctor data exists
   */
  hasDoctorData(): boolean {
    return this.getDoctorProfile() !== null;
  }
}

export const doctorStorageService = new DoctorStorageService();