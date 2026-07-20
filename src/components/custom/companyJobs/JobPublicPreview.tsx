import { Bookmark, Briefcase, MapPin, MessageCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import type { JobPostingFormValues } from "../../../schemas/jobPosting.schema";

interface JobPublicPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  values: Partial<JobPostingFormValues>;
  onContinue: () => void;
}

/** Splits a free-text block into non-empty bullet lines. */
function toBulletLines(text?: string) {
  return (text ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function JobPublicPreview({
  open,
  onOpenChange,
  values,
  onContinue,
}: JobPublicPreviewProps) {
  const { data: company, isLoading } = useCompanyProfile();

  const responsibilities = toBulletLines(values.responsibilities);
  const benefits = toBulletLines(values.benefits);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 bg-[var(--background)] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-[var(--border)] space-y-0">
          <DialogTitle className="text-[var(--h5-size)]">
            Public Preview
          </DialogTitle>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close preview"
            className="rounded-full p-1 text-[var(--normal)] hover:bg-[var(--light-hover)] hover:text-[var(--darker)] transition-colors"
          >
            <X className="size-4" />
          </button>
        </DialogHeader>

        <div className="overflow-y-auto px-6 py-5 space-y-5">
          <section className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--shadow-sm)] space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-9 rounded-md">
                <AvatarImage src={company?.logoUrl} alt={company?.name} />
                <AvatarFallback className="rounded-md">
                  {company?.name?.slice(0, 2) ?? "—"}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-[var(--text-primary)]">
                {isLoading ? "Loading company…" : company?.name}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[var(--h4-size)] font-semibold text-[var(--text-primary)]">
                  {values.jobTitle || "Untitled position"}
                </h3>
                <p className="text-[var(--body-sm)] text-[var(--normal)] mt-1">
                  {company?.location} · 1 week ago
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white">
                  Apply
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Save job"
                  className="border-[var(--border)]"
                >
                  <Bookmark className="size-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {values.workplaceType && (
                <Badge
                  variant="secondary"
                  className="gap-1 bg-[var(--primary-light)] text-[var(--primary)] hover:bg-[var(--primary-light)]"
                >
                  <Briefcase className="size-3" />
                  {values.workplaceType}
                </Badge>
              )}
              {values.employmentType && (
                <Badge
                  variant="secondary"
                  className="gap-1 bg-[var(--primary-light)] text-[var(--primary)] hover:bg-[var(--primary-light)]"
                >
                  {values.employmentType}
                </Badge>
              )}
              {company?.location && (
                <Badge
                  variant="secondary"
                  className="gap-1 bg-[var(--primary-light)] text-[var(--primary)] hover:bg-[var(--primary-light)]"
                >
                  <MapPin className="size-3" />
                  {company.location.split(",")[0]}
                </Badge>
              )}
            </div>
          </section>

          <section className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--shadow-sm)] space-y-5 relative">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Message company"
              className="absolute top-5 right-5 border-[var(--border)]"
            >
              <MessageCircle className="size-4" />
            </Button>

            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-1">
                About {company?.name?.replace(" Company", "") ?? "the company"}:
              </h4>
              <p className="text-[var(--body-sm)] text-[var(--normal)] leading-relaxed">
                {company?.about}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-1">
                About the Role:
              </h4>
              <p className="text-[var(--body-sm)] text-[var(--normal)] leading-relaxed">
                {values.jobDescription || "No description provided yet."}
              </p>
            </div>

            {responsibilities.length > 0 && (
              <div>
                <h4 className="font-semibold text-[var(--text-primary)] mb-1">
                  Duties &amp; Responsibilities:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-[var(--body-sm)] text-[var(--normal)]">
                  {responsibilities.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </div>
            )}

            {benefits.length > 0 && (
              <div>
                <h4 className="font-semibold text-[var(--text-primary)] mb-1">
                  Benefits:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-[var(--body-sm)] text-[var(--normal)]">
                  {benefits.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>

        <div className="flex justify-end px-6 py-4 border-t border-[var(--border)]">
          <Button
            onClick={onContinue}
            className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}