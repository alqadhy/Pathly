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

// Components
import { Button } from "../..//ui/button";
import { Input } from "../..//ui/input";
import { Textarea } from "../..//ui/textarea";
import { Switch } from "../..//ui/switch";
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
  Download,
  FileText,
  FileUp,
  ImagePlus,
  Inbox,
  PencilLine,
  PlusIcon,
  Trash2,
} from "lucide-react";

// Helper Functions
import { getCurrentUser } from "./../Profile/crud/profileStorage";
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
      <SelectTrigger className="w-full">
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

/* -------------------------------------------------------------------------- */
/*  Small reusable UI helpers                                                */
/* -------------------------------------------------------------------------- */

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

const isUrlLike = (value: string) => {
  try {
    new URL(value);
    return true;
  } catch {
    try {
      new URL(`https://${value}`);
      return true;
    } catch {
      return false;
    }
  }
};

const isEmailLike = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const optionalText = z.string().optional().default("");

const optionalYear = z
  .string()
  .optional()
  .default("")
  .refine((val) => !val || /^\d{4}$/.test(val), {
    message: "Enter a valid 4-digit year",
  });

const optionalEmail = z
  .string()
  .optional()
  .default("")
  .refine((val) => !val || isEmailLike(val), {
    message: "Enter a valid email address",
  });

const optionalUrl = z
  .string()
  .optional()
  .default("")
  .refine((val) => !val || isUrlLike(val), {
    message: "Enter a valid URL (e.g. yourcompany.com)",
  });

const industryOptions = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "Retail",
  "Manufacturing",
  "Real Estate",
  "Hospitality",
  "Media & Entertainment",
  "Non-Profit",
  "Other",
];

const companySizeOptions = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "500-1,200",
  "1,200+",
];

const presenceTypeOptions = [
  "Website",
  "LinkedIn",
  "Facebook",
  "Instagram",
  "X / Twitter",
  "YouTube",
  "Behance",
  "GitHub",
  "Other",
];

const presenceUrlSchema = z.object({
  type: optionalText,
  value: optionalUrl,
});

const companyOnboardingSchema = z.object({
  companyLogo: z.any().optional(),

  companyName: optionalText,
  industry: optionalText,
  companySize: optionalText,
  founded: optionalYear,
  headquarters: optionalText,
  website: optionalUrl,
  email: optionalEmail,
  phoneNumber: optionalText,

  description: optionalText,
  mission: optionalText,
  vision: optionalText,
  tagline: optionalText,

  hrName: optionalText,
  hrEmail: optionalEmail,
  recruitmentEmail: optionalEmail,
  officePhone: optionalText,
  officeAddress: optionalText,
  supportEmail: optionalEmail,

  presenceUrls: z.array(presenceUrlSchema).optional().default([]),

  enableAiMatching: z.boolean().optional().default(false),
  autoCvScreening: z.boolean().optional().default(false),
  skillMatching: z.boolean().optional().default(false),
  aiRanking: z.boolean().optional().default(false),
  smartRecommendations: z.boolean().optional().default(false),
  autoShortlisting: z.boolean().optional().default(false),
});

type CompanyOnboardingFormValues = z.infer<typeof companyOnboardingSchema>;

type UploadedFile = {
  id: string;
  file: File;
  name: string;
  url: string;
};

