export type WorkType = "Onsite" | "Hybrid" | "Remote";

export interface Job {
  id: number;
  title: string;
  company: string;
  companyLogo: string; 
  location: string;
  workType: WorkType;
  isViewed: boolean;
  postedAt: string;

  mutualConnectionsCount?: number;
}


export interface Internship extends Job {
  duration: string; 
}

export type JobTag = "Hybrid" | "Onsite" | "Remote" | "Full time" | "Part time" | string;

export interface QualificationMatch {
  percentage: number; 
  strengths: string[]; 
  gaps: string[]; 
}

export interface HiringContact {
  name: string;
  role: string;
  avatar: string;
}


export interface JobDetail extends Job {
  tags: JobTag[];
  qualificationMatch?: QualificationMatch;
  hiringContact?: HiringContact;
  companyAbout: string;
  roleAbout: string;
  responsibilities: string[];
  benefits: string[];
}