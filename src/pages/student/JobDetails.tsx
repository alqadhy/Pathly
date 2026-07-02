import { useParams } from "react-router-dom";
import { Check, X as XIcon ,CircleCheck} from "lucide-react";
import { useEffect, useState } from "react";

import JobListCard from "@/components/custom/jobs-internships/JobListCard";
import ApplyJobModal from "@/components/custom/jobs-internships/ApplyJobModal";
import { jobDetails } from "@/data/jobDetails.data";
import { matchingJobs } from "@/data/jobs.data";
import { APP_ROUTES } from "@/constants";
import type { Job } from "../../types/jobs.types";
import saveIcon from "../../assets/imgs/save.png";

function Tag({ label }: { label: string }) {
  return (
    <span className="flex w-[120px] h-8 items-center justify-center gap-1 rounded-sm bg-primary px-md py-1 text-body-sm font-medium text-white">
  {label}
    <CircleCheck size={16} className="text-white" />

</span>
  );
}

export default function JobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const job = id ? jobDetails[Number(id)] : undefined;
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [recommendedJobs, setRecommendedJobs] = useState(matchingJobs);
    useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  const handleRemoveJob = (jobId: number) => {
    setRecommendedJobs((prev: Job[] )=> prev.filter(job   => job.id !== jobId));
  }; 
  if (!job) {
    return (
      <div className="rounded-2xl border border-border bg-card p-lg text-center text-normal">
        Job not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-lg lg:flex-row lg:items-start">

      <main className="order-2 min-w-0 flex-1 space-y-lg lg:order-1">

        <section className="rounded-2xl border border-border bg-card p-lg shadow-sm">
          <div className="flex items-center gap-sm">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-light">
              <img
                src={job.companyLogo}
                alt={job.company}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
                className="p-1"
              />
            </div>
            <span className="text-body-sm font-semibold text-text-primary">
              {job.company} Company
            </span>
          </div>

          <div className="mt-md flex flex-col justify-between gap-md sm:flex-row sm:items-center">
            <div>
              <h1 className="m-0 text-h3! font-semibold! text-text-primary sm:text-h4">
                {job.title}
              </h1>
              <p className="m-0 mt-1 text-body-sm text-normal">
                {job.location} · {job.postedAt}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-sm">
              <button
                type="button"
                onClick={() => setIsApplyOpen(true)}
                className="rounded-sm w-[200px] h-[55px] bg-primary px-lg py-3 text-body-sm font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                Apply
              </button>
              <button
                type="button"
                aria-label="Message"
                className="flex items-center    w-14 h-14  justify-center rounded-lg bg-primary-light text-black transition-colors hover:bg-primary-light-hover"
              >
               <img src={saveIcon} alt="Save"  />
              </button>
            </div>
          </div>

          <div className="mt-md flex flex-wrap gap-sm">
            {job.tags.map((tag: string) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </section>


        {job.qualificationMatch && (
          <section className="rounded-2xl border border-border bg-card p-lg shadow-sm">
            <div className="flex items-center gap-sm">
              <div className="flex h-15 w-15 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-light">
                <img
                  src={job.companyLogo}
                  alt={job.company}
                  style={{ objectFit: "contain", width: "100%", height: "100%" }}
                  className="p-1"
                />
              </div>
              <h2 className="ml-3 m-0 text-h2! font-bold! text-primary!">
                {job.qualificationMatch.percentage}% Qualified
              </h2>
            </div>

            <div className="mt-md grid gap-sm sm:grid-cols-2 sm:gap-lg">
              <ul className="m-0 flex list-none flex-col gap-sm p-0">
                {job.qualificationMatch.strengths.map((item: string) => (
                  <li key={item} className="flex items-start gap-2 text-body-sm text-text-primary">
                    <Check size={22} className="mt-0.5 text-bold! shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>

              <ul className="m-0 flex list-none flex-col gap-sm p-0">
                {job.qualificationMatch.gaps.map((item: string) => (
                  <li key={item} className="flex items-start gap-2 text-body-sm text-normal">
                    <XIcon size={22} className="mt-0.5 text-bold!  shrink-0 text-danger" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

           
          </section>
        )}


        <section className="space-y-md rounded-2xl border border-border bg-card p-md shadow-sm">
             {job.hiringContact && (
              <div className="mt-lg flex items-center justify-between   border-border mb-10">
                <div className="flex items-center  gap-sm">
                   <img
      src={job.companyLogo}
      alt={job.company}
      className="h-10 w-10 rounded-full object-contain bg-light p-2"
    />
                  <div>
<p className="m-0 text-body-md font-semibold! text-text-primary">
  <span className="inline">{job.company}</span>
  <span className="inline ml-1">Company</span>
</p>      
                  </div>
                </div>

                
              </div>
            )}
          <div>
            <h3 className="m-0 text-body-md! font-bold! text-text-primary">About {job.company}:</h3>
            <p className="m-0 mt-1 text-body-sm leading-relaxed text-black">
              {job.companyAbout}
            </p>
          </div>

          <div>
            <h3 className="m-0 text-body-md! font-bold! text-text-primary">About The Role:</h3>
            <p className="m-0 mt-1 text-body-sm leading-relaxed text-black">
              {job.roleAbout}
            </p>
          </div>

          <div>
            <h3 className="m-0 text-body-md! font-bold! text-text-primary">
              Duties &amp; Responsibilities:
            </h3>
            <ul className="m-0 mt-1 list-disc space-y-1 pl-lg text-body-sm leading-relaxed text-black">
              {job.responsibilities.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="m-0 text-body-md! font-bold! text-text-primary">Benefits</h3>
            <ul className="m-0 mt-1 list-disc space-y-1 pl-lg text-body-sm leading-relaxed text-black">
              {job.benefits.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>


     <aside className="hidden xl:block xl:w-95 xl:shrink-0 order-1">
        <JobListCard
          title="Job that match your Preferences"
          subtitle="UI/UX Designer, on site or hybrid ore remote in Cairo"
          jobs={recommendedJobs} 
          getJobHref={(job : Job) => APP_ROUTES.student.jobDetails(job.id)}
          onRemoveJob={handleRemoveJob} 
        />
      </aside>

      <ApplyJobModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        job={{ title: job.title, company: job.company }}
      />
    </div>
  );
}