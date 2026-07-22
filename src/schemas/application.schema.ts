import { z } from "zod";

export const EmploymentTypeEnum = z.enum(["Full Time", "Part Time", "Internship", "Contract", "Freelance"] as const);
export const YearsOfExperienceEnum = z.enum(["1 years", "1-2 years", "2-5 years", "6-10 years", "10-15 years"] as const);
export const QuestionTypeEnum = z.enum(["Multiple Choice", "Check Box", "Long Answer", "Short Answer", ""] as const);


export const ScreeningQuestionSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(1, "Question is required"),
  type: QuestionTypeEnum.optional(),
  options: z.array(z.string()).optional(),
  answer: z.string().min(1, "Answer is required"),

});

export const JobApplicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),

  currentJobTitle: z.string().optional(),
  currentCompany: z.string().optional(),
  employmentType: EmploymentTypeEnum,
  yearsOfExperience: YearsOfExperienceEnum,

   resumeFile: z.instanceof(File, { message: "Resume is required" }),
  portfolioLinks: z.array(z.object({ url: z.string().url("Invalid URL") })).optional(),

  screeningQuestions: z.array(ScreeningQuestionSchema).optional(),
});

export type JobApplicationFormData = z.infer<typeof JobApplicationSchema>;