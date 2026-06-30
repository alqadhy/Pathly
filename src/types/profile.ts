// src/types/profile.ts
export interface PersonalInfo {
  username: string;
  email: string;
  phone: string;
  location: string;
  currentPosition: string;
  industry: string;
  links: {
    platform: string;
    url: string;
  }[];
}

export interface Activity {
  id: string;
  content: string;
  timestamp: string;
  likes?: number;
  comments?: number;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuedDate: string;
  expiryDate?: string;
  credentialId?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  location?: string;
  description: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Course {
  id: string;
  name: string;
  provider: string;
  completionDate: string;
  skills: string[];
}

export interface CV {
  fileName: string;
  fileSize: string;
  uploadDate: string;
  fileUrl: string;
}

export interface ProfileImage {
  url: string;
  alt?: string;
}

export interface Profile {
  id: string;
  name: string;
  title: string;
  followers: number;
  location: string;
  industry: string;
  about: string;
  personalInfo: PersonalInfo;
  activities: Activity[];
  skills: Skill[];
  certifications: Certification[];
  experience: Experience[];
  education: Education[];
  courses: Course[];
  cv: CV | null;
  coverImage: ProfileImage;
  avatarImage: ProfileImage;
}