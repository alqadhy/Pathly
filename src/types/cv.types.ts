export interface PersonalInfo {
  firstName: string;
  lastName: string;
  industry: string;
  currentPosition: string;
  location: string;
  avatarUrl?: string; 
}

export interface ContactLink {
  id: string;
  label: string; 
  url: string;
}

export interface ContactInfo {
  email: string;
  phoneNumber: string;
  links: ContactLink[];
}


export interface EducationEntry {
  id: string;
  university: string;
  yearsOfGraduation: string;
  degree?: string;
  fieldOfStudy?: string;
}


export interface ExperienceEntry {
  id: string;
  company: string;
  jobTitle: string;
  yearsOfExperience: string;
  startDate?: string;
  endDate?: string; 
  description?: string;
  bullets?: string[];
}


export interface SkillEntry {
  id: string;
  name: string;
}


export interface CVDraft {
  id: string;
  templateId: string | null;
  creationMode: 'ai' | 'manual';
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: SkillEntry[];
  summary?: string; 
  createdAt: string;
  updatedAt: string;
}


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
