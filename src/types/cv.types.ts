// ==========================================
// Personal & Contact Info
// ==========================================

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  industry: string;
  currentPosition: string;
  location: string;
  avatarUrl?: string; // uploaded by user, stored as base64 or blob URL (no backend)
}

export interface ContactLink {
  id: string;
  label: string; // e.g. "Behance", "LinkedIn", "Portfolio"
  url: string;
}

export interface ContactInfo {
  email: string;
  phoneNumber: string;
  links: ContactLink[];
}

// ==========================================
// Education
// ==========================================

export interface EducationEntry {
  id: string;
  university: string;
  yearsOfGraduation: string;
  degree?: string;
  fieldOfStudy?: string;
}

// ==========================================
// Experience
// ==========================================

export interface ExperienceEntry {
  id: string;
  company: string;
  jobTitle: string;
  yearsOfExperience: string;
  startDate?: string;
  endDate?: string; // undefined/"Present" if current job
  description?: string;
  bullets?: string[]; // achievements/responsibilities, used in Preview
}

// ==========================================
// Skills
// ==========================================

export interface SkillEntry {
  id: string;
  name: string;
}

// ==========================================
// Full CV Draft (what the builder form manages)
// ==========================================

export interface CVDraft {
  id: string;
  templateId: string | null;
  creationMode: 'ai' | 'manual';
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: SkillEntry[];
  summary?: string; // AI generated or manually written
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// Builder Steps (for the manual multi-step form)
// ==========================================

export type BuilderStep =
  | 'personalInfo'
  | 'contactInfo'
  | 'education'
  | 'experience'
  | 'skills'
  | 'preview';

export const BUILDER_STEPS_ORDER: BuilderStep[] = [
  'personalInfo',
  'contactInfo',
  'education',
  'experience',
  'skills',
  'preview',
];
