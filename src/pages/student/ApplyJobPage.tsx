import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

import JobApplicationForm from "../../components/custom/jobs-internships/JobApplicationForm";
import { Button } from "@/components/ui/button";


export default function ApplyJobPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState<{ title: string; company: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJobTitle() {
      if (!id) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch("/mocked/jobs/jobs.json");
        const data = await res.json();

        const allJobs = [...data.matchingJobs, ...data.recommendedJobs];
        const foundJob = allJobs.find((j: any) => String(j.id) === id);

        if (foundJob) {
          setJobData({ title: foundJob.title, company: foundJob.company });
        }
      } catch (error) {
        console.error("Failed to load job details for apply page", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobTitle();
  }, [id]);

  if (isLoading) {
    return <div className="p-10 text-center text-foreground">Loading application form...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
     

      <div className=" mx-auto  px-4">
        {jobData ? (
          <JobApplicationForm 
            jobId={id!} 
            jobTitle={jobData.title} 
            companyName={jobData.company} 
          />
        ) : (
          <div className="text-center text-destructive">
            Job not found. Please go back and try again.
          </div>
        )}
      </div>
    </div>
  );
}