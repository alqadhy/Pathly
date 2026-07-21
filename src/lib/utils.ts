import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { CVDraft } from '@/types/cv.types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(prefix = 'id'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

interface ATSWeights {
  personalInfo: number;
  contactInfo: number;
  summary: number;
  experience: number;
  education: number;
  skills: number;
}

const WEIGHTS: ATSWeights = {
  personalInfo: 15,
  contactInfo: 15,
  summary: 15,
  experience: 30,
  education: 10,
  skills: 15,
};

const MIN_BULLET_WORDS = 6; 
const IDEAL_SKILLS_COUNT = 6;
const IDEAL_EXPERIENCE_COUNT = 2;

export function calculateATSScore(cv: CVDraft): number {
  let score = 0;


  const { firstName, lastName, currentPosition, industry, location } = cv.personalInfo;
  const personalFilled = [firstName, lastName, currentPosition, industry, location].filter(Boolean).length;
  score += (personalFilled / 5) * WEIGHTS.personalInfo;

  
  const { email, phoneNumber, links } = cv.contactInfo;
  let contactScore = 0;
  if (email) contactScore += 0.5;
  if (phoneNumber) contactScore += 0.3;
  if (links.length > 0) contactScore += 0.2;
  score += contactScore * WEIGHTS.contactInfo;


  if (cv.summary) {
    const wordCount = cv.summary.trim().split(/\s+/).length;
 
    score += Math.min(wordCount / 40, 1) * WEIGHTS.summary;
  }


  if (cv.experience.length > 0) {
    const countRatio = Math.min(cv.experience.length / IDEAL_EXPERIENCE_COUNT, 1);
    const qualityRatio =
      cv.experience.reduce((acc, exp) => {
        const bulletCount = exp.bullets?.length ?? 0;
        const goodBullets = exp.bullets?.filter((b) => b.trim().split(/\s+/).length >= MIN_BULLET_WORDS).length ?? 0;
        const hasBasics = exp.company && exp.jobTitle ? 1 : 0.5;
        const bulletScore = bulletCount > 0 ? goodBullets / bulletCount : 0;
        return acc + (hasBasics * 0.5 + bulletScore * 0.5);
      }, 0) / cv.experience.length;
    score += ((countRatio + qualityRatio) / 2) * WEIGHTS.experience;
  }


  if (cv.education.length > 0) {
    const hasCompleteEntry = cv.education.some((e) => e.university && e.yearsOfGraduation);
    score += (hasCompleteEntry ? 1 : 0.5) * WEIGHTS.education;
  }


  if (cv.skills.length > 0) {
    score += Math.min(cv.skills.length / IDEAL_SKILLS_COUNT, 1) * WEIGHTS.skills;
  }

  return Math.round(Math.min(score, 100));
}


export function getATSScoreLabel(score: number): 'Needs Work' | 'Good' | 'Excellent' {
  if (score < 50) return 'Needs Work';
  if (score < 80) return 'Good';
  return 'Excellent';
}