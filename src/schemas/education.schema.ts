import { z } from "zod";

export const educationSchema = z.object({
  university: z.string().min(1, "University is required"),
  yearsOfGraduation: z
    .string()
    .min(4, "Enter a valid year")
    .regex(/^\d{4}$/, "Enter a 4-digit year"),
  degree: z.string().optional(),
  fieldOfStudy: z.string().optional(),
});

export type EducationFormValues = z.infer<typeof educationSchema>;
