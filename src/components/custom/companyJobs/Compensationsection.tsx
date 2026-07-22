import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldWrapper } from "./FieldWrapper";
import type { JobPostingFormValues } from "@/schemas/jobPosting.schema";

interface CompensationSectionProps {
  control: Control<JobPostingFormValues>;
  errors: FieldErrors<JobPostingFormValues>;
  // لو حبيت تتحكم في الاختفاء من بره، تقدر تضيف hideSalary هنا وتديرها
}

export function CompensationSection({
  control,
  errors,
}: CompensationSectionProps) {
  return (
    <div className=" bg-slate-50  rounded-xl">
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
                className="bg-white! border-0 shadow-sm rounded-sm! w-full h-14! focus-visible:ring-2 focus-visible:ring-indigo-500"
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
                className="bg-white! border-0 shadow-sm rounded-sm w-full h-14! focus-visible:ring-2 focus-visible:ring-indigo-500"
              />
            </FieldWrapper>
          )}
        />
      </div>

      <Controller
        control={control}
        name="hideSalary"
        render={({ field }) => (
          <div className="flex items-center gap-2 mt-3">
            <Checkbox
              id="hideSalary"
              checked={field.value}
              onCheckedChange={field.onChange}
              className="peer h-5 w-5 shrink-0 rounded-sm border-2 border-slate-300 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[state=checked]:border-blue-600"
            />
            <label
              htmlFor="hideSalary"
              className="text-sm font-medium leading-none text-slate-800 cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
            >
              Hide Salary
            </label>
          </div>
        )}
      />
    </div>
  );
}