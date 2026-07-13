import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(1, "Skill can't be empty").max(60, "Keep it short"),
});

export type SkillFormValues = z.infer<typeof skillSchema>;
