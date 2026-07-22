import { z } from "zod";

export const employmentTypes = [
  "Full Time",
  "Part Time",
  "Internship",
  "Contract",
  "Freelance",
] as const;

export const workplaceTypes = ["On-site", "Hybrid", "Remote"] as const;

export const experienceLevels = [
  "Entry Level",
  "Junior",
  "Mid Level",
  "Senior Level",
  "Lead",
  "Manager",
] as const;

export const experienceYears = [
  "0 years",
  "1 years",
  "2 years",
  "3 years",
  "4 years",
  "5+ years",
] as const;

export const jobTitles = [
  "Design",
  "Engineering",
  "Marketing",
  "HR",
  "Sales",
  "Product",
  "Finance",  
] as const;

export const jobPostingSchema = z
  .object({
    jobTitle: z.string().min(1, "Job title is required"),
    employmentType: z.enum(employmentTypes, {
      required_error: "Employment type is required",
    }),
    workplaceType: z.enum(workplaceTypes, {
      required_error: "Workplace type is required",
    }),
    numberOfOpenings: z.coerce
      .number({ invalid_type_error: "Number of openings is required" })
      .int("Must be a whole number")
      .min(1, "Must have at least 1 opening"),
    experienceLevel: z.enum(experienceLevels, {
      required_error: "Experience level is required",
    }),
    experience: z.enum(experienceYears, {
      required_error: "Experience is required",
    }),
    minSalary: z.coerce
      .number({ invalid_type_error: "Minimum salary is required" })
      .min(0, "Minimum salary can't be negative"),
    maxSalary: z.coerce
      .number({ invalid_type_error: "Maximum salary is required" })
      .min(0, "Maximum salary can't be negative"),
    hideSalary: z.boolean().default(false),
    applicationDeadline: z.date({
      required_error: "Application deadline is required",
    }),
    jobDescription: z
      .string()
      .min(1, "Job description is required")
      .max(2000, "Keep it under 2000 characters"),
    responsibilities: z
      .string()
      .min(1, "Responsibilities are required")
      .max(2000, "Keep it under 2000 characters"),
    requirements: z
      .string()
      .min(1, "Requirements are required")
      .max(2000, "Keep it under 2000 characters"),
    softSkills: z.string().max(2000, "Keep it under 2000 characters").optional(),
    benefits: z.string().max(2000, "Keep it under 2000 characters").optional(),
  })
  .refine((data) => data.maxSalary >= data.minSalary, {
    message: "Maximum salary must be greater than or equal to minimum salary",
    path: ["maxSalary"],
  });

export type JobPostingFormValues = z.infer<typeof jobPostingSchema>;

export const jobPostingDefaultValues: Partial<JobPostingFormValues> = {
  hideSalary: false,
};