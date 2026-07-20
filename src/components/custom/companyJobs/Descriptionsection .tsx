import type { Control, FieldErrors } from "react-hook-form";
import { AITextareaField } from "./AITextareaField";
import type { JobPostingFormValues } from "@/schemas/jobPosting.schema";

interface DescriptionSectionProps {
  control: Control<JobPostingFormValues>;
  errors: FieldErrors<JobPostingFormValues>;
  rewritingField: keyof JobPostingFormValues | null;
  onRewriteWithAI: (
    field: keyof JobPostingFormValues,
    currentValue: string
  ) => void;
}

const DESCRIPTION_FIELDS: {
  name: keyof JobPostingFormValues;
  label: string;
}[] = [
  { name: "jobDescription", label: "Job Description" },
  { name: "responsibilities", label: "Responsibilities" },
  { name: "requirements", label: "Requirements" },
  { name: "softSkills", label: "Soft Skills" },
  { name: "benefits", label: "Benefits" },
];

export function DescriptionSection({
  control,
  errors,
  rewritingField,
  onRewriteWithAI,
}: DescriptionSectionProps) {
  return (
    <div className="space-y-6">
      {DESCRIPTION_FIELDS.map(({ name, label }) => (
        <AITextareaField
          key={name}
          control={control}
          name={name}
          label={label}
          errors={errors}
          isRewriting={rewritingField === name}
          onRewriteWithAI={(currentValue) => onRewriteWithAI(name, currentValue)}
        />
      ))}
    </div>
  );
}