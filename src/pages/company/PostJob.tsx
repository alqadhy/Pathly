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
    <div className="mx-auto w-full py-8 px-4">
      
      <JobPostingForm onSubmit={handleSubmit} />
    </div>
  );
}