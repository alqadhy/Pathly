import { z } from "zod";

export const contactLinkSchema = z.object({
  label: z.string().min(1, "Label is required"),
  url: z.string().url("Enter a valid URL"),
});

export const contactInfoSchema = z.object({
  email: z.string().email("Enter a valid email"),
  phoneNumber: z
    .string()
    .min(7, "Enter a valid phone number")
    .regex(/^[+\d\s()-]+$/, "Only digits, spaces, +, -, ( ) allowed"),
});

export type ContactInfoFormValues = z.infer<typeof contactInfoSchema>;
export type ContactLinkFormValues = z.infer<typeof contactLinkSchema>;
