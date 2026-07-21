import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { personalInfoSchema, type PersonalInfoFormValues } from "@/schemas/personalInfo.schema";
import { INDUSTRIES } from "@/constants/industries";
import { useCVStore } from "@/store/useCVStore";

const inputClass =
  "bg-(--input) border-transparent rounded-(--radius-sm) h-11 px-4 text-(--text-primary) placeholder:text-(--muted-foreground) focus-visible:ring-2 focus-visible:ring-(--ring)";

function PersonalInfoForm() {
  const personalInfo = useCVStore((s) => s.draft.personalInfo);
  const setPersonalInfo = useCVStore((s) => s.setPersonalInfo);

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo,
    mode: "onBlur",
  });

  function handleField<K extends keyof PersonalInfoFormValues>(field: K, value: PersonalInfoFormValues[K]) {
    setPersonalInfo({ ...personalInfo, [field]: value });
  }

  return (
    <div className="rounded-(--radius-lg) border border-(--border) bg-(--card) shadow-(--shadow-card) p-6 flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="relative size-12 rounded-full bg-(--primary-light) flex items-center justify-center shrink-0 overflow-hidden">
          <User size={22} className="text-(--primary)" />
        </div>
        <h3 className="text-h4-size! text-bold!">Personal Info</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="firstName" className="text-semibold! text-body-md!">First name</Label>
          <Input
            id="firstName"
            {...register("firstName", { onChange: (e) => handleField("firstName", e.target.value) })}
            placeholder="Ahmed"
            className={inputClass}
          />
          {errors.firstName && <p className="text-xs text-(--danger)">{errors.firstName.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lastName" className="text-semibold! text-body-md!">Last name</Label>
          <Input
            id="lastName"
            {...register("lastName", { onChange: (e) => handleField("lastName", e.target.value) })}
            placeholder="Hossam"
            className={inputClass}
          />
          {errors.lastName && <p className="text-xs text-(--danger)">{errors.lastName.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="industry" className="text-semibold! text-body-md!">Industry</Label>
          <Select
            value={watch("industry")}
            onValueChange={(v) => {
              setValue("industry", v as PersonalInfoFormValues["industry"]);
              handleField("industry", v as PersonalInfoFormValues["industry"]);
            }}
          >
            <SelectTrigger id="industry" className={inputClass}>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.industry && <p className="text-xs text-(--danger)">{errors.industry.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="currentPosition" className="text-semibold! text-body-md!">Current position</Label>
          <Input
            id="currentPosition"
            {...register("currentPosition", { onChange: (e) => handleField("currentPosition", e.target.value) })}
            placeholder="Senior Product Designer"
            className={inputClass}
          />
          {errors.currentPosition && <p className="text-xs text-(--danger)">{errors.currentPosition.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="location" className="text-semibold! text-body-md!">Location</Label>
          <Input
            id="location"
            {...register("location", { onChange: (e) => handleField("location", e.target.value) })}
            placeholder="Cairo, Egypt"
            className={inputClass}
          />
          {errors.location && <p className="text-xs text-(--danger)">{errors.location.message}</p>}
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoForm;