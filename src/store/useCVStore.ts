import { create } from 'zustand';
import { generateId } from '@/lib/utils';
import type {
  CVDraft,
  ContactLink,
  EducationEntry,
  ExperienceEntry,
  PersonalInfo,
  SkillEntry,
} from '@/types/cv.types';

function createEmptyCV(): CVDraft {
  const now = new Date().toISOString();
  return {
    id: generateId('cv'),
    templateId: null,
    creationMode: 'manual',
    personalInfo: {
      firstName: '',
      lastName: '',
      industry: '',
      currentPosition: '',
      location: '',
      avatarUrl: '',
    },
    contactInfo: {
      email: '',
      phoneNumber: '',
      links: [],
    },
    education: [],
    experience: [],
    skills: [],
    summary: '',
    createdAt: now,
    updatedAt: now,
  };
}

interface CVStoreState {
  draft: CVDraft;

  startNewDraft: (mode: 'ai' | 'manual', templateId: string) => void;
  loadDraft: (draft: CVDraft) => void;
  resetDraft: () => void;

  setPersonalInfo: (data: Partial<PersonalInfo>) => void;

  setContactInfo: (data: Partial<Pick<CVDraft['contactInfo'], 'email' | 'phoneNumber'>>) => void;
  addContactLink: (link: Omit<ContactLink, 'id'>) => void;
  removeContactLink: (id: string) => void;

  addEducation: (entry?: Partial<EducationEntry>) => void;
  updateEducation: (id: string, data: Partial<EducationEntry>) => void;
  removeEducation: (id: string) => void;

  addExperience: (entry?: Partial<ExperienceEntry>) => void;
  updateExperience: (id: string, data: Partial<ExperienceEntry>) => void;
  removeExperience: (id: string) => void;

  addSkill: (name: string) => void;
  removeSkill: (id: string) => void;

  setSummary: (summary: string) => void;
}

export const useCVStore = create<CVStoreState>((set) => ({
  draft: createEmptyCV(),

  startNewDraft: (mode, templateId) =>
    set(() => ({
      draft: { ...createEmptyCV(), creationMode: mode, templateId },
    })),

  loadDraft: (draft) => set({ draft }),

  resetDraft: () => set({ draft: createEmptyCV() }),

  setPersonalInfo: (data) =>
    set((state) => ({
      draft: {
        ...state.draft,
        personalInfo: { ...state.draft.personalInfo, ...data },
        updatedAt: new Date().toISOString(),
      },
    })),

  setContactInfo: (data) =>
    set((state) => ({
      draft: {
        ...state.draft,
        contactInfo: { ...state.draft.contactInfo, ...data },
        updatedAt: new Date().toISOString(),
      },
    })),

  addContactLink: (link) =>
    set((state) => ({
      draft: {
        ...state.draft,
        contactInfo: {
          ...state.draft.contactInfo,
          links: [...state.draft.contactInfo.links, { ...link, id: generateId('link') }],
        },
        updatedAt: new Date().toISOString(),
      },
    })),

  removeContactLink: (id) =>
    set((state) => ({
      draft: {
        ...state.draft,
        contactInfo: {
          ...state.draft.contactInfo,
          links: state.draft.contactInfo.links.filter((l) => l.id !== id),
        },
        updatedAt: new Date().toISOString(),
      },
    })),

  addEducation: (entry) =>
    set((state) => ({
      draft: {
        ...state.draft,
        education: [
          ...state.draft.education,
          { id: generateId('edu'), university: '', yearsOfGraduation: '', ...entry },
        ],
        updatedAt: new Date().toISOString(),
      },
    })),

  updateEducation: (id, data) =>
    set((state) => ({
      draft: {
        ...state.draft,
        education: state.draft.education.map((e) => (e.id === id ? { ...e, ...data } : e)),
        updatedAt: new Date().toISOString(),
      },
    })),

  removeEducation: (id) =>
    set((state) => ({
      draft: {
        ...state.draft,
        education: state.draft.education.filter((e) => e.id !== id),
        updatedAt: new Date().toISOString(),
      },
    })),

  addExperience: (entry) =>
    set((state) => ({
      draft: {
        ...state.draft,
        experience: [
          ...state.draft.experience,
          {
            id: generateId('exp'),
            company: '',
            jobTitle: '',
            yearsOfExperience: '',
            bullets: [],
            ...entry,
          },
        ],
        updatedAt: new Date().toISOString(),
      },
    })),

  updateExperience: (id, data) =>
    set((state) => ({
      draft: {
        ...state.draft,
        experience: state.draft.experience.map((e) => (e.id === id ? { ...e, ...data } : e)),
        updatedAt: new Date().toISOString(),
      },
    })),

  removeExperience: (id) =>
    set((state) => ({
      draft: {
        ...state.draft,
        experience: state.draft.experience.filter((e) => e.id !== id),
        updatedAt: new Date().toISOString(),
      },
    })),

  addSkill: (name) =>
    set((state) => {
      if (!name.trim()) return state;
      const newSkill: SkillEntry = { id: generateId('skill'), name: name.trim() };
      return {
        draft: {
          ...state.draft,
          skills: [...state.draft.skills, newSkill],
          updatedAt: new Date().toISOString(),
        },
      };
    }),

  removeSkill: (id) =>
    set((state) => ({
      draft: {
        ...state.draft,
        skills: state.draft.skills.filter((s) => s.id !== id),
        updatedAt: new Date().toISOString(),
      },
    })),

  setSummary: (summary) =>
    set((state) => ({
      draft: { ...state.draft, summary, updatedAt: new Date().toISOString() },
    })),
}));
