import { useParams } from 'react-router-dom';
import { ApplicantsTable } from '@/components/custom/applicants/ApplicantsTable';
import { ApplicantDetailsDialog } from '@/components/custom/applicants/ApplicantDetailsDialog';
import { InterviewDialog } from '@/components/custom/applicants/InterviewDialog';
import { SendMessageDialog } from '@/components/custom/applicants/SendMessageDialog';
import { useApplicationsStore } from '@/store/useApplicationsStore';
import { useSeedApplications } from '@/hooks/useSeedApplications';

export default function ApplicantsPage() {
  const { id: jobId } = useParams<{ id: string }>();
  useSeedApplications(); 
  const totalForJob = useApplicationsStore((s) =>
    jobId ? s.getApplicationsByJobId(jobId).length : s.getAllApplications().length
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6 md:p-8">
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Applicants
        </h1>
        <span className="text-sm text-muted-foreground">
          {totalForJob} Total Applicants
        </span>
      </div>

      <ApplicantsTable jobId={jobId} />

      <ApplicantDetailsDialog />
      <InterviewDialog />
      <SendMessageDialog />
    </div>
  );
}