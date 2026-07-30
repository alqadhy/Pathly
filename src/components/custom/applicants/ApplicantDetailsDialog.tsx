import { Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useApplication, useUpdateApplicationStatus } from '@/hooks/useApplications';
import { useApplicationsUIStore } from '@/store/useApplicationsUIStore';
import { getAiScreening } from '@/constants/aiScreeningOverlay';

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-medium">{value}</p>
    </div>
  );
}

export function ApplicantDetailsDialog() {
  const { activeModal, selectedApplicationId, closeModal, openInterview } =
    useApplicationsUIStore();
  const open = activeModal === 'details';

  const { data: application } = useApplication(selectedApplicationId);
  const { mutate: updateStatus, isPending } = useUpdateApplicationStatus();

  if (!application) return null;

  const { matchScore, qualifications } = getAiScreening(application.id);
  const passed = qualifications.filter((q) => q.passed);
  const failed = qualifications.filter((q) => !q.passed);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeModal()}>
      <DialogContent className=" gap-6 rounded-3xl bg-[#F8F9FC]! max-h-[90vh] overflow-y-auto p-6 m-2">
        <DialogHeader>
          <DialogTitle className="text-2xl! font-bold tracking-tight mb-2">
            {application.jobTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="rounded-2xl bg-white! p-6 my-3">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={application.avatarUrl} alt={application.name} />
              <AvatarFallback className="bg-muted text-muted-foreground">
                {application.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <p className="text-xl font-bold text-indigo-600">
              {matchScore}% Qualified
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-3 text-sm sm:grid-cols-2">
            {passed.map((q) => (
              <div key={q.label} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span className="leading-snug text-foreground/90">{q.label}</span>
              </div>
            ))}
            {failed.map((q) => (
              <div key={q.label} className="flex items-start gap-2.5">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <span className="leading-snug text-foreground/90">{q.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-5 ">
          <InfoField label="Name" value={application.name} />
          <InfoField label="Email" value={application.email} />
          <InfoField label="Phone Number" value={application.phoneNumber} />
          <InfoField label="Location" value={application.location} />
          <InfoField label="Employment type" value={application.employmentType} />
          <InfoField label="Years of experience" value={application.yearsOfExperience} />
        </div>

        {application.resumeUrl && (
          <div>
            <p className="mb-2 text-sm text-muted-foreground">Resume</p>
            <a
              href={application.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-muted/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 text-xs font-bold text-red-600">
                PDF
              </div>
              <p className="font-medium">{application.name}.pdf</p>
            </a>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="ghost"
            disabled={isPending}
            className="rounded-sm h-12 bg-red-600 px-6 text-white hover:bg-red-700! hover:text-white"
            onClick={() =>
              updateStatus(
                { id: application.id, status: 'rejected' },
                { onSuccess: closeModal }
              )
            }
          >
            Reject
          </Button>
          <Button
            className="rounded-sm h-12 bg-indigo-600 text-white px-6 hover:bg-indigo-700"
            onClick={() => openInterview(application.id)}
          >
            Schedule Interview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}