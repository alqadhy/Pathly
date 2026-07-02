import { useState } from "react";

import JobListCard from "@/components/custom/jobs-internships/JobListCard";
import { matchingJobs, recommendedJobs } from "@/data/jobs.data";
import { internships } from "@/data/internships.data";
import { APP_ROUTES } from "@/constants";
import type { Internship } from "@/types/jobs.types";
import type { Job } from "../../types/jobs.types";

export default function JobsInternshipsDashboard() {
  const [matching, setMatching] = useState(matchingJobs);
  const [recommended, setRecommended] = useState(recommendedJobs);
  const [internshipList, setInternshipList] = useState(internships);

  return (
    <div className="flex flex-col gap-lg">
    
<JobListCard
  title="Job that match your Preferences"
  subtitle="UI/UX Designer, on site or hybrid or remote in Cairo"
  jobs={matching}
  getJobHref={(job : Job  ) => APP_ROUTES.student.jobDetails(job.id)}
  onRemoveJob={(id: number) =>
    setMatching((prev : Job[]) => prev.filter((job) => job.id !== id))
  }
/>

<JobListCard
  title="More jobs for you"
  subtitle="Based on your profile, preferences, and activity like applies, searches, and saves"
  jobs={recommended}
  getJobHref={(job : Job) => APP_ROUTES.student.jobDetails(job.id)}
  onRemoveJob={(id: number) =>
    setRecommended((prev : Job[]) => prev.filter((job) => job.id !== id))
  }
/>

<JobListCard
  title="Internships"
  subtitle="Based on your profile, preferences, and activity like applies, searches, and saves"
  jobs={internshipList}
  getJobHref={(job : Job) => APP_ROUTES.student.jobDetails(job.id)}
  onRemoveJob={(id: number) =>
    setInternshipList((prev : Internship[]) => prev.filter((job) => job.id !== id))
  }
  getTrailingLabel={(job: Job) => {
    const duration = (job as Internship).duration;
    return duration ? `Duration ${duration}` : undefined;
  }}
/>
    </div>
  );
}