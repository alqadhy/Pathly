import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldWrapper } from "./FieldWrapper";
import type { JobPostingFormValues } from "@/schemas/jobPosting.schema";

interface CompensationSectionProps {
  control: Control<JobPostingFormValues>;
  errors: FieldErrors<JobPostingFormValues>;
}

export function CompensationSection({
  control,
  errors,
}: CompensationSectionProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        <Controller
          control={control}
          name="minSalary"
          render={({ field }) => (
            <FieldWrapper
              label="Minimum Salary"
              htmlFor="minSalary"
              error={errors.minSalary?.message}
            >
              <Input
                id="minSalary"
                type="number"
                min={0}
                {...field}
                className="bg-[var(--input)] border-[var(--border)]"
              />
            </FieldWrapper>
          )}
        />

        <Controller
          control={control}
          name="maxSalary"
          render={({ field }) => (
            <FieldWrapper
              label="Maximum Salary"
              htmlFor="maxSalary"
              error={errors.maxSalary?.message}
            >
              <Input
                id="maxSalary"
                type="number"
                min={0}
                {...field}
                className="bg-[var(--input)] border-[var(--border)]"
              />
            </FieldWrapper>
          )}
        />
      </div>

      <Controller
        control={control}
        name="hideSalary"
        render={({ field }) => (
          <div className="flex items-center gap-2">
            <Checkbox
              id="hideSalary"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label
              htmlFor="hideSalary"
              className="text-sm font-normal text-[var(--normal)] cursor-pointer"
            >
              Hide Salary
            </label>
          </div>
        )}
      />
    </div>
  );
}