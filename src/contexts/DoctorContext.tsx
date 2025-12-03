import React, { createContext, useContext, ReactNode } from 'react';
import { useDoctorDetails } from '../hooks/useDoctorDetails';
import { DoctorProfile, DoctorDashboardStats } from '../types/doctor.types';

interface DoctorContextType {
  doctorProfile: DoctorProfile | null;
  dashboardStats: DoctorDashboardStats | null;
  isLoading: boolean;
  error: string | null;
  updateDoctorProfile: (profileData: Partial<DoctorProfile>) => Promise<void>;
  updateDoctorProfileField: <T extends keyof DoctorProfile>(field: T, value: DoctorProfile[T]) => void;
  refreshDoctorData: () => Promise<void>;
  hasDoctorData: boolean;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

interface DoctorProviderProps {
  children: ReactNode;
}

export const DoctorProvider: React.FC<DoctorProviderProps> = ({ children }) => {
  const doctorDetails = useDoctorDetails();

  return (
    <DoctorContext.Provider value={doctorDetails}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctorContext = (): DoctorContextType => {
  const context = useContext(DoctorContext);
  if (context === undefined) {
    throw new Error('useDoctorContext must be used within a DoctorProvider');
  }
  return context;
};