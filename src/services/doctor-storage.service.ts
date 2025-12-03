import { DoctorProfile, DoctorDashboardStats } from '../types/doctor.types';

interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  appreciatedAspects: string[];
  createdAt: string;
}

const DOCTOR_PROFILE_KEY = 'doctor_profile';
const DOCTOR_DASHBOARD_STATS_KEY = 'doctor_dashboard_stats';
const DOCTOR_REVIEWS_KEY = 'doctor_reviews';

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
  
  /**
   * Store doctor reviews in local storage
   * @param reviews Array of doctor reviews
   */
  setDoctorReviews(reviews: Review[]): void {
    try {
      localStorage.setItem(DOCTOR_REVIEWS_KEY, JSON.stringify(reviews));
      console.log('Doctor reviews stored in local storage:', reviews);
    } catch (error) {
      console.error('Error storing doctor reviews in local storage:', error);
    }
  }

  /**
   * Retrieve doctor reviews from local storage
   * @returns Array of doctor reviews or empty array if not found
   */
  getDoctorReviews(): Review[] {
    try {
      const reviewsData = localStorage.getItem(DOCTOR_REVIEWS_KEY);
      if (reviewsData) {
        const reviews: Review[] = JSON.parse(reviewsData);
        console.log('Doctor reviews retrieved from local storage:', reviews);
        return reviews;
      }
      return [];
    } catch (error) {
      console.error('Error retrieving doctor reviews from local storage:', error);
      return [];
    }
  }
  
  /**
   * Add a single review to the doctor's reviews
   * @param review New review to add
   */
  addDoctorReview(review: Review): void {
    try {
      const currentReviews = this.getDoctorReviews();
      const updatedReviews = [...currentReviews, review];
      this.setDoctorReviews(updatedReviews);
      console.log('Doctor review added to local storage:', review);
    } catch (error) {
      console.error('Error adding doctor review to local storage:', error);
    }
  }
  
  /**
   * Update a specific review
   * @param reviewId ID of the review to update
   * @param updatedReview Updated review data
   */
  updateDoctorReview(reviewId: string, updatedReview: Partial<Review>): void {
    try {
      const currentReviews = this.getDoctorReviews();
      const updatedReviews = currentReviews.map(review =>
        review.id === reviewId ? { ...review, ...updatedReview } : review
      );
      this.setDoctorReviews(updatedReviews);
      console.log(`Doctor review with ID '${reviewId}' updated in local storage:`, updatedReview);
    } catch (error) {
      console.error(`Error updating doctor review with ID '${reviewId}' in local storage:`, error);
    }
  }
  
  /**
   * Delete a specific review
   * @param reviewId ID of the review to delete
   */
  deleteDoctorReview(reviewId: string): void {
    try {
      const currentReviews = this.getDoctorReviews();
      const updatedReviews = currentReviews.filter(review => review.id !== reviewId);
      this.setDoctorReviews(updatedReviews);
      console.log(`Doctor review with ID '${reviewId}' deleted from local storage`);
    } catch (error) {
      console.error(`Error deleting doctor review with ID '${reviewId}' from local storage:`, error);
    }
 }
}

export const doctorStorageService = new DoctorStorageService();