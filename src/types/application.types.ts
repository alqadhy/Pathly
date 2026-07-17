export type EmploymentType = "Full Time" | "Part Time" | "Internship" | "Contract" | "Freelance";
export type YearsOfExperience = "1 years" | "1-2 years" | "2-5 years" | "6-10 years" | "10-15 years";
export type QuestionType = "Multiple Choice" | "Check Box" | "Long Answer" | "Short Answer";

export interface PortfolioLink {
  url: string;
}

export interface ScreeningQuestion {
  id?: string;
  question: string;
  type: QuestionType;
  options?: string[];
  answer?: string;
}

export interface JobApplicationMockData {
  id: string;
  jobTitle: string;
  company: string;
  screeningQuestions: Omit<ScreeningQuestion, 'answer'>[];
}

export interface JobApplicationFormData {
  name: string;
  email: string;
  phoneNumber: string;
  location: string;
  currentJobTitle?: string;
  currentCompany?: string;
  employmentType: EmploymentType;
  yearsOfExperience: YearsOfExperience;
  resumeFile?: File;
  portfolioLinks?: PortfolioLink[];
  screeningQuestions?: ScreeningQuestion[];
}

export interface SubmittedApplication extends Omit<JobApplicationFormData, 'resumeFile'> {
  id: string;
  jobId: string; 
  jobTitle: string;
  companyName: string;
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'rejected' | 'hired';
  resumeUrl?: string; 
}