import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTemplateThumbnail } from "../../../lib/getThumbnail";
import type { Template } from "@/types/template.types";

interface TemplateCardProps {
  template: Template;
  onSelect: (templateId: string) => void;
}

function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const thumbnail = getTemplateThumbnail(template.id);

  return (
    <div className="rounded-(--radius-md) border border-(--border) bg-(--card) p-4 flex flex-col gap-3">
      <div className="aspect-[3/4] rounded-(--radius-sm) bg-(--light) overflow-hidden">
        {thumbnail ? (
          <img src={thumbnail} alt={template.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-(--muted-foreground) text-(--body-sm)">
            {template.name}
          </div>
        )}
      </div>

      <div>
        <p className="font-semibold text-body-lg! mb-2 text-black!">{template.name}</p>
        <div className="flex gap-1 flex-wrap mt-1.5">
          {template.tags.map((tag) => (
            <Badge key={tag}  className="text-xs font-normal bg-input/90 rounded-sm!">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Button onClick={() => onSelect(template.id)} className="mt-auto rounded-sm! text-white hover:bg-primary/90 bg-primary">
        Use Template
      </Button>
    </div>
  );
}

export default TemplateCard;