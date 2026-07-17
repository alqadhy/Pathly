import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type  { SubmittedApplication } from '../types/application.types';

interface ApplicationsStore {
  applications: SubmittedApplication[];
  
  addApplication: (application: Omit<SubmittedApplication, 'id' | 'submittedAt' | 'status'>) => void;
  getApplicationsByJobId: (jobId: string) => SubmittedApplication[];
  getAllApplications: () => SubmittedApplication[];
}

export const useApplicationsStore = create<ApplicationsStore>()(
  persist(
    (set, get) => ({
      applications: [],

      addApplication: (applicationData) => {
        const newApplication: SubmittedApplication = {
          ...applicationData,
          id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          submittedAt: new Date().toISOString(),
          status: 'pending',
        };

        set((state) => ({
          applications: [...state.applications, newApplication],
        }));
        
        console.log('Application stored in Zustand:', newApplication);
      },

      getApplicationsByJobId: (jobId) => {
        return get().applications.filter((app) => app.jobId === jobId);
      },

      getAllApplications: () => {
        return get().applications;
      },
    }),
    {
      name: 'applications-storage', 
    }
  )
);