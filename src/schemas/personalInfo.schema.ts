import { z } from "zod";
import { INDUSTRIES } from "@/constants/industries";

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  industry: z.enum(INDUSTRIES, { errorMap: () => ({ message: "Please select an industry" }) }),
  currentPosition: z.string().min(1, "Current position is required"),
  location: z.string().min(1, "Location is required"),
  avatarUrl: z.string().optional(),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
