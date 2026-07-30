import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useForm,
  useFieldArray,
  Controller,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { APP_ROUTES } from "../../../constants";
// Components
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

// Icons
import {
  Bookmark,
  ChevronRight,
  FileUp,
  ImagePlus,
  Inbox,
  PencilLine,
  PlusIcon,
  Trash2,
  X,
} from "lucide-react";

// Helper Functions
import { getCurrentUser } from "../Profile/crud/profileStorage";
import { getNames } from "country-list";

export function SelectBox({
  items,
  value,
  onValueChange,
  placeholder,
}: {
  items: string[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-red-500 mt-1.5">{message}</p>;
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8 text-normal">
      <Inbox size={28} className="opacity-50" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

const isValidUrl = (value: string) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const optionalText = z.string().optional().default("");

const optionalNumericString = z
  .string()
  .optional()
  .default("")
  .refine((val) => !val || /^\d+$/.test(val), {
    message: "Enter a valid number",
  });

const optionalUrlString = z
  .string()
  .optional()
  .default("")
  .refine((val) => !val || isValidUrl(val), {
    message: "Enter a valid URL (e.g. https://example.com)",
  });

const urlTypeOptions = ["Portfolio", "LinkedIn", "Behance", "GitHub", "Other"];
const employmentStatusOptions = [
  "Student",
  "Trainee",
  "Employed",
  "Unemployed",
];

const educationSchema = z.object({
  university: optionalText,
  yearsOfEducation: optionalNumericString,
});

const experienceSchema = z.object({
  company: optionalText,
  jobTitle: optionalText,
  yearsOfExperience: optionalNumericString,
});

const urlSchema = z.object({
  type: optionalText,
  value: optionalUrlString,
});

const skillSchema = z.object({
  value: z.string(),
});

const onboardingSchema = z.object({
  profileImage: z.any().optional(),

  country: optionalText,
  field: optionalText,

  jobTitle: optionalText,
  yearsOfExperience: optionalNumericString,
  company: optionalText,
  employmentStatus: optionalText,

  interests: optionalText,
  workSettings: optionalText,

  education: z.array(educationSchema).optional().default([]),
  experience: z.array(experienceSchema).optional().default([]),
  skills: z.array(skillSchema).optional().default([]),
  resume: z.any().optional(),
  urls: z.array(urlSchema).optional().default([]),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

function StudentOnBoarding() {
  const userData = getCurrentUser();
  const allCountries = getNames();
  const navigate = useNavigate();

  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null,
  );
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [skillDraft, setSkillDraft] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      country: "",
      field: "",
      jobTitle: "",
      yearsOfExperience: "",
      company: "",
      employmentStatus: "",
      interests: "",
      workSettings: "",
      education: [{ university: "", yearsOfEducation: "" }],
      experience: [{ company: "", jobTitle: "", yearsOfExperience: "" }],
      skills: [],
      urls: [
        { type: "Portfolio", value: "" },
        { type: "LinkedIn", value: "" },
        { type: "Behance", value: "" },
        { type: "GitHub", value: "" },
      ],
    },
  });

  const educationArray = useFieldArray({ control, name: "education" });
  const experienceArray = useFieldArray({ control, name: "experience" });
  const urlsArray = useFieldArray({ control, name: "urls" });
  const skillsArray = useFieldArray({ control, name: "skills" });

  const resumeRegister = register("resume");

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profileImage", e.target.files);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resumeRegister.onChange(e);
    const file = e.target.files?.[0];
    setResumeFileName(file ? file.name : null);
  };

  const addSkill = () => {
    const trimmed = skillDraft.trim();
    if (!trimmed) return;
    const alreadyExists = watch("skills").some(
      (s) => s.value.toLowerCase() === trimmed.toLowerCase(),
    );
    if (alreadyExists) {
      setSkillDraft("");
      return;
    }
    skillsArray.append({ value: trimmed });
    setSkillDraft("");
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    }
  };

  const buildOnboardingSnapshot = (data: OnboardingFormValues) => ({
    country: data.country || "",
    field: data.field || "",

    jobTitle: data.jobTitle || "",
    yearsOfExperience: data.yearsOfExperience || "",
    company: data.company || "",
    employmentStatus: data.employmentStatus || "",

    interests: data.interests || "",
    workSettings: data.workSettings || "",

    education: (data.education ?? []).map((e) => ({
      university: e.university || "",
      yearsOfEducation: e.yearsOfEducation || "",
    })),

    experience: (data.experience ?? []).map((e) => ({
      company: e.company || "",
      jobTitle: e.jobTitle || "",
      yearsOfExperience: e.yearsOfExperience || "",
    })),

    skills: (data.skills ?? []).map((s) => s.value),

    urls: (data.urls ?? []).map((u) => ({
      type: u.type || "",
      value: u.value || "",
    })),

    resumeFileName: data.resume?.[0]?.name ?? "",
    profileImageName: data.profileImage?.[0]?.name ?? "",
  });

  const onSubmit: SubmitHandler<OnboardingFormValues> = (data) => {
    const snapshot = buildOnboardingSnapshot(data);
    localStorage.setItem("onboardingData", JSON.stringify(snapshot));
    navigate("/student/dashboard");
  };

  const handleSkip = () => {
    const emptySnapshot = buildOnboardingSnapshot({
      country: "",
      field: "",
      jobTitle: "",
      yearsOfExperience: "",
      company: "",
      employmentStatus: "",
      interests: "",
      workSettings: "",
      education: [],
      experience: [],
      skills: [],
      urls: [],
      resume: undefined,
      profileImage: undefined,
    });
    localStorage.setItem("onboardingData", JSON.stringify(emptySnapshot));
    navigate(APP_ROUTES.auth.login);
  };

  return (
    <main className="p-12">
      <form
        className="max-w-[800px] mx-auto grid gap-12"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="heading">
          <button
            type="button"
            onClick={handleSkip}
            className="skip-btn xl:absolute top-19 right-12 z-(--z-dropdown) w-fit py-4 xl:p-4 flex items-center justify-center text-primary text-lg font-semibold transition hover:text-primary-hover"
            title="Skip for now"
          >
            Skip Now <ChevronRight />
          </button>
          <h1>Complete Your Professional Profile</h1>
          <p className="text-normal mt-4">
            Add your skills, experience, and career goals to unlock personalized
            opportunities and start applying for jobs.
          </p>
        </div>

        <div className="grid gap-4">
          {/* Information About You */}
          <div className="box">
            <h3>Information About you</h3>
            <div className="bg-card mt-4 p-6 rounded-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="upload-profile">
                  <label
                    htmlFor="profile-image"
                    className="cursor-pointer text-normal bg-input w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden"
                  >
                    {profileImagePreview ? (
                      <img
                        src={profileImagePreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <ImagePlus size={50} />
                    )}
                    <span className="bg-input w-8 h-8 border border-muted rounded-full flex items-center justify-center absolute top-8 left-8">
                      <PencilLine size={16} />
                    </span>
                  </label>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleProfileImageChange}
                  />
                </div>
                <div>
                  <h5>{userData?.fullName}</h5>
                  <div className="flex items-center gap-4 mt-2 text-sm text-normal">
                    <span>{userData?.phone}</span>
                    <span>{userData?.email}</span>
                  </div>
                </div>
              </div>

              <div className="inputs grid grid-cols-2 gap-8">
                <div className="field">
                  <h6 className="mb-2">Country</h6>
                  <Controller
                    control={control}
                    name="country"
                    render={({ field }) => (
                      <SelectBox
                        items={allCountries}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select a country"
                      />
                    )}
                  />
                  <FieldError message={errors.country?.message} />
                </div>
                <div className="field">
                  <h6 className="mb-2">Field</h6>
                  <Input {...register("field")} />
                  <FieldError message={errors.field?.message} />
                </div>
              </div>
            </div>
          </div>
          {/* Professional Information */}
          <div className="box">
            <h3>Professional Information</h3>
            <div className="bg-card mt-4 p-6 rounded-lg">
              <div className="inputs grid grid-cols-2 gap-8">
                <div className="field">
                  <h6 className="mb-2">Current Job Title</h6>
                  <Input {...register("jobTitle")} />
                  <FieldError message={errors.jobTitle?.message} />
                </div>
                <div className="field">
                  <h6 className="mb-2">Years Of Experience</h6>
                  <Input
                    inputMode="numeric"
                    {...register("yearsOfExperience")}
                  />
                  <FieldError message={errors.yearsOfExperience?.message} />
                </div>
                <div className="field">
                  <h6 className="mb-2">Company</h6>
                  <Input {...register("company")} />
                  <FieldError message={errors.company?.message} />
                </div>
                <div className="field">
                  <h6 className="mb-2">Employment Status</h6>
                  <Controller
                    control={control}
                    name="employmentStatus"
                    render={({ field }) => (
                      <SelectBox
                        items={employmentStatusOptions}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select status"
                      />
                    )}
                  />
                  <FieldError message={errors.employmentStatus?.message} />
                </div>
              </div>
            </div>
          </div>
          {/* Interested */}
          <div className="box">
            <h3>Interested</h3>
            <div className="bg-card mt-4 p-6 rounded-lg">
              <div className="inputs grid grid-cols-2 gap-8">
                <div className="field">
                  <h6 className="mb-2">What are you interested in</h6>
                  <Input {...register("interests")} />
                  <FieldError message={errors.interests?.message} />
                </div>
                <div className="field">
                  <h6 className="mb-2">Prefered Work Settings</h6>
                  <Input {...register("workSettings")} />
                  <FieldError message={errors.workSettings?.message} />
                </div>
              </div>
            </div>
          </div>
          {/* Education */}
          <div className="box">
            <h3>Education</h3>
            <div className="bg-card mt-4 p-6 rounded-lg grid gap-6">
              {educationArray.fields.length === 0 && (
                <EmptyState message="No education added yet." />
              )}

              {educationArray.fields.map((item, index) => (
                <div
                  key={item.id}
                  className="grid gap-4 pb-6 border-b border-muted last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center justify-between">
                    <h6 className="text-normal font-medium">
                      Education {index + 1}
                    </h6>
                    <button
                      type="button"
                      onClick={() => educationArray.remove(index)}
                      className="text-red-500 hover:text-red-600 transition"
                      title="Remove education"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="inputs grid grid-cols-2 gap-8">
                    <div className="field">
                      <h6 className="mb-2">University</h6>
                      <Input
                        {...register(`education.${index}.university` as const)}
                      />
                      <FieldError
                        message={errors.education?.[index]?.university?.message}
                      />
                    </div>
                    <div className="field">
                      <h6 className="mb-2">Years Of Education</h6>
                      <Input
                        inputMode="numeric"
                        {...register(
                          `education.${index}.yearsOfEducation` as const,
                        )}
                      />
                      <FieldError
                        message={
                          errors.education?.[index]?.yearsOfEducation?.message
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                onClick={() =>
                  educationArray.append({
                    university: "",
                    yearsOfEducation: "",
                  })
                }
                className="self-end ml-auto bg-primary hover:bg-(--primary-hover) text-white rounded-(--radius-sm) py-6 px-4 flex w-fit"
              >
                Add Education <PlusIcon />
              </Button>
            </div>
          </div>
          {/* Experience */}
          <div className="box">
            <h3>Experience</h3>
            <div className="bg-card mt-4 p-6 rounded-lg grid gap-6">
              {experienceArray.fields.length === 0 && (
                <EmptyState message="No experience added yet." />
              )}

              {experienceArray.fields.map((item, index) => (
                <div
                  key={item.id}
                  className="grid gap-4 pb-6 border-b border-muted last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center justify-between">
                    <h6 className="text-normal font-medium">
                      Experience {index + 1}
                    </h6>
                    <button
                      type="button"
                      onClick={() => experienceArray.remove(index)}
                      className="text-red-500 hover:text-red-600 transition"
                      title="Remove experience"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="inputs grid grid-cols-2 gap-8">
                    <div className="field">
                      <h6 className="mb-2">Company</h6>
                      <Input
                        {...register(`experience.${index}.company` as const)}
                      />
                      <FieldError
                        message={errors.experience?.[index]?.company?.message}
                      />
                    </div>
                    <div className="field">
                      <h6 className="mb-2">Job Title</h6>
                      <Input
                        {...register(`experience.${index}.jobTitle` as const)}
                      />
                      <FieldError
                        message={errors.experience?.[index]?.jobTitle?.message}
                      />
                    </div>
                    <div className="field">
                      <h6 className="mb-2">Years Of Experience</h6>
                      <Input
                        inputMode="numeric"
                        {...register(
                          `experience.${index}.yearsOfExperience` as const,
                        )}
                      />
                      <FieldError
                        message={
                          errors.experience?.[index]?.yearsOfExperience?.message
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                onClick={() =>
                  experienceArray.append({
                    company: "",
                    jobTitle: "",
                    yearsOfExperience: "",
                  })
                }
                className="self-end ml-auto bg-primary hover:bg-(--primary-hover) text-white rounded-(--radius-sm) py-6 px-4 flex w-fit"
              >
                Add Experience <PlusIcon />
              </Button>
            </div>
          </div>
          {/* Skills */}
          <div className="box">
            <h3>Skills</h3>
            <div className="bg-card mt-4 p-6 rounded-lg">
              <h6 className="mb-2">What skills do you have?</h6>
              <div className="flex gap-3">
                <Input
                  value={skillDraft}
                  onChange={(e) => setSkillDraft(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="Type a skill and press Enter"
                />
                <Button
                  type="button"
                  onClick={addSkill}
                  className="bg-primary hover:bg-(--primary-hover) text-white rounded-(--radius-sm) px-4 flex w-fit shrink-0"
                >
                  Add
                </Button>
              </div>

              {skillsArray.fields.length === 0 ? (
                <EmptyState message="No skills added yet." />
              ) : (
                <div className="flex flex-wrap gap-2 mt-4">
                  {skillsArray.fields.map((item, index) => (
                    <span
                      key={item.id}
                      className="bg-input text-normal rounded-full pl-4 pr-2 py-1.5 flex items-center gap-2 text-sm"
                    >
                      {item.value}
                      <button
                        type="button"
                        onClick={() => skillsArray.remove(index)}
                        className="hover:text-red-500 transition"
                        title="Remove skill"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Resume */}
          <div className="box">
            <h3>Resume</h3>
            <div className="bg-card mt-4 p-6 rounded-lg">
              <div className="upload-profile">
                <label
                  htmlFor="cv-input"
                  className="h-[168px] flex flex-col gap-4 items-center justify-center bg-background rounded-lg text-primary cursor-pointer border-primary border-dashed border-2"
                >
                  <FileUp size={80} />
                  <span className="font-semibold">
                    {resumeFileName ?? "Upload Resume"}
                  </span>
                </label>
                <input
                  id="cv-input"
                  type="file"
                  accept=".pdf, .docx, .doc"
                  hidden
                  {...resumeRegister}
                  onChange={handleResumeChange}
                />
              </div>
              <FieldError message={errors.resume?.message as string} />
            </div>
          </div>
          {/* URLs */}
          <div className="box">
            <h3>Add URL</h3>
            <div className="bg-card mt-4 p-6 rounded-lg grid gap-6">
              {urlsArray.fields.length === 0 && (
                <EmptyState message="No URLs added yet." />
              )}

              {urlsArray.fields.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-end gap-6 pb-6 border-b border-muted last:border-b-0 last:pb-0"
                >
                  <div className="field">
                    <h6 className="mb-2">Type</h6>
                    <Controller
                      control={control}
                      name={`urls.${index}.type` as const}
                      render={({ field }) => (
                        <SelectBox
                          items={urlTypeOptions}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select type"
                        />
                      )}
                    />
                    <FieldError message={errors.urls?.[index]?.type?.message} />
                  </div>
                  <div className="field flex-1">
                    <h6 className="mb-2">URL</h6>
                    <Input
                      placeholder="https://"
                      {...register(`urls.${index}.value` as const)}
                    />
                    <FieldError
                      message={errors.urls?.[index]?.value?.message}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => urlsArray.remove(index)}
                    className="text-red-500 hover:text-red-600 transition mb-3.5"
                    title="Remove URL"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

              <Button
                type="button"
                onClick={() => urlsArray.append({ type: "Other", value: "" })}
                className="self-end ml-auto bg-primary hover:bg-(--primary-hover) text-white rounded-(--radius-sm) py-6 px-4 flex w-fit"
              >
                Add URL <PlusIcon />
              </Button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-14 rounded-sm text-lg text-white"
        >
          {isSubmitting ? "Saving..." : "Save"} <Bookmark fill="#fff" />
        </Button>
      </form>
    </main>
  );
}

export default StudentOnBoarding;