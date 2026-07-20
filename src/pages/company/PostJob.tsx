import { useNavigate } from "react-router-dom";
import { JobPostingForm } from "../../components/custom/companyJobs/JobPostingForm";
import { APP_ROUTES } from "../../constants";
import type { JobPostingFormValues } from "../../schemas/jobPosting.schema";

export default function PostJob() {
  const navigate = useNavigate();

  const handleSubmit = (values: JobPostingFormValues) => {
    // TODO: replace with a real mutation once the backend exists
    // (e.g. useMutation from tanstack-query calling application.service.ts).
    console.log("New job posting submitted:", values);
    navigate(APP_ROUTES.company.jobs);
  };

  return (
    <div className="mx-auto max-w-3xl py-8 px-4">
      <h1 className="text-[var(--h3-size)] font-semibold text-[var(--text-primary)] mb-6">
        Post a New Job
      </h1>
      <JobPostingForm onSubmit={handleSubmit} />
    </div>
  );
}