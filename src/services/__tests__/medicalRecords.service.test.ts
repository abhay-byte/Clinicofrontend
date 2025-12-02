import axios from 'axios';
import { medicalRecordsService } from '../medicalRecords.service';

// Mock the apiRequest to isolate testing of the service
jest.mock('../api.service', () => ({
  apiRequest: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockedApi = require('../api.service').apiRequest;

describe('medicalRecordsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllRecords', () => {
    it('should fetch all medical records successfully', async () => {
      const mockRecords = [
        {
          record_id: 1,
          document_name: 'Test Report',
          document_type: 'lab_report',
          document_url: 'http://example.com/test.pdf',
          uploaded_at: '2025-01-01T00:00:00.000Z',
          comments_notes: 'Test comment',
          report_date: '2024-12-31',
          file_format: 'PDF',
          file_size_mb: 1.5,
        },
      ];

      (mockedApi.get as jest.MockedFunction<any>).mockResolvedValue({
        data: mockRecords,
      });

      const result = await medicalRecordsService.getAllRecords();

      expect(mockedApi.get).toHaveBeenCalledWith('/users/me/records');
      expect(result).toEqual(mockRecords);
    });

    it('should handle error when fetching medical records fails', async () => {
      const errorMessage = 'Failed to fetch records';
      (mockedApi.get as jest.MockedFunction<any>).mockRejectedValue({
        response: {
          status: 500,
          data: { message: errorMessage },
        },
      });

      await expect(medicalRecordsService.getAllRecords()).rejects.toThrow(errorMessage);
    });

    it('should handle unauthorized error', async () => {
      (mockedApi.get as jest.MockedFunction<any>).mockRejectedValue({
        response: {
          status: 401,
        },
      });

      await expect(medicalRecordsService.getAllRecords()).rejects.toThrow(
        'Unauthorized: Please log in again'
      );
    });
  });

  describe('uploadRecord', () => {
    it('should upload a medical record successfully', async () => {
      const mockFormData = new FormData();
      const mockResponse = {
        message: 'Medical record uploaded successfully',
        record: {
          recordId: 1,
          documentName: 'Test Report',
          documentType: 'lab_report',
          documentUrl: 'http://example.com/test.pdf',
        },
      };

      (mockedApi.post as jest.MockedFunction<any>).mockResolvedValue({
        data: mockResponse,
      });

      const result = await medicalRecordsService.uploadRecord(mockFormData);

      expect(mockedApi.post).toHaveBeenCalledWith('/users/me/records', mockFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle error when uploading medical record fails', async () => {
      const errorMessage = 'Failed to upload record';
      const mockFormData = new FormData();
      (mockedApi.post as jest.MockedFunction<any>).mockRejectedValue({
        response: {
          status: 500,
          data: { message: errorMessage },
        },
      });

      await expect(medicalRecordsService.uploadRecord(mockFormData)).rejects.toThrow(errorMessage);
    });

    it('should handle unauthorized error during upload', async () => {
      const mockFormData = new FormData();
      (mockedApi.post as jest.MockedFunction<any>).mockRejectedValue({
        response: {
          status: 401,
        },
      });

      await expect(medicalRecordsService.uploadRecord(mockFormData)).rejects.toThrow(
        'Unauthorized: Please log in again'
      );
    });
  });

  describe('deleteRecord', () => {
    it('should delete a medical record successfully', async () => {
      const recordId = 1;
      const mockResponse = {
        message: 'Medical record deleted successfully',
      };

      (mockedApi.delete as jest.MockedFunction<any>).mockResolvedValue({
        data: mockResponse,
      });

      const result = await medicalRecordsService.deleteRecord(recordId);

      expect(mockedApi.delete).toHaveBeenCalledWith(`/users/me/records/${recordId}`);
      expect(result).toEqual(mockResponse);
    });

    it('should handle error when deleting medical record fails', async () => {
      const recordId = 1;
      const errorMessage = 'Failed to delete record';
      (mockedApi.delete as jest.MockedFunction<any>).mockRejectedValue({
        response: {
          status: 500,
          data: { message: errorMessage },
        },
      });

      await expect(medicalRecordsService.deleteRecord(recordId)).rejects.toThrow(errorMessage);
    });

    it('should handle unauthorized error during delete', async () => {
      const recordId = 1;
      (mockedApi.delete as jest.MockedFunction<any>).mockRejectedValue({
        response: {
          status: 401,
        },
      });

      await expect(medicalRecordsService.deleteRecord(recordId)).rejects.toThrow(
        'Unauthorized: Please log in again'
      );
    });
  });
});