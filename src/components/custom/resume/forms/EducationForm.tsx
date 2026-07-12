import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCVStore } from "@/store/useCVStore";

const inputClass =
  "bg-(--input) border-transparent rounded-(--radius-sm) h-11 px-4 text-(--text-primary) placeholder:text-(--muted-foreground) focus-visible:ring-2 focus-visible:ring-(--ring)";

function EducationForm() {
  const education = useCVStore((s) => s.draft.education);
  const addEducation = useCVStore((s) => s.addEducation);
  const updateEducation = useCVStore((s) => s.updateEducation);
  const removeEducation = useCVStore((s) => s.removeEducation);

  return (
    <div className="rounded-(--radius-lg) border border-(--border) bg-(--card) shadow-(--shadow-card) p-6 flex flex-col gap-5">
      <h3 className="text-h4-size! text-bold!">Education</h3>

      {education.length === 0 && (
        <p className="text-(--body-sm) text-(--muted-foreground)">No education added yet.</p>
      )}

      {education.map((entry) => (
        <div key={entry.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end border-b border-(--border) pb-4 last:border-0 last:pb-0">
          <div className="flex flex-col gap-1.5">
            <Label className="text-semibold! text-body-md!">University</Label>
            <Input
              value={entry.university}
              onChange={(e) => updateEducation(entry.id, { university: e.target.value })}
              placeholder="Cairo University"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-semibold! text-body-md!">Years of Graduation</Label>
            <div className="flex gap-2">
              <Input
                value={entry.yearsOfGraduation}
                onChange={(e) => updateEducation(entry.id, { yearsOfGraduation: e.target.value })}
                placeholder="2022"
                className={inputClass}
                
              />
              <Button type="button" variant="ghost" size="icon" onClick={() => removeEducation(entry.id)}>
                <Trash2 size={16} className="text-(--danger)" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        onClick={() => addEducation()}
            className="self-end  bg-primary hover:bg-(--primary-hover) text-white rounded-(--radius-sm) py-6 px-4 shrink-0"
            
      >
         Add Education +
      </Button>
    </div>
  );
}

export default EducationForm;