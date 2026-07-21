import { useParams, useNavigate } from "react-router-dom";
import { useTemplates } from "../../../hooks/useTemplates";
import { useBuilderUIStore } from "../../../store/useBuilderUIStore";
import TemplateCard from "../../../components/custom/resume/TempleteCard";
import { APP_ROUTES } from "../../../constants/router";

function TemplateSelection() {
  const { mode } = useParams<{ mode: "ai" | "manual" }>();
  const navigate = useNavigate();
  const { data: templates, isLoading, isError, error } = useTemplates();
  const setSelectedTemplateId = useBuilderUIStore((s) => s.setSelectedTemplateId);


  function handleUseTemplate(templateId: string) {
    setSelectedTemplateId(templateId);
  
    if (mode === "ai") {
      navigate(APP_ROUTES.student.cvBuilder.aiBuilder(templateId));
    } else {
      navigate(APP_ROUTES.student.cvBuilder.manualBuilder(templateId));
    }
  }

  if (isLoading) return <p>Loading templates...</p>;
  
  if (isError) return <p className="text-red-500">Error: {error?.message || "Something went wrong"}</p>;

  if (!templates || templates.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="mb-1">Choose a Template</h1>
          <p className="text-(--muted-foreground)">No templates available. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="mb-1">Choose a Template</h1>
        <p className="text-(--muted-foreground) text-(--body-sm)">Select a professional template that best represents you.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates?.map((template) => (
          <TemplateCard key={template.id} template={template} onSelect={handleUseTemplate} />
        ))}
      </div>
    </div>
  );
}

export default TemplateSelection;