import { useRef, useState, useCallback, useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ListFilter, Pencil, X, ChevronUp, ChevronDown, Users } from "lucide-react";

import type { Job } from "../../../types/jobs.types";

import EditJobPreferenceModal from "./EditJobPreferenceModal";

interface JobListCardProps {
  title: string;
  subtitle: string;
  jobs: Job[];
  onRemoveJob?: (id: number) => void;
  onFilterClick?: () => void;
  onEditClick?: () => void;
  getTrailingLabel?: (job: Job) => string | undefined;
  getJobHref?: (job: Job) => string;
}

function HeaderIconButton({
  children,
  onClick,
  label,
}: {
  children: ReactNode;
  onClick?: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-light text-normal transition-colors hover:bg-light-hover hover:text-dark"
    >
      {children}
    </button>
  );
}

export default function JobListCard({
  title,
  subtitle,
  jobs,
  onRemoveJob,
  onFilterClick,
  getTrailingLabel,
  getJobHref = (job) => `/jobs/${job.id}`,
}: JobListCardProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [thumb, setThumb] = useState({ height: 100, top: 0 });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const updateThumb = useCallback(() => {
    const el = listRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollHeight <= clientHeight) {
      setThumb({ height: 100, top: 0 });
      return;
    }

    const heightPct = (clientHeight / scrollHeight) * 100;
    const topPct = (scrollTop / (scrollHeight - clientHeight)) * (100 - heightPct);
    setThumb({ height: heightPct, top: topPct });
  }, []);

  const scrollBy = (amount: number) => {
    listRef.current?.scrollBy({ top: amount, behavior: "smooth" });
  };

  useEffect(() => {
    updateThumb();
  }, [updateThumb, jobs]);

  const showScrollControls = jobs.length > 4;

  return (
    <section className=" flex w-full flex-col rounded-2xl border border-border bg-card p-md shadow-sm sm:p-lg">
      
      <EditJobPreferenceModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      <header className=" mb-sm flex items-start justify-between gap-md sm:mb-md">
        <div>
          <h2 className="m-0 text-h6 font-bold leading-tight text-text-primary sm:text-h5">
            {title}
          </h2>
          <p className="m-0 mt-1 text-body-sm leading-snug text-normal">
            {subtitle}
          </p>
        </div>

        <div className=" flex shrink-0 items-center gap-sm">
          <HeaderIconButton label="Filter jobs" onClick={onFilterClick}>
            <ListFilter size={16} />
          </HeaderIconButton>
          
          <HeaderIconButton 
            label="Edit preferences" 
            onClick={() => setIsEditModalOpen(true)}
          >
            <Pencil size={16} />
          </HeaderIconButton>
        </div>
      </header>

      <div className=" relative flex gap-sm">
        <ul
          ref={listRef}
          onScroll={updateThumb}
          className=" m-0 max-h-[420px] flex-1 list-none overflow-y-auto p-0 pr-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {jobs.map((job, index) => (
            <li
              key={job.id}
              className={`m-0 ${
                index !== jobs.length - 1 ? "border-b border-border" : ""
              }`}
            >
             <Link
  to={getJobHref(job)}
  className="group relative flex items-start gap-sm rounded-lg px-md py-md transition-all duration-200 hover:scale-[0.98] hover:bg-light-hover sm:gap-md"
>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-light sm:h-12 sm:w-12">
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    style={{ objectFit: "contain", width: "100%", height: "100%" }}
                    className="p-1"
                  />
                </div>

                <div className=" min-w-0 flex-1">
                  <h3 className="m-0 line-clamp-2 text-body-sm font-bold leading-snug text-text-primary sm:text-body-md">
                    {job.title}
                  </h3>
                  <p className="m-0 mt-0.5 text-body-sm leading-snug text-normal">
                    {job.company} · {job.location} ({job.workType})
                  </p>

                  {job.mutualConnectionsCount ? (
                    <div className="mt-1 flex items-center gap-1 text-body-sm text-normal">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary-light text-primary">
                        <Users size={10} />
                      </span>
                      {job.mutualConnectionsCount} Connections
                    </div>
                  ) : null}

                  <div className="mt-1 flex items-center gap-sm text-body-sm">
                    {job.isViewed && (
                      <span className="font-medium text-primary">Viewed</span>
                    )}
                    <span className="text-normal">{job.postedAt}</span>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-sm ">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onRemoveJob?.(job.id);
                    }}
                    aria-label={`Remove ${job.title} at ${job.company}`}
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-normal transition-colors hover:border-dark hover:text-dark "
                  >
                    <X size={12} />
                  </button>

                  {getTrailingLabel?.(job) && (
                    <span className="whitespace-nowrap text-body-sm font-medium text-primary">
                      {getTrailingLabel(job)}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {showScrollControls && (
          <div className="flex w-6 shrink-0 flex-col items-center">
            <button
              type="button"
              aria-label="Scroll up"
              onClick={() => scrollBy(-120)}
              className="text-normal transition-colors hover:text-dark"
            >
              <ChevronUp size={16} />
            </button>

            <div className="relative my-1 w-1 flex-1 rounded-full bg-light-active">
              <div
                className="absolute w-1 rounded-full bg-normal"
                style={{ height: `${thumb.height}%`, top: `${thumb.top}%` }}
              />
            </div>

            <button
              type="button"
              aria-label="Scroll down"
              onClick={() => scrollBy(120)}
              className="text-normal transition-colors hover:text-dark"
            >
              <ChevronDown size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}