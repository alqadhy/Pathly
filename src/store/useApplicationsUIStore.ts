import { create } from 'zustand';
import type { ApplicationStatus } from '../types/application.types';

type ActiveModal = 'details' | 'interview' | 'message' | null;

interface ApplicationsUIStore {
  search: string;
  statusFilter: ApplicationStatus | 'all';
  sortBy: 'submittedAt' | 'name';

  selectedApplicationId: string | null;
  activeModal: ActiveModal;

  setSearch: (value: string) => void;
  setStatusFilter: (value: ApplicationStatus | 'all') => void;
  setSortBy: (value: 'submittedAt' | 'name') => void;

  openDetails: (applicationId: string) => void;
  openInterview: (applicationId: string) => void;
  openMessage: (applicationId: string) => void;
  closeModal: () => void;
}

export const useApplicationsUIStore = create<ApplicationsUIStore>((set) => ({
  search: '',
  statusFilter: 'all',
  sortBy: 'submittedAt',

  selectedApplicationId: null,
  activeModal: null,

  setSearch: (value) => set({ search: value }),
  setStatusFilter: (value) => set({ statusFilter: value }),
  setSortBy: (value) => set({ sortBy: value }),

  openDetails: (applicationId) =>
    set({ selectedApplicationId: applicationId, activeModal: 'details' }),
  openInterview: (applicationId) =>
    set({ selectedApplicationId: applicationId, activeModal: 'interview' }),
  openMessage: (applicationId) =>
    set({ selectedApplicationId: applicationId, activeModal: 'message' }),
  closeModal: () => set({ activeModal: null }),
}));