import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../../ui/dialog.tsx";
import { X, Upload } from "lucide-react";

import studentProfile from "../../../../public/mocked/profile/profile_user.json";

const JOB_PREFERENCES = {
  locations: "Cairo, Cairo, Egypt",
  employmentTypes: "Full time",
};

const APPLICANT = {
  name: studentProfile.name,
  email: studentProfile.personalInfo.email,
  phone: studentProfile.personalInfo.phone,
  locations: JOB_PREFERENCES.locations,
  employmentTypes: JOB_PREFERENCES.employmentTypes,
};

interface ApplyJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    title: string;
    company: string;
  };
}

function PdfFileIcon() {
  return (
    <div className="relative flex h-12 w-10 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-danger">
      <span
        className="absolute right-0 top-0 h-0 w-0 border-t-8 border-l-8 border-t-white/70 border-l-transparent"
        aria-hidden
      />
      <span className="text-[10px] font-bold text-white">PDF</span>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <h6 className="text-h6 font-bold text-text-primary">{label}</h6>
      <p className="text-body-sm text-normal">{value}</p>
    </div>
  );
}

export default function ApplyJobModal({
  isOpen,
  onClose,
  job,
}: ApplyJobModalProps) {
  const [resumeFile, setResumeFile] = useState<{
    name: string;
    tag: string;
  } | null>({
    name: studentProfile.cv.fileName,
    tag: studentProfile.title,
  });
  const [salary, setSalary] = useState("");
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requestClose = () => setShowDiscardConfirm(true);

  const handleDiscard = () => {
    setShowDiscardConfirm(false);
    onClose();
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile({ name: file.name, tag: resumeFile?.tag ?? "Resume" });
    }
    e.target.value = "";
  };

  const handleSubmitApply = () => {
    onClose();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open: boolean) => !open && requestClose()}
      >
        <DialogContent
          className="w-[92vw]! max-w-[800px]! max-h-[90vh]! p-0! gap-0! overflow-hidden bg-background! border-none shadow-card rounded-2xl [&_button:has(.sr-only)]:hidden"
          hideCloseButton={true}
        >
          <div className="relative px-6 pt-6  ">
            <button
              onClick={requestClose}
              aria-label="Close"
              className="absolute right-lg top-lg flex h-9 w-9 items-center justify-center rounded-full bg-light text-normal transition-colors hover:bg-light-hover"
            >
              <X className="h-4 w-4" />
            </button>

            <DialogTitle className="text-h3! font-bold text-text-primary pr-10">
              Apply to {job.company} Company
            </DialogTitle>
            <DialogDescription className="mt-1 text-body-sm text-normal pr-4">
              {job.title}
            </DialogDescription>
          </div>

          <div className="p-lg space-y-lg overflow-y-auto max-h-[calc(90vh-160px)]">
            <InfoRow label="Name" value={APPLICANT.name} />
            <InfoRow label="Email" value={APPLICANT.email} />
            <InfoRow label="Phone Number" value={APPLICANT.phone} />
            <InfoRow label="Locations" value={APPLICANT.locations} />
            <InfoRow
              label="Employment types"
              value={APPLICANT.employmentTypes}
            />

            <div className="space-y-sm">
              <h6 className="text-h6 font-bold text-text-primary">Resume</h6>

              {resumeFile && (
                <div className="flex items-center justify-between gap-sm rounded-lg border border-border p-sm">
                  <div className="flex items-center gap-sm">
                    <PdfFileIcon />
                    <div>
                      <p className="text-body-sm font-semibold text-text-primary">
                        {resumeFile.name}
                      </p>
                      <p className="text-body-sm text-normal">
                        {resumeFile.tag}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button
                  onClick={handleUploadClick}
                  className="flex items-center gap-1.5 rounded-sm border-2 mt-2 border-primary px-md py-2 text-body-sm font-semibold text-primary transition-colors hover:bg-primary-light"
                >
                  Upload <Upload className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-sm">
              <h6 className="text-h6 font-bold text-text-primary">
                Additional Questions
              </h6>
              <div className="space-y-1">
                <label className="text-body-sm text-normal text-bold!">
                  Current Net Salary
                </label>
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder=""
                  className="w-full rounded-sm border bg-white border-[#D0D5DD]/70  px-md mt-2 py-2.5 text-body-sm text-text-primary outline-none transition-all focus:border-ring"
                />
              </div>
            </div>
            <div className="flex justify-end  pt-0">
              <button
                onClick={handleSubmitApply}
                className="rounded-sm bg-primary w-40 px-lg py-3 text-body-sm font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                Apply
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showDiscardConfirm}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setShowDiscardConfirm(false);
          }
        }}
      >
        <DialogContent
          className="w-[92vw]! max-w-[420px]! p-0! gap-0! overflow-hidden bg-card border-none shadow-card rounded-2xl [&_button:has(.sr-only)]:hidden"
          hideCloseButton={true}
        >
          <div className="relative p-lg">
            <button
              onClick={() => setShowDiscardConfirm(false)}
              aria-label="Close"
              className="absolute right-lg top-lg flex h-9 w-9 items-center justify-center rounded-full bg-light text-normal transition-colors hover:bg-light-hover"
            >
              <X className="h-4 w-4" />
            </button>

            <DialogTitle className="text-h3! font-bold text-text-primary pr-10">
              Apply this application
            </DialogTitle>
            <DialogDescription className="mt-1 text-body-sm text-normal pr-4">
              {job.title}
            </DialogDescription>

            <p className="mt-lg text-center text-body-sm text-normal">
              If you choose to not apply, your application will be discarded.
            </p>

            <div className="mt-lg flex gap-sm">
              <button
                onClick={handleDiscard}
                className="flex-1 rounded-sm border border-primary px-md py-2.5 text-body-sm font-semibold text-primary transition-colors hover:bg-primary-light"
              >
                Discard
              </button>
              <button
                onClick={() => setShowDiscardConfirm(false)}
                className="flex-1 rounded-sm bg-primary px-md py-2.5 text-body-sm font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                Apply
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
