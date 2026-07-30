import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SubmittedApplication, ApplicationStatus, InterviewDetails } from '../types/application.types';

interface ApplicationsStore {
  applications: SubmittedApplication[];

  addApplication: (application: Omit<SubmittedApplication, 'id' | 'submittedAt' | 'status'>) => void;
  getApplicationsByJobId: (jobId: string) => SubmittedApplication[];
  getAllApplications: () => SubmittedApplication[];

  // NEW
  getApplicationById: (id: string) => SubmittedApplication | undefined;
  updateApplicationStatus: (id: string, status: ApplicationStatus) => void;
  scheduleInterview: (id: string, interviewDetails: InterviewDetails) => void;
  seedApplications: (seed: SubmittedApplication[]) => void;
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

      getApplicationById: (id) => {
        return get().applications.find((app) => app.id === id);
      },

      updateApplicationStatus: (id, status) => {
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, status } : app
          ),
        }));
      },

      scheduleInterview: (id, interviewDetails) => {
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, status: 'interview', interviewDetails } : app
          ),
        }));
      },

      seedApplications: (seed) => {
        // Never overwrite real submissions — only fills the store the first time it's empty.
        if (get().applications.length === 0) {
          set({ applications: seed });
        }
      },
    }),
    {
      name: 'applications-storage',
    }
  )
);