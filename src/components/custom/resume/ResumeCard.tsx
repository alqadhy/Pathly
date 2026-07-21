import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Download, Pencil, Trash2 } from "lucide-react";
import ATSScoreBar from "@/components/custom/ATSScore";
import { getResumeThumbnail } from "../../../lib/getThumbnail";
import type { ResumeSummary } from "@/types/resume.types";
import { APP_ROUTES } from "../../../constants/router";
import { useResumeStore } from "@/store/useResumeStore";
import { downloadCV } from "@/lib/downloadCV";

import PreviewRenderer from "../resume/preview/PreviewRenderer";

interface ResumeCardProps {
  resume: ResumeSummary;
  onDelete: (id: string) => void;
}

function ResumeCard({ resume, onDelete }: ResumeCardProps) {
  const navigate = useNavigate();
  const thumbnail = getResumeThumbnail(resume.id);
  const getResumeById = useResumeStore((s) => s.getResumeById);

  const [downloadJob, setDownloadJob] = useState<{ data: any; fileName: string } | null>(null);
  const downloadElementId = `hidden-cv-preview-${resume.id}`;

  function handleEdit() {
    const fullResume = getResumeById(resume.id);

    if (fullResume?.data) {
      localStorage.setItem('currentEditDraft', JSON.stringify(fullResume.data));
    }

    if (resume.creationMode === 'ai') {
      navigate(APP_ROUTES.student.cvBuilder.aiBuilder(resume.templateId) + `?resumeId=${resume.id}`);
    } else {
      navigate(APP_ROUTES.student.cvBuilder.manualBuilder(resume.templateId) + `?resumeId=${resume.id}`);
    }
  }


  function handleDownload(e: React.MouseEvent) {
    e.stopPropagation();
    const fullResume = getResumeById(resume.id);

    if (!fullResume?.data) return;

    const firstName = fullResume.data.personalInfo.firstName || 'my';
    const lastName = fullResume.data.personalInfo.lastName || 'cv';

    setDownloadJob({
      data: fullResume.data,
      fileName: `${firstName}-${lastName}-cv.pdf`,
    });
  }

  useEffect(() => {
    if (!downloadJob) return;

    let cancelled = false;

    (async () => {

      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      await new Promise((resolve) => setTimeout(resolve, 250));

      if (cancelled) return;

      await downloadCV(downloadElementId, downloadJob.fileName);

      if (!cancelled) {
        setDownloadJob(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [downloadJob]);

  return (
    <div className="rounded-radius-md border border-border bg-card overflow-hidden flex flex-col">
      <div className="relative aspect-4/3 bg-light">
        <span
          className={`absolute top-3 right-6 text-white text-xs px-3 py-2 rounded-lg! font-medium ${
            resume.creationMode === 'ai' ? 'bg-primary' : 'bg-secondary'
          }`}
        >
          {resume.creationMode === 'ai' ? 'AI' : 'Manual'}
        </span>
        {thumbnail ? (
          <img src={thumbnail} alt={resume.title} className="w-full h-[290px] object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Download size={32} />
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div>
          <p className="font-semibold text-text-primary">{resume.title}</p>
          <p className="text-xs text-muted-foreground">
            Last edited {new Date(resume.lastEditedAt).toLocaleString()}
          </p>
        </div>

        <ATSScoreBar score={resume.atsScore} />

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={handleDownload}
            className="text-muted-foreground hover:text-text-primary transition-colors"
            title="Download"
          >
            <Download size={22} />
          </button>
          <button
            onClick={handleEdit}
            className="text-muted-foreground hover:text-text-primary transition-colors"
            title="Edit"
          >
            <Pencil size={22} />
          </button>
          <button
            onClick={() => onDelete(resume.id)}
            className="text-muted-foreground hover:text-danger transition-colors"
            title="Delete"
          >
            <Trash2 size={22} className="text-danger" />
          </button>
        </div>
      </div>

      {downloadJob &&
        createPortal(
          <div
            id={downloadElementId}
            style={{
              position: 'fixed',
              top: 0,
              left: '-9999px',
              width: '794px',
              background: '#ffffff',
            }}
          >
            <PreviewRenderer cv={downloadJob.data} />
          </div>,
          document.body
        )}
    </div>
  );
}

export default ResumeCard;