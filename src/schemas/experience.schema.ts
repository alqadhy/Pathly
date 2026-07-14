import { z } from "zod";

export const experienceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  yearsOfExperience: z
    .string()
    .min(1, "Required")
    .regex(/^\d+(\.\d+)?$/, "Enter a number"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

export type ExperienceFormValues = z.infer<typeof experienceSchema>;
