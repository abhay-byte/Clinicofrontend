import { UserProfile } from './auth.types';

export interface ExtendedUserProfile extends UserProfile {
  bio?: string;
}

export interface MedicalRecord {
  record_id: number;
  document_name: string;
  document_type: string;
  document_url: string;
  uploaded_at: string;
 comments_notes?: string;
  report_date?: string;
  file_format?: string;
  file_size_mb?: number;
}

export interface UploadRecordResponse {
  message: string;
  record: {
    recordId: number;
    documentName: string;
    documentType: string;
    documentUrl: string;
  };
}