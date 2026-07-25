import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useCVStore } from "../../../store/useCVStore";
import { useResumeStore } from "../../../store/useResumeStore";
import BuilderStepper from "../../../components/custom/resume/BuilderStepper";

function CVBuilderManual() {
  const { templateId } = useParams<{ templateId: string }>();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("resumeId");
  
  const startNewDraft = useCVStore((s) => s.startNewDraft);
  const loadDraft = useCVStore((s) => s.loadDraft);
  const getResumeById = useResumeStore((s) => s.getResumeById);
  const draft = useCVStore((s) => s.draft); 

  useEffect(() => {
    console.log("=== CVBuilderManual ===");
    console.log("templateId:", templateId);
    console.log("resumeId:", resumeId);
    
    if (!templateId) return;

    if (resumeId) {
      const savedResume = getResumeById(resumeId);
      
      if (savedResume && savedResume.data) {
        loadDraft(savedResume.data);
        console.log("Draft after loading:", useCVStore.getState().draft);
      } else {
        startNewDraft("manual", templateId);
      }
    } else {
      startNewDraft("manual", templateId);
    }
  }, [templateId, resumeId]);

  useEffect(() => {
    console.log("Current draft updated:", draft);
  }, [draft]);

  return (
    <div className="flex flex-col gap-6 ">
      <div>
        <h1 className="mb-1">
          {resumeId ? 'Edit Your CV' : 'CV Builder'}
        </h1>
        <p className="text-(--muted-foreground) text-(--body-sm)">
          {resumeId ? 'Update your professional ATS CV' : "Let's build final professional ATS CV"}
        </p>
      </div>

      <BuilderStepper />
    </div>
  );
}

export default CVBuilderManual;