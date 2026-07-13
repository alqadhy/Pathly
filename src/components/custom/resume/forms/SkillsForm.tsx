  import { useState } from "react";
  import { Eye, X } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Textarea } from "@/components/ui/textarea";
  import { Label } from "@/components/ui/label";
  import { Badge } from "@/components/ui/badge";
  import { skillSchema } from "@/schemas/skills.schema";
  import { useCVStore } from "@/store/useCVStore";
  import { useBuilderUIStore } from "@/store/useBuilderUIStore";

  function SkillsForm() {
    const skills = useCVStore((s) => s.draft.skills);
    const addSkill = useCVStore((s) => s.addSkill);
    const removeSkill = useCVStore((s) => s.removeSkill);
    const openPreview = useBuilderUIStore((s) => s.openPreview);

    const [input, setInput] = useState("");
    const [error, setError] = useState<string | null>(null);

    function handleAddSkill() {
      const result = skillSchema.safeParse({ name: input });
      if (!result.success) {
        setError(result.error.issues[0]?.message ?? "Invalid skill");
        return;
      }
      addSkill(result.data.name);
      setInput("");
      setError(null);
    }

    return (
      <div className="flex flex-col gap-4">
        <div className="rounded-(--radius-lg) border border-(--border) bg-(--card) shadow-(--shadow-card) p-6 flex flex-col gap-5">
          <h3 className="text-h4-size! text-bold!">Skills</h3>

          <div className="flex flex-col gap-1.5">
            <Label className="text-semibold! text-body-md!">What skills do you have</Label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              placeholder="e.g. UI/UX Design"
              className="bg-(--input) border-transparent rounded-(--radius-sm) min-h-24 px-4 py-3 text-(--text-primary) placeholder:text-(--muted-foreground) focus-visible:ring-2 focus-visible:ring-(--ring) resize-none"
            />
            {error && <p className="text-xs text-(--danger)">{error}</p>}

            <Button
              type="button"
              onClick={handleAddSkill}
              className="self-end    bg-(--primary) hover:bg-(--primary-hover) text-white rounded-(--radius-sm) py-6 px-4 shrink-0"
            >
              Add Skill <span className="text-lg leading-none">+</span>
            </Button>
          </div>

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill : { id: string; name: string }) => (
                <Badge key={skill.id}  className="gap-1.5 py-3 text-body-sm! px-3 bg-(--primary) text-white rounded-(--radius-sm) flex items-center justify-between">
                  {skill.name}
                  <button type="button" onClick={() => removeSkill(skill.id)}>
                    <X size={12} />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Button
          type="button"
          onClick={openPreview}
          className="mt-6 self-end bg-(--primary) hover:bg-(--primary-hover) text-white rounded-(--radius-sm) py-6 px-4 shrink-0 gap-2"
        >
          Preview
          <Eye size={22} />
        </Button>
      </div>
    );
  }

  export default SkillsForm;