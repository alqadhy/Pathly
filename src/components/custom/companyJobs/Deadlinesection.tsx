import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { DayPicker } from "react-day-picker";
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
          <div className="rounded-lg bg-white p-6 w-full ">
            <DayPicker
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={{ before: new Date() }}
              showOutsideDays
              classNames={{
                months: "flex flex-col",
                month: "w-full",
                month_caption: "flex justify-center items-center pb-6",
                caption_label: "text-[15px] font-medium text-gray-900",
                nav: "hidden",
                month_grid: "w-full border-collapse",
                weekdays: "grid grid-cols-7 mb-4",
                weekday:
                  "text-[13px] font-normal text-gray-400 text-center",
                week: "grid grid-cols-7 mb-2",
                day: "text-center p-0",
                day_button:
                  "h-9 w-9 mx-auto flex items-center justify-center text-[15px] font-normal text-gray-900 rounded-full hover:bg-primary-light-hover transition-colors",
                selected:
                  "[&>button]:bg-primary-light [&>button]:text-black [&>button]:hover:bg-primary-light-hover",
                today: "[&>button]:font-semibold",
                outside: "[&>button]:text-gray-300",
                disabled: "[&>button]:text-gray-300 [&>button]:opacity-60",
              }}
            />
          </div>
        </FieldWrapper>
      )}
    />
  );
}