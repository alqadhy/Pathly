import type { CVDraft } from './cv.types';

// This is the shape shown as a "card" in the Dashboard ("Your Resume" section)
export interface ResumeSummary {
  id: string;
  title: string; // e.g. "Product Designer CV"
  creationMode: 'ai' | 'manual';
  templateId: string;
  atsScore: number; // 0-100, computed via calculateATSScore()
  thumbnail?: string; // small preview image/snapshot, optional
  lastEditedAt: string; // ISO date string
}

// Full record combining the dashboard card info + the actual CV data
// (in a real backend this would be one table; here we keep them separate
// in localStorage: one key for the list of summaries, one per-CV for full data)
export interface ResumeRecord extends ResumeSummary {
  data: CVDraft;
}
