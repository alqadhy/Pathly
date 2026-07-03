import { useEffect, useState } from "react";

import JobListCard from "@/components/custom/jobs-internships/JobListCard";
import { APP_ROUTES } from "@/constants";
import type { Internship } from "@/types/jobs.types";
import type { Job } from "../../types/jobs.types";

export default function JobsInternshipsDashboard() {
  const [matching, setMatching] = useState<Job[]>([]);
  const [recommended, setRecommended] = useState<Job[]>([]);
  const [internshipList, setInternshipList] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [jobsRes, internshipsRes] = await Promise.all([
          fetch("/mocked/jobs/jobs.json"),
          fetch("/mocked/jobs/internships.json"),
        ]);

        const jobsData = await jobsRes.json();
        const internshipsData = await internshipsRes.json();

        setMatching(jobsData.matchingJobs);
        setRecommended(jobsData.recommendedJobs);
        setInternshipList(internshipsData);
      } catch (error) {
        console.error("Failed to load jobs/internships data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) {
    return <div className="flex flex-col gap-lg">Loading...</div>;
  }

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