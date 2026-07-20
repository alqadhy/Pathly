import { Controller, type Control, type FieldErrors } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FieldWrapper } from "./FieldWrapper";
import {
  employmentTypes,
  experienceLevels,
  experienceYears,
  jobTitles,
  workplaceTypes,
  type JobPostingFormValues,
} from "@/schemas/jobPosting.schema";

interface JobDetailsSectionProps {
  control: Control<JobPostingFormValues>;
  errors: FieldErrors<JobPostingFormValues>;
}

export function JobDetailsSection({ control, errors }: JobDetailsSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
      <Controller
        control={control}
        name="jobTitle"
        render={({ field }) => (
          <FieldWrapper label="Job Title" error={errors.jobTitle?.message}>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="bg-[var(--input)] border-[var(--border)]">
                <SelectValue placeholder="Select job title" />
              </SelectTrigger>
              <SelectContent>
                {jobTitles.map((title) => (
                  <SelectItem key={title} value={title}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldWrapper>
        )}
      />

      <Controller
        control={control}
        name="employmentType"
        render={({ field }) => (
          <FieldWrapper
            label="Employment Type"
            error={errors.employmentType?.message}
          >
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="bg-[var(--input)] border-[var(--border)]">
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                {employmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldWrapper>
        )}
      />

      <Controller
        control={control}
        name="workplaceType"
        render={({ field }) => (
          <FieldWrapper
            label="Workplace Type"
            error={errors.workplaceType?.message}
          >
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="bg-[var(--input)] border-[var(--border)]">
                <SelectValue placeholder="Select workplace type" />
              </SelectTrigger>
              <SelectContent>
                {workplaceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldWrapper>
        )}
      />

      <Controller
        control={control}
        name="numberOfOpenings"
        render={({ field }) => (
          <FieldWrapper
            label="Number of Openings"
            htmlFor="numberOfOpenings"
            error={errors.numberOfOpenings?.message}
          >
            <Input
              id="numberOfOpenings"
              type="number"
              min={1}
              {...field}
              className="bg-[var(--input)] border-[var(--border)]"
            />
          </FieldWrapper>
        )}
      />

      <Controller
        control={control}
        name="experienceLevel"
        render={({ field }) => (
          <FieldWrapper
            label="Experience Level"
            error={errors.experienceLevel?.message}
          >
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="bg-[var(--input)] border-[var(--border)]">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldWrapper>
        )}
      />

      <Controller
        control={control}
        name="experience"
        render={({ field }) => (
          <FieldWrapper label="Experience" error={errors.experience?.message}>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="bg-[var(--input)] border-[var(--border)]">
                <SelectValue placeholder="Select years of experience" />
              </SelectTrigger>
              <SelectContent>
                {experienceYears.map((years) => (
                  <SelectItem key={years} value={years}>
                    {years}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldWrapper>
        )}
      />
    </div>
  );
}