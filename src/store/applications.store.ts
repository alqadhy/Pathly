import { create } from "zustand";
import { persist } from "zustand/middleware";

import { applicationsService } from "../Services/applications.service";
import type {
  JobPost,
  ApplicationStatus,
} from "../Services/applications.service";

/* -------------------------------------------------------------------------- */
/*  Store shape                                                               */
/* -------------------------------------------------------------------------- */

interface ApplicationsState {
  applications: JobPost[];
  isLoading: boolean;
  error: string | null;
  hasFetched: boolean;

  /** Fetches applications from the service (only if not already loaded). */
  fetchApplications: () => Promise<void>;
  /** Force a fresh fetch, ignoring anything already persisted. */
  refetchApplications: () => Promise<void>;

  markAsViewed: (id: number) => void;
  updateStatus: (id: number, status: ApplicationStatus) => void;
  deleteApplication: (id: number) => void;
}

/* -------------------------------------------------------------------------- */
/*  Store                                                                     */
/* -------------------------------------------------------------------------- */

export const useApplicationsStore = create<ApplicationsState>()(
  persist(
    (set, get) => ({
      applications: [],
      isLoading: false,
      error: null,
      hasFetched: false,

      fetchApplications: async () => {
        // Data already loaded (e.g. restored from localStorage) — skip refetch.
        if (get().hasFetched) return;

        set({ isLoading: true, error: null });
        try {
          const data = await applicationsService.getApplications();
          set({ applications: data, isLoading: false, hasFetched: true });
        } catch {
          set({
            isLoading: false,
            error: "Something went wrong while loading your applications.",
          });
        }
      },

      refetchApplications: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await applicationsService.getApplications();
          set({ applications: data, isLoading: false, hasFetched: true });
        } catch {
          set({
            isLoading: false,
            error: "Something went wrong while loading your applications.",
          });
        }
      },

      markAsViewed: (id) =>
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, isViewed: true } : app,
          ),
        })),

      updateStatus: (id, status) =>
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, status } : app,
          ),
        })),

      deleteApplication: (id) =>
        set((state) => ({
          applications: state.applications.filter((app) => app.id !== id),
        })),
    }),
    {
      name: "applications-storage", // localStorage key
      partialize: (state) => ({
        applications: state.applications,
        hasFetched: state.hasFetched,
      }),
    },
  ),
);
