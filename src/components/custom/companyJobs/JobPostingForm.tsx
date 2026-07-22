import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useJobPostingStore } from "@/store/useJobPostingStore";
import {
  jobPostingDefaultValues,
  jobPostingSchema,
  type JobPostingFormValues,
} from "@/schemas/jobPosting.schema";
import { JobDetailsSection } from "./Jobdetailssection";
import { CompensationSection } from "./CompensationSection";
import { DeadlineSection } from "./Deadlinesection";
import { DescriptionSection } from "./Descriptionsection ";
import { JobPublicPreview } from "./JobPublicPreview";

interface JobPostingFormProps {
  onSubmit: (values: JobPostingFormValues) => void;
}

export function JobPostingForm({ onSubmit }: JobPostingFormProps) {
  const { isPreviewOpen, openPreview, closePreview } = useJobPostingStore();
  const [rewritingField, setRewritingField] = useState<
    keyof JobPostingFormValues | null
  >(null);

  const {
    control,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<JobPostingFormValues>({
    resolver: zodResolver(jobPostingSchema),
    defaultValues: jobPostingDefaultValues,
    mode: "onBlur",
  });

  // TODO: swap for the real ai.service.ts call once wired to a backend.
  const handleRewriteWithAI = async (
    field: keyof JobPostingFormValues,
    currentValue: string
  ) => {
    setRewritingField(field);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const rewritten = currentValue.trim()
        ? `${currentValue.trim()} (polished by AI)`
        : "AI-generated draft copy goes here.";
      setValue(field, rewritten as never, { shouldDirty: true });
    } finally {
      setRewritingField(null);
    }
  };

  const handlePublicPreview = async () => {
    const isValid = await trigger();
    if (!isValid) return;
    openPreview();
  };

  const handleContinueFromPreview = () => {
    closePreview();
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 rounded-[var(--radius-lg)]  p-6 "
      >
        <JobDetailsSection control={control} errors={errors} />
        <CompensationSection control={control} errors={errors} />
        <DeadlineSection control={control} errors={errors} />
        <DescriptionSection
          control={control}
          errors={errors}
          rewritingField={rewritingField}
          onRewriteWithAI={handleRewriteWithAI}
        />

        <div className="flex items-center justify-end gap-3 border-t border-[var(--border)] pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handlePublicPreview}
            className="hover:bg-primary-light! rounded-sm  text-primary! text-body-md px-6 py-6 border-2 border-primary!"
          >
            Public preview
          </Button>
          <Button
            type="submit"
            className="bg-primary rounded-sm!  hover:bg-[var(--primary-hover)] text-white! text-body-md px-10 py-6"
          >
            Create
          </Button>
        </div>
      </form>

      <JobPublicPreview
        open={isPreviewOpen}
        onOpenChange={(open) => (open ? openPreview() : closePreview())}
        values={watch()}
        onContinue={handleContinueFromPreview}
      />
    </>
  );
}