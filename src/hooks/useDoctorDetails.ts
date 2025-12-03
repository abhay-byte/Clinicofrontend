import { useState, useEffect } from 'react';
import { doctorStorageService } from '../services/doctor-storage.service';
import { DoctorProfile, DoctorDashboardStats } from '../types/doctor.types';
import { authService } from '../services/auth.service';

export const useDoctorDetails = () => {
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | null>(null);
  const [dashboardStats, setDashboardStats] = useState<DoctorDashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load doctor data from local storage on mount
  useEffect(() => {
    const loadDoctorData = async () => {
      try {
        setIsLoading(true);
        const profile = doctorStorageService.getDoctorProfile();
        const stats = doctorStorageService.getDoctorDashboardStats();
        
        setDoctorProfile(profile);
        setDashboardStats(stats);
      } catch (err) {
        console.error('Error loading doctor data:', err);
        setError('Failed to load doctor data');
      } finally {
        setIsLoading(false);
      }
    };

    loadDoctorData();

    // Listen for storage changes (in case another tab updates the data)
    const handleStorageChange = () => {
      const profile = doctorStorageService.getDoctorProfile();
      const stats = doctorStorageService.getDoctorDashboardStats();
      setDoctorProfile(profile);
      setDashboardStats(stats);
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Function to update doctor profile
  const updateDoctorProfile = async (profileData: Partial<DoctorProfile>) => {
    try {
      setError(null);
      // Update via API
      await authService.updateDoctorProfile(profileData);
      // Update local state
      setDoctorProfile(prev => prev ? { ...prev, ...profileData } : null);
    } catch (err) {
      console.error('Error updating doctor profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to update doctor profile');
      throw err;
    }
  };

  // Function to refresh doctor data from API
  const refreshDoctorData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await authService.cacheDoctorDetails();
      
      // Reload data from local storage
      const profile = doctorStorageService.getDoctorProfile();
      const stats = doctorStorageService.getDoctorDashboardStats();
      
      setDoctorProfile(profile);
      setDashboardStats(stats);
    } catch (err) {
      console.error('Error refreshing doctor data:', err);
      setError(err instanceof Error ? err.message : 'Failed to refresh doctor data');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update a single field in the doctor profile
  const updateDoctorProfileField = <T extends keyof DoctorProfile>(field: T, value: DoctorProfile[T]) => {
    try {
      doctorStorageService.updateDoctorProfileField(field, value);
      setDoctorProfile(prev => prev ? { ...prev, [field]: value } : null);
    } catch (err) {
      console.error(`Error updating doctor profile field ${String(field)}:`, err);
      setError(err instanceof Error ? err.message : `Failed to update field ${String(field)}`);
    }
  };

  return {
    doctorProfile,
    dashboardStats,
    isLoading,
    error,
    updateDoctorProfile,
    updateDoctorProfileField,
    refreshDoctorData,
    hasDoctorData: doctorStorageService.hasDoctorData(),
    fetchDoctorReviews: authService.fetchDoctorReviews,
  };
};