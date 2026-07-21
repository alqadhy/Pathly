import { useEffect } from "react";
import { createPortal } from "react-dom";
import {  X ,Download} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useBuilderUIStore } from "@/store/useBuilderUIStore";
import { useCVStore } from "@/store/useCVStore";
import { useResumeStore } from "@/store/useResumeStore";
import PreviewRenderer from "./PreviewRenderer";
import { downloadCV } from "@/lib/downloadCV";


function CVPreviewModal() {
  const isPreviewOpen = useBuilderUIStore((s) => s.isPreviewOpen);
  const closePreview = useBuilderUIStore((s) => s.closePreview);
  const draft = useCVStore((s) => s.draft);
  const saveResume = useResumeStore((s) => s.saveResume);
  const navigate = useNavigate();

  function handleSave() {
    saveResume(draft);
    closePreview();
    navigate("/student/cv");
  }

function handleDownload() {
  const firstName = draft.personalInfo.firstName || 'my';
  const lastName = draft.personalInfo.lastName || 'cv';
  downloadCV('cv-preview', `${firstName}-${lastName}-cv.pdf`);
}

  useEffect(() => {
    if (isPreviewOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isPreviewOpen]);


  if (!isPreviewOpen) return null;


  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      
     
      <div className="relative bg-white w-[95vw] max-w-[1000px] h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
   
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/20 shrink-0 bg-white mx-25">
          <h1  className="text-3xl! font-bold!">CV Preview</h1>
          <div className="flex items-center gap-3">
            
            <Button variant="outlined" size="icon" onClick={closePreview} className="border  bg-black/20">
              <X size={20} />
            </Button>
          </div>
        </div>

       
        <div className="flex-1 overflow-y-auto w-full  p-6 flex justify-center">
          <div className="w-[794px] max-w-full bg-white shadow-lg  rounded-sm h-fit">
            <PreviewRenderer cv={draft} />
          </div>
        </div>

       
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-black/20 shrink-0 bg-white mx-20">

          <Button onClick={handleSave} className="bg-primary text-white! w-40 h-13 rounded-sm text-body-lg">Save </Button>
                <Button onClick={handleDownload}  className="bg-primary text-white! w-15 h-13 rounded-sm text-body-lg"><Download size={30}/> </Button>

        </div>
      </div>
    </div>,
    document.body 
  );
}

export default CVPreviewModal;