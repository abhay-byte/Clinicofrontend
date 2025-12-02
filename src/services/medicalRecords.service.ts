import { apiRequest } from './api.service';
import { MedicalRecord, UploadRecordResponse } from '../types/user.types';

export const medicalRecordsService = {
  /**
   * Get all medical records for the logged-in user
   * GET /api/users/me/records
   */
  getAllRecords: async (): Promise<MedicalRecord[]> => {
    try {
      const response = await apiRequest.get('/users/me/records');
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Unauthorized: Please log in again');
      }
      throw new Error(error.response?.data?.message || 'Failed to fetch medical records');
    }
  },

  /**
   * Upload a new medical record
   * POST /api/users/me/records
   */
  uploadRecord: async (formData: FormData): Promise<UploadRecordResponse> => {
    try {
      const response = await apiRequest.post('/users/me/records', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Unauthorized: Please log in again');
      }
      throw new Error(error.response?.data?.message || 'Failed to upload medical record');
    }
  },

  /**
   * Delete a specific medical record
   * DELETE /api/users/me/records/:recordId
   */
  deleteRecord: async (recordId: number): Promise<{ message: string }> => {
    try {
      const response = await apiRequest.delete(`/users/me/records/${recordId}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Unauthorized: Please log in again');
      }
      throw new Error(error.response?.data?.message || 'Failed to delete medical record');
    }
 }
};