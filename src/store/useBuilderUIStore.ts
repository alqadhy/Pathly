import { create } from 'zustand';
import { BUILDER_STEPS_ORDER, type BuilderStep } from '@/types/cv.types';

interface BuilderUIState {
  // which entry point the user picked on the Dashboard, carried through
  // the Template Selection screen to know where to route next
  selectedMode: 'ai' | 'manual' | null;
  setSelectedMode: (mode: 'ai' | 'manual' | null) => void;

  // selected template id, set on the "Choose a Template" screen
  selectedTemplateId: string | null;
  setSelectedTemplateId: (id: string | null) => void;

  // current step in the manual multi-step form
  currentStep: BuilderStep;
  goToStep: (step: BuilderStep) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;

  // preview modal
  isPreviewOpen: boolean;
  openPreview: () => void;
  closePreview: () => void;
}

export const useBuilderUIStore = create<BuilderUIState>((set, get) => ({
  selectedMode: null,
  setSelectedMode: (mode) => set({ selectedMode: mode }),

  selectedTemplateId: null,
  setSelectedTemplateId: (id) => set({ selectedTemplateId: id }),

  currentStep: 'personalInfo',
  goToStep: (step) => set({ currentStep: step }),

  goToNextStep: () => {
    const { currentStep } = get();
    const idx = BUILDER_STEPS_ORDER.indexOf(currentStep);
    const next = BUILDER_STEPS_ORDER[Math.min(idx + 1, BUILDER_STEPS_ORDER.length - 1)];
    set({ currentStep: next });
  },

  goToPrevStep: () => {
    const { currentStep } = get();
    const idx = BUILDER_STEPS_ORDER.indexOf(currentStep);
    const prev = BUILDER_STEPS_ORDER[Math.max(idx - 1, 0)];
    set({ currentStep: prev });
  },

  isPreviewOpen: false,
  openPreview: () => set({ isPreviewOpen: true }),
  closePreview: () => set({ isPreviewOpen: false }),
}));
