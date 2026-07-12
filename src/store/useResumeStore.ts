import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { calculateATSScore, generateId } from '@/lib/utils';
import type { CVDraft } from '@/types/cv.types';
import type { ResumeRecord } from '@/types/resume.types';

interface ResumeStoreState {
  resumes: ResumeRecord[];
  hasHydratedSeed: boolean; 


  hydrateSeed: (seed: ResumeRecord[]) => void;


  saveResume: (draft: CVDraft, title?: string) => ResumeRecord;
  deleteResume: (id: string) => void;
  getResumeById: (id: string) => ResumeRecord | undefined;
  duplicateResume: (id: string) => void;
}

export const useResumeStore = create<ResumeStoreState>()(
  persist(
    (set, get) => ({
      resumes: [],
      hasHydratedSeed: false,

      hydrateSeed: (seed) => {
        
     
        if (get().hasHydratedSeed || get().resumes.length > 0) return;
        set({ resumes: seed, hasHydratedSeed: true });
      },

      saveResume: (draft, title) => {
        const existing = get().resumes.find((r) => r.id === draft.id);
        const atsScore = calculateATSScore(draft);
        const now = new Date().toISOString();

        const record: ResumeRecord = {
          id: draft.id,
          title: title ?? existing?.title ?? `${draft.personalInfo.currentPosition || 'Untitled'} CV`,
          creationMode: draft.creationMode,
          templateId: draft.templateId ?? 'simple-classic',
          atsScore,
          thumbnail: existing?.thumbnail,
          lastEditedAt: now,
          data: draft,
        };

        set((state) => {
          const withoutCurrent = state.resumes.filter((r) => r.id !== draft.id);
          return { resumes: [record, ...withoutCurrent] };
        });

        return record;
      },

      deleteResume: (id) =>
        set((state) => ({ resumes: state.resumes.filter((r) => r.id !== id) })),

      getResumeById: (id) => get().resumes.find((r) => r.id === id),

      duplicateResume: (id) => {
        const original = get().resumes.find((r) => r.id === id);
        if (!original) return;
        const newId = generateId('cv');
        const now = new Date().toISOString();
        const copy: ResumeRecord = {
          ...original,
          id: newId,
          title: `${original.title} (Copy)`,
          lastEditedAt: now,
          data: { ...original.data, id: newId, createdAt: now, updatedAt: now },
        };
        set((state) => ({ resumes: [copy, ...state.resumes] }));
      },
    }),
    {
      name: 'pathly-resumes', 
    },
  ),
);
