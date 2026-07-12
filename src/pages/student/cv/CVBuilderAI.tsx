import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useCVStore } from "@/store/useCVStore";
import AIChatPanel from "@/components/resume/ai/AIChatPanel";

function CVBuilderAI() {
  const { templateId } = useParams<{ templateId: string }>();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("resumeId");
  
  const startNewDraft = useCVStore((s) => s.startNewDraft);
  const loadDraft = useCVStore((s) => s.loadDraft);

  useEffect(() => {
    if (templateId) {
      if (resumeId) {
        const savedDraft = localStorage.getItem('currentEditDraft');
        
        if (savedDraft) {
          const draftData = JSON.parse(savedDraft);
          loadDraft(draftData);
          localStorage.removeItem('currentEditDraft');
        } else {
          startNewDraft("ai", templateId);
        }
      } else {
        startNewDraft("ai", templateId);
      }
    }
  }, [templateId, resumeId]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="mb-1">
          {resumeId ? 'Edit your CV with AI' : 'Build your CV with AI'}
        </h1>
        <p className="text-(--muted-foreground) text-(--body-sm)">
          {resumeId 
            ? 'Update your experience, skills, and goals.'
            : "Tell us about your experience, skills, and goals — we'll draft it for you."
          }
        </p>
      </div>

      <AIChatPanel />
    </div>
  );
}

export default CVBuilderAI;