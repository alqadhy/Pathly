import { Bookmark, Briefcase, MapPin, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import type { JobPostingFormValues } from "../../../schemas/jobPosting.schema";

interface JobPublicPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  values: Partial<JobPostingFormValues>;
  onCreate: () => void;
}

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
  onCreate,
}: JobPublicPreviewProps) {
  const { data: company, isLoading } = useCompanyProfile();

  const responsibilities = toBulletLines(values.responsibilities);
  const benefits = toBulletLines(values.benefits);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange(false)}
      />
      
      <div className="relative z-50 w-full max-w-[60vw] max-h-[80vh] bg-[var(--background)] rounded-lg shadow-lg overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
          <h2 className="text-[var(--h5-size)] font-semibold">
            Public Preview
          </h2>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close preview"
            className="rounded-full p-1 text-[var(--normal)] hover:bg-[var(--light-hover)] hover:text-[var(--darker)] transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5 space-y-5 flex-1">
          <section className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--shadow-sm)] space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-[var(--light)]">
                {company?.logoUrl ? (
                  <img
                    src={company.logoUrl}
                    alt={company?.name}
                    style={{ objectFit: "contain", width: "100%", height: "100%" }}
                    className="p-1"
                  />
                ) : (
                  <span className="text-sm font-semibold text-[var(--normal)]">
                    {company?.name?.slice(0, 2) ?? "—"}
                  </span>
                )}
              </div>
              <span className="text-[var(--body-sm)] font-semibold text-[var(--text-primary)]">
                {isLoading ? "Loading company…" : company?.name ? `${company.name} Company` : "Company"}
              </span>
            </div>

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-[var(--h4-size)] font-semibold text-[var(--text-primary)]">
                  {values.jobTitle || "Untitled position"}
                </h3>
                <p className="text-[var(--body-sm)] text-[var(--normal)] mt-1">
                  {company?.location} · 1 week ago
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Button className="w-[200px] h-[55px] bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-sm">
                  Apply
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Save job"
                  className="w-14 h-14 bg-[var(--primary-light)] hover:bg-[var(--primary-light)] text-[var(--primary)] rounded-lg"
                >
                  <Bookmark className="size-[22px]" />
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
            onClick={onCreate}
            className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-body-md! rounded-sm px-10 py-6 text-white"
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}