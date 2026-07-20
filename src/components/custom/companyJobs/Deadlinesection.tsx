import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { FieldWrapper } from "./FieldWrapper";
import type { JobPostingFormValues } from "@/schemas/jobPosting.schema";

interface DeadlineSectionProps {
  control: Control<JobPostingFormValues>;
  errors: FieldErrors<JobPostingFormValues>;
}

export function DeadlineSection({ control, errors }: DeadlineSectionProps) {
  return (
    <Controller
      control={control}
      name="applicationDeadline"
      render={({ field }) => (
        <FieldWrapper
          label="Application Deadline"
          error={errors.applicationDeadline?.message}
        >
          <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--input)] p-2 w-fit">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={{ before: new Date() }}
            />
          </div>
        </FieldWrapper>
      )}
    />
  );
}