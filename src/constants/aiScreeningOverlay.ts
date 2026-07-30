export interface QualificationCheck {
  label: string;
  passed: boolean;
}

export interface AiScreeningResult {
  matchScore: number; // 0-100
  qualifications: QualificationCheck[];
}

const DEFAULT_QUALIFICATIONS: QualificationCheck[] = [
  { label: 'Up to 3 years of experience', passed: true },
  { label: 'Strong UX/UI design experience (web & mobile)', passed: true },
  { label: 'Proficient in Figma, prototyping, and design systems', passed: true },
  { label: 'Good understanding of user-centered design & usability principles', passed: true },
  { label: 'Experience in end-to-end product design flow', passed: true },
  { label: 'Solid portfolio with real projects (freelance / products)', passed: true },
  { label: 'Ability to collaborate with product & dev teams', passed: true },
  { label: 'Limited experience in senior leadership / mentoring designers', passed: false },
  { label: 'Less exposure to large-scale enterprise or complex systems', passed: false },
  { label: 'Limited ownership of full product strategy at business level', passed: false },
];

export function getAiScreening(applicationId: string): AiScreeningResult {
  let hash = 0;
  for (let i = 0; i < applicationId.length; i++) {
    hash = (hash * 31 + applicationId.charCodeAt(i)) % 1000;
  }
  const matchScore = 70 + (hash % 26); 

  return {
    matchScore,
    qualifications: DEFAULT_QUALIFICATIONS,
  };
}