export const INDUSTRIES = [
  'Design & Technology',
  'Software Engineering',
  'Marketing & Communications',
  'Finance & Accounting',
  'Sales & Business Development',
  'Human Resources',
  'Healthcare',
  'Education',
  'Legal',
  'Operations & Supply Chain',
  'Customer Service',
  'Media & Content',
] as const;

export type Industry = (typeof INDUSTRIES)[number];
