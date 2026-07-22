import { create } from "zustand";
import type { JobPostingFormValues } from "../schemas/jobPosting.schema";

interface JobPostingState {
  /** Controls the "Public preview" dialog visibility */
  isPreviewOpen: boolean;
  openPreview: () => void;
  closePreview: () => void;

  /** Last snapshot of the form, kept so the preview can render without re-validating */
  draft: Partial<JobPostingFormValues> | null;
  setDraft: (values: Partial<JobPostingFormValues>) => void;
  resetDraft: () => void;
}

export const useJobPostingStore = create<JobPostingState>((set) => ({
  isPreviewOpen: false,
  openPreview: () => set({ isPreviewOpen: true }),
  closePreview: () => set({ isPreviewOpen: false }),

  draft: null,
  setDraft: (values) => set({ draft: values }),
  resetDraft: () => set({ draft: null }),
}));