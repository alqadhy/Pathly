import { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Trash2, FileIcon, Plus } from "lucide-react";
import download from '../../../assets/imgs/download.png'

import { getJobApplicationData, submitJobApplication } from "@/Services/application.service";
import type { JobApplicationFormData } from "@/schemas/application.schema";
import { JobApplicationSchema } from "@/schemas/application.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { JobApplicationQuestion } from "./JobApplicationQuestion";

export default function JobApplicationForm() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadAreaHover, setUploadAreaHover] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const form = useForm<JobApplicationFormData>({
    resolver: zodResolver(JobApplicationSchema),
    defaultValues: {
      employmentType: "Full Time",
      yearsOfExperience: "1 years",
      portfolioLinks: [],
      screeningQuestions: [],
    },
  });

  const { control, register, handleSubmit, setValue, watch } = form;
  const { fields, append } = useFieldArray({
    control,
    name: "screeningQuestions",
  });
  const { fields: portfolioFields, append: appendPortfolio, remove: removePortfolio } = useFieldArray({
    control,
    name: "portfolioLinks",
  });

  const { data: jobData, isLoading } = useQuery({
    queryKey: ["jobApplicationData"],
    queryFn: getJobApplicationData,
  });

 useEffect(() => {
  if (jobData) {
    const formattedQuestions = jobData.screeningQuestions.map((q) => ({
      id: q.id,
      question: q.question,
      type: q.type,  
      options: q.options || [],
      answer: "",
    }));
    
    setValue("screeningQuestions", formattedQuestions);
    setCurrentQuestionIndex(0);
  }
}, [jobData, setValue]);

  useGSAP(() => {
    gsap.from(".form-section", {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, []);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setValue("resumeFile", file);
    }
  };

  const handleAddQuestion = () => {
    append({ question: "", type: "", options: [] });
    setCurrentQuestionIndex(fields.length);
  };

  const goToPrevQuestion = () => {
    setCurrentQuestionIndex((i) => Math.max(0, i - 1));
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((i) => Math.min(fields.length - 1, i + 1));
  };

  const onSubmit = async (data: JobApplicationFormData) => {
    const jobId = jobData?.id || "job_123";
    const jobTitle = jobData?.jobTitle || "Unknown Position";
    const companyName = jobData?.company || "Unknown Company";

    const response = await submitJobApplication(
      data,
      jobId,
      jobTitle,
      companyName
    );

    alert(response.message);
  };

  if (isLoading) return <div className="p-10 text-center text-foreground">Loading Application Form...</div>;

  return (
    <div className=" mx-auto p-6 md:p-10 bg-background font-sans text-foreground">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

        <section className="form-section space-y-6">
          <h2 className="text-2xl! font-semibold! text-foreground">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-bold! text-body-md">Name</Label>
              <Input id="name" placeholder="Enter your name" {...register("name")} className="bg-white!  h-12 " />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-bold! text-body-md">Email Address</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...register("email")} className="bg-white!  h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className='text-bold! text-body-md'>Phone Number</Label>
              <Input id="phoneNumber" placeholder="+1 234 567 890" {...register("phoneNumber")} className="bg-white!  h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-bold! text-body-md">Location</Label>
              <Input id="location" placeholder="City, Country" {...register("location")} className="bg-white!  h-12" />
            </div>
          </div>
        </section>

        <section className="form-section space-y-6">
          <h2 className="text-2xl! font-semibold! text-foreground">Professional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="currentJobTitle" className="text-bold! text-body-md">Current Job Title</Label>
              <Input id="currentJobTitle" placeholder="e.g. Senior Designer" {...register("currentJobTitle")} className="bg-white!  h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentCompany" className="text-bold! text-body-md">Current Company</Label>
              <Input id="currentCompany" placeholder="e.g. Pathly" {...register("currentCompany")} className="bg-white!  h-12" />
            </div>
            <div className="space-y-2">
              <Label className="text-bold! text-body-md">Employment Type</Label>
              <Controller
                control={control}
                name="employmentType"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="bg-white!  py-6!   w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent >
                      {["Full Time", "Part Time", "Internship", "Contract", "Freelance"].map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-bold! text-body-md">Years of Experience</Label>
              <Controller
                control={control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="bg-white!   py-6! w-full">
                      <SelectValue placeholder="Select years" />
                    </SelectTrigger>
                    <SelectContent>
                      {["1 years", "1-2 years", "2-5 years", "6-10 years", "10-15 years"].map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </section>

        <section className="form-section space-y-6">
          <h2 className="text-2xl! font-semibold! text-foreground">Resume & Portfolio</h2>

          <div className="relative rounded-2xl py-10 flex flex-col items-center justify-center transition-all duration-200 h-[200px]">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="1" y="1"
                width="calc(100% - 2px)" height="calc(100% - 2px)"
                rx="16" ry="16"
                fill="none"
                stroke="#6D5DFC"
                strokeWidth="2"
                strokeDasharray="40 25"
              />
            </svg>

            <div className={`absolute inset-0 rounded-2xl -z-10 ${uploadAreaHover ? "bg-primary" : "bg-primary"}`} />

            {resumeFile ? (
              <div className="flex items-center gap-4 text-foreground">
                <FileIcon className="w-8 h-8 text-primary" />
                <span className="font-medium">{resumeFile.name}</span>
                <Button variant="ghost" size="sm" onClick={() => { setResumeFile(null); setValue("resumeFile", undefined); }} className="text-destructive hover:text-destructive-hover">
                  Remove
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="mb-2 flex items-center justify-center  text-primary">
                  <img src={download} alt="Upload" className="w-9 h-9" />
                </div>
                <p className="text-primary font-medium cursor-pointer">
                  <Label htmlFor="resume-upload" className="cursor-pointer text-body-md hover:underline">Upload Resume</Label>
                </p>
                <Input id="resume-upload" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleResumeUpload} />
              </div>
            )}
          </div>

          <div className="space-y-4 mt-10">
            <Label className="text-2xl! font-semibold! text-foreground">Portfolio Links</Label>
            {portfolioFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <Input placeholder="https://behance.net/your-profile" {...register(`portfolioLinks.${index}.url`)} className="bg-white!  h-12 flex-1" />
                <Button type="button" variant="ghost" size="icon" onClick={() => removePortfolio(index)} className="text-foreground hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => appendPortfolio({ url: "" })} className="ml-auto flex items-center gap-2 bg-primary hover:bg-primary-hover text-white">
              Add Link <Plus className="w-4 h-4" />
            </Button>
          </div>
        </section>

        <section className="form-section space-y-8">
          <h2 className="text-2xl! font-semibold! text-foreground">Screening Questions</h2>

          {fields.length > 0 && fields[currentQuestionIndex] && (
            <>
              <JobApplicationQuestion
                key={fields[currentQuestionIndex].id}
                index={currentQuestionIndex}
                form={form}
                isLastQuestion={currentQuestionIndex === fields.length - 1}
                onAddQuestion={handleAddQuestion}
              />

              {fields.length > 1 && (
                <div className="flex items-center justify-between pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={goToPrevQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Back
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {currentQuestionIndex + 1} / {fields.length}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={goToNextQuestion}
                    disabled={currentQuestionIndex === fields.length - 1}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </section>

        <div className="flex justify-end pt-6">
          <Button type="submit" className="px-8 py-7 bg-primary hover:bg-primary-hover text-white font-medium rounded-sm transition-colors">
            Submit Application
          </Button>
        </div>
      </form>
    </div>
  );
}