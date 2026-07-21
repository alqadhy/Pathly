import { useTemplates } from "@/hooks/useTemplates";
import type { CVDraft } from "@/types/cv.types";
import SimpleLayout from "./layouts/SimpleLayout";
import ProfessionalLayout from "./layouts/ProfessionalLayout";
import ModernLayout from "./layouts/ModernLayout";
import SimpleClassicLayout from "./layouts/SimpleClassicLayout";

function PreviewRenderer({ cv }: { cv: CVDraft }) {
  const { data: templates } = useTemplates();
  const template = templates?.find((t) => t.id === cv.templateId);
  const layoutType = template?.layoutType ?? "simple";

  if (layoutType === "professional") return <ProfessionalLayout cv={cv} />;
  if (layoutType === "modern") return <ModernLayout cv={cv} />;
  if (layoutType == "simpleclassic") return <SimpleClassicLayout cv={cv}/>
  return <SimpleLayout cv={cv} />;
}

export default PreviewRenderer;
