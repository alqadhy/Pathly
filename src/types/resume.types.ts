import type { CVDraft } from './cv.types';

export interface ResumeSummary {
  id: string;
  title: string; 
  creationMode: 'ai' | 'manual';
  templateId: string;
  atsScore: number; 
  thumbnail?: string; 
  lastEditedAt: string; 
}


export interface ResumeRecord extends ResumeSummary {
  data: CVDraft;
}