function CompanyOnboarding() {
  const userData = getCurrentUser();
  const allCountries = getNames();
  const navigate = useNavigate();

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [documents, setDocuments] = useState<UploadedFile[]>([]);
  const [photos, setPhotos] = useState<UploadedFile[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CompanyOnboardingFormValues>({
    resolver: zodResolver(companyOnboardingSchema),
    defaultValues: {
      companyName: "",
      industry: "",
      companySize: "",
      founded: "",
      headquarters: "",
      website: "",
      email: "",
      phoneNumber: "",

      description: "",
      mission: "",
      vision: "",
      tagline: "",

      hrName: "",
      hrEmail: "",
      recruitmentEmail: "",
      officePhone: "",
      officeAddress: "",
      supportEmail: "",

      presenceUrls: [
        { type: "Website", value: "" },
        { type: "LinkedIn", value: "" },
        { type: "Facebook", value: "" },
        { type: "Instagram", value: "" },
        { type: "X / Twitter", value: "" },
        { type: "YouTube", value: "" },
        { type: "Behance", value: "" },
        { type: "GitHub", value: "" },
      ],

      enableAiMatching: true,
      autoCvScreening: true,
      skillMatching: true,
      aiRanking: true,
      smartRecommendations: false,
      autoShortlisting: false,
    },
  });

  const presenceArray = useFieldArray({ control, name: "presenceUrls" });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("companyLogo", e.target.files);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newDocs: UploadedFile[] = Array.from(files).map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      file,
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setDocuments((prev) => [...prev, ...newDocs]);
    e.target.value = "";
  };

  const removeDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newPhotos: UploadedFile[] = Array.from(files).map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      file,
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
    e.target.value = "";
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  const buildSnapshot = (data: CompanyOnboardingFormValues) => ({
    companyName: data.companyName || "",
    industry: data.industry || "",
    companySize: data.companySize || "",
    founded: data.founded || "",
    headquarters: data.headquarters || "",
    website: data.website || "",
    email: data.email || "",
    phoneNumber: data.phoneNumber || "",

    description: data.description || "",
    mission: data.mission || "",
    vision: data.vision || "",
    tagline: data.tagline || "",

    hrName: data.hrName || "",
    hrEmail: data.hrEmail || "",
    recruitmentEmail: data.recruitmentEmail || "",
    officePhone: data.officePhone || "",
    officeAddress: data.officeAddress || "",
    supportEmail: data.supportEmail || "",

    presenceUrls: (data.presenceUrls ?? []).map((u) => ({
      type: u.type || "",
      value: u.value || "",
    })),

    aiRecruitment: {
      enableAiMatching: data.enableAiMatching ?? false,
      autoCvScreening: data.autoCvScreening ?? false,
      skillMatching: data.skillMatching ?? false,
      aiRanking: data.aiRanking ?? false,
      smartRecommendations: data.smartRecommendations ?? false,
      autoShortlisting: data.autoShortlisting ?? false,
    },

    companyLogoName: data.companyLogo?.[0]?.name ?? "",
    documentNames: documents.map((doc) => doc.name),
    photoNames: photos.map((photo) => photo.name),
  });

  const onSubmit: SubmitHandler<CompanyOnboardingFormValues> = (data) => {
    const snapshot = buildSnapshot(data);
    localStorage.setItem("onBoardingData", JSON.stringify(snapshot));
    navigate("/company/dashboard");
  };

  const handleSkip = () => {
    const emptySnapshot = buildSnapshot({
      companyName: "",
      industry: "",
      companySize: "",
      founded: "",
      headquarters: "",
      website: "",
      email: "",
      phoneNumber: "",
      description: "",
      mission: "",
      vision: "",
      tagline: "",
      hrName: "",
      hrEmail: "",
      recruitmentEmail: "",
      officePhone: "",
      officeAddress: "",
      supportEmail: "",
      presenceUrls: [],
      enableAiMatching: false,
      autoCvScreening: false,
      skillMatching: false,
      aiRanking: false,
      smartRecommendations: false,
      autoShortlisting: false,
      companyLogo: undefined,
    });
    localStorage.setItem("onboardingData", JSON.stringify(emptySnapshot));
    navigate("/company/dashboard");
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
          <h1>Complete Your Company Profile</h1>
          <p className="text-normal mt-4">
            Build your employer brand, showcase your culture, and attract top
            talent to start hiring.
          </p>
        </div>

        <div className="grid gap-4">
          {/* Company Info */}
          <div className="box">
            <div className="bg-card p-6 rounded-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="upload-profile">
                  <label
                    htmlFor="company-logo"
                    className="cursor-pointer text-normal bg-input w-14 h-14 rounded-lg flex items-center justify-center relative overflow-hidden"
                  >
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Company logo preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <ImagePlus size={26} />
                    )}
                    <span className="bg-input w-6 h-6 border border-muted rounded-full flex items-center justify-center absolute -bottom-1 -right-1">
                      <PencilLine size={12} />
                    </span>
                  </label>
                  <input
                    id="company-logo"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleLogoChange}
                  />
                </div>
                <div>
                  <h5>{userData?.fullName ?? "Your Company"}</h5>
                  <div className="flex items-center gap-4 mt-2 text-sm text-normal">
                    <span>{userData?.phone}</span>
                    <span>{userData?.email}</span>
                  </div>
                </div>
              </div>

              <div className="inputs grid grid-cols-2 gap-8">
                <div className="field">
                  <h6 className="mb-2">Company Name</h6>
                  <Input
                    {...register("companyName")}
                    placeholder="Global Finance Group"
                  />
                  <FieldError message={errors.companyName?.message} />
                </div>
                <div className="field">
                  <h6 className="mb-2">Industry</h6>
                  <Controller
                    control={control}
                    name="industry"
                    render={({ field }) => (
                      <SelectBox
                        items={industryOptions}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select industry"
                      />
                    )}
                  />
                  <FieldError message={errors.industry?.message} />
                </div>
                <div className="field">
                  <h6 className="mb-2">Company Size</h6>
                  <Controller
                    control={control}
                    name="companySize"
                    render={({ field }) => (
                      <SelectBox
                        items={companySizeOptions}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select size"
                      />
                    )}
                  />
                  <FieldError message={errors.companySize?.message} />
                </div>
                <div className="field">
                  <h6 className="mb-2">Founded</h6>
                  <Input
                    inputMode="numeric"
                    {...register("founded")}
                    placeholder="2005"
                  />
                  <FieldError message={errors.founded?.message} />
                </div>
                <div className="field">
                  <h6 className="mb-2">Headquarters</h6>
                  <Controller
                    control={control}
                    name="headquarters"
                    render={({ field }) => (
                      <SelectBox
                        items={allCountries}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select a country"
                      />
                    )}
                  />
                  <FieldError message={errors.headquarters?.message} />
                </div>
                <div className="field">
                  <h6 className="mb-2">Website</h6>
                  <Input
                    placeholder="globalfinancegroup.co.uk"
                    {...register("website")}
                  />
                  <FieldError message={errors.website?.message} />
                </div>
                <div className="field">
                  <h6 className="mb-2">Email</h6>
                  <Input
                    {...register("email")}
                    placeholder="Globalfinancegroup@gmail.com"
                  />
                  <FieldError message={errors.email?.message} />
                </div>
                <div className="field">
                  <h6 className="mb-2">Phone Number</h6>
                  <Input
                    {...register("phoneNumber")}
                    placeholder="+44 20 7946 0958"
                  />
                  <FieldError message={errors.phoneNumber?.message} />
                </div>
              </div>
            </div>
          </div>
          {/* About Company */}
          <div className="box">
            <h3>About Company</h3>
            <div className="bg-card mt-4 p-6 rounded-lg grid gap-8">
              <div className="field">
                <h6 className="mb-2">Company Description</h6>
                <Textarea
                  className="resize-none h-25"
                  placeholder="Global Finance Group is a leading multinational financial services firm offering investment banking, asset management, wealth advisory, and corporate finance solutions to institutions and high-net-worth clients across 40+ countries."
                  {...register("description")}
                />
                <FieldError message={errors.description?.message} />
              </div>
              <div className="inputs grid grid-cols-2 gap-8">
                <div className="field">
                  <h6 className="mb-2">Mission</h6>
                  <Textarea
                    className="resize-none h-[65px]"
                    placeholder="To deliver disciplined, long-term financial growth for every client we serve."
                    {...register("mission")}
                  />
                  <FieldError message={errors.mission?.message} />
                </div>
                <div className="field">
                  <h6 className="mb-2">Vision</h6>
                  <Textarea
                    className="resize-none h-[65px]"
                    placeholder="A world where every institution and individual has access to world-class financial expertise."
                    {...register("vision")}
                  />
                  <FieldError message={errors.vision?.message} />
                </div>
              </div>
              <div className="field">
                <h6 className="mb-2">Tagline</h6>
                <Input
                  {...register("tagline")}
                  placeholder="Capital. Confidence. Growth."
                />
                <FieldError message={errors.tagline?.message} />
              </div>
            </div>
          </div>
          {/* Contact Information */}
          <div className="box">
            <h3>Contact Information</h3>
            <div className="bg-card mt-4 p-6 rounded-lg">
              <div className="inputs grid grid-cols-2 gap-8">
                <div className="field">
                  <h6 className="mb-2">HR Name</h6>
                  <Input
                    {...register("hrName")}
                    placeholder="Thomas Harrington"
                  />
                  <FieldError message={errors.hrName?.message} />
                </div>
                <div className="field">
                  <h6 className="mb-2">HR Email</h6>
                  <Input
                    {...register("hrEmail")}
                    placeholder="t.harrington@gmail.com"
                  />
                  <FieldError message={errors.hrEmail?.message} />
                </div>
                <div className="field">
                  <h6 className="mb-2">Recruitment Email</h6>
                  <Input
                    {...register("recruitmentEmail")}
                    placeholder="Globalfinancegroup@gmail.com"
                  />
                  <FieldError message={errors.recruitmentEmail?.message} />
                </div>
                <div className="field">
                  <h6 className="mb-2">Office Phone</h6>
                  <Input
                    {...register("officePhone")}
                    placeholder="+44 20 7946 0958"
                  />
                  <FieldError message={errors.officePhone?.message} />
                </div>
                <div className="field">
                  <h6 className="mb-2">Office Address</h6>
                  <Input
                    {...register("officeAddress")}
                    placeholder="23 st, London, UK"
                  />
                  <FieldError message={errors.officeAddress?.message} />
                </div>
                <div className="field">
                  <h6 className="mb-2">Support Email</h6>
                  <Input
                    {...register("supportEmail")}
                    placeholder="Globalfinancegroup@gmail.com"
                  />
                  <FieldError message={errors.supportEmail?.message} />
                </div>
              </div>
            </div>
          </div>
          {/* Company Presence */}
          <div className="box">
            <h3>Company Presence</h3>
            <div className="bg-card mt-4 p-6 rounded-lg grid gap-6">
              {presenceArray.fields.length === 0 && (
                <EmptyState message="No links added yet." />
              )}

              {presenceArray.fields.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-end gap-6 pb-6 border-b border-muted last:border-b-0 last:pb-0"
                >
                  <div className="field">
                    <h6 className="mb-2">Type</h6>
                    <Controller
                      control={control}
                      name={`presenceUrls.${index}.type` as const}
                      render={({ field }) => (
                        <SelectBox
                          items={presenceTypeOptions}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select type"
                        />
                      )}
                    />
                    <FieldError
                      message={errors.presenceUrls?.[index]?.type?.message}
                    />
                  </div>
                  <div className="field flex-1">
                    <h6 className="mb-2">URL</h6>
                    <Input
                      placeholder="yourcompany.com"
                      {...register(`presenceUrls.${index}.value` as const)}
                    />
                    <FieldError
                      message={errors.presenceUrls?.[index]?.value?.message}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => presenceArray.remove(index)}
                    className="text-red-500 hover:text-red-600 transition mb-3.5"
                    title="Remove link"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

              <Button
                type="button"
                onClick={() =>
                  presenceArray.append({ type: "Other", value: "" })
                }
                className="self-end ml-auto bg-primary hover:bg-(--primary-hover) text-white rounded-(--radius-sm) py-6 px-4 flex w-fit"
              >
                Add URL <PlusIcon />
              </Button>
            </div>
          </div>
          {/* Documents */}
          <div className="box">
            <h3>Documents</h3>
            <div className="bg-card mt-4 p-6 rounded-lg">
              <div className="upload-profile">
                <label
                  htmlFor="documents-input"
                  className="h-[168px] flex flex-col gap-4 items-center justify-center bg-background rounded-lg text-primary cursor-pointer border-primary border-dashed border-2"
                >
                  <FileUp size={56} />
                  <span className="font-semibold">Upload Documents</span>
                </label>
                <input
                  id="documents-input"
                  type="file"
                  accept=".pdf, .doc, .docx"
                  multiple
                  hidden
                  onChange={handleDocumentsChange}
                />
              </div>

              <div className="mt-6 grid gap-4">
                {documents.length === 0 ? (
                  <EmptyState message="No documents uploaded yet." />
                ) : (
                  documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between gap-4 py-3 border-b border-muted last:border-b-0"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText size={18} className="text-normal shrink-0" />
                        <span className="truncate">{doc.name}</span>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <button
                          type="button"
                          onClick={() => removeDocument(doc.id)}
                          className="text-red-500 hover:text-red-600 transition"
                          title="Remove document"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <Button
                type="button"
                onClick={() =>
                  document.getElementById("documents-input")?.click()
                }
                className="self-end ml-auto mt-6 bg-primary hover:bg-(--primary-hover) text-white rounded-(--radius-sm) py-6 px-4 flex w-fit"
              >
                Add Document <PlusIcon />
              </Button>
            </div>
          </div>
          {/* Company Gallery */}
          <div className="box">
            <h3>Company Gallery</h3>
            <div className="bg-card mt-4 p-6 rounded-lg">
              <div className="upload-profile">
                <label
                  htmlFor="photos-input"
                  className="h-[168px] flex flex-col gap-3 items-center justify-center bg-background rounded-lg text-primary cursor-pointer border-primary border-dashed border-2"
                >
                  <ImagePlus size={56} />
                  <span className="font-semibold">Upload Company Photos</span>
                  <span className="text-sm text-normal font-normal">
                    Office, Team, Events, Workplace — JPG, PNG up to 5MB
                  </span>
                </label>
                <input
                  id="photos-input"
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple
                  hidden
                  onChange={handlePhotosChange}
                />
              </div>

              {photos.length === 0 ? (
                <EmptyState message="No photos added yet." />
              ) : (
                <div className="grid grid-cols-4 gap-4 mt-6">
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative aspect-square rounded-lg overflow-hidden border border-muted"
                    >
                      <img
                        src={photo.url}
                        alt={photo.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(photo.id)}
                        className="absolute top-1.5 right-1.5 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-500 transition"
                        title="Remove photo"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                type="button"
                onClick={() => document.getElementById("photos-input")?.click()}
                className="self-end ml-auto mt-6 bg-primary hover:bg-(--primary-hover) text-white rounded-(--radius-sm) py-6 px-4 flex w-fit"
              >
                Add Photo <PlusIcon />
              </Button>
            </div>
          </div>
          {/* AI Recruitment */}
          <div className="box">
            <h3>AI Recruitment</h3>
            <div className="bg-card mt-4 p-6 rounded-lg grid gap-6">
              {(
                [
                  {
                    name: "enableAiMatching" as const,
                    label: "Enable AI Candidate Matching",
                    description: "Match candidates to open roles automatically",
                  },
                  {
                    name: "autoCvScreening" as const,
                    label: "Auto CV Screening",
                    description: "Automatically screen incoming CVs",
                  },
                  {
                    name: "skillMatching" as const,
                    label: "Skill Matching",
                    description: "Match candidates to required skills",
                  },
                  {
                    name: "aiRanking" as const,
                    label: "AI Ranking",
                    description: "Rank candidates by fit score",
                  },
                  {
                    name: "smartRecommendations" as const,
                    label: "Smart Recommendations",
                    description: "AI suggests top candidates proactively",
                  },
                  {
                    name: "autoShortlisting" as const,
                    label: "Auto Shortlisting",
                    description:
                      "Move top candidates to shortlist automatically",
                  },
                ] as const
              ).map((toggle) => (
                <div
                  key={toggle.name}
                  className="flex items-center justify-between gap-6 pb-6 border-b border-muted last:border-b-0 last:pb-0"
                >
                  <div>
                    <h6 className="font-medium">{toggle.label}</h6>
                    <p className="text-sm text-normal mt-1">
                      {toggle.description}
                    </p>
                  </div>
                  <Controller
                    control={control}
                    name={toggle.name}
                    render={({ field }) => (
                      <Switch
                        checked={field.value ?? false}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </div>
              ))}
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

export default CompanyOnboarding;
