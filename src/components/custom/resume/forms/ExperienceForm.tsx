import { useState } from "react";
import {  Trash2} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCVStore } from "@/store/useCVStore";

const inputClass =
  "bg-(--input) border-transparent rounded-(--radius-sm) h-11 px-4 text-(--text-primary) placeholder:text-(--muted-foreground) focus-visible:ring-2 focus-visible:ring-(--ring)";

function ExperienceForm() {
  const experience = useCVStore((s) => s.draft.experience);
  const addExperience = useCVStore((s) => s.addExperience);
  const updateExperience = useCVStore((s) => s.updateExperience);
  const removeExperience = useCVStore((s) => s.removeExperience);

  const [bulletDrafts, setBulletDrafts] = useState<Record<string, string>>({});

  function handleAddBullet(expId: string) {
    const text = bulletDrafts[expId]?.trim();
    if (!text) return;
    const exp = experience.find((e) => e.id === expId);
    updateExperience(expId, { bullets: [...(exp?.bullets ?? []), text] });
    setBulletDrafts((prev) => ({ ...prev, [expId]: "" }));
  }

  function handleRemoveBullet(expId: string, index: number) {
    const exp = experience.find((e) => e.id === expId);
    updateExperience(expId, { bullets: (exp?.bullets ?? []).filter((_, i) => i !== index) });
  }

  return (
    <div className="rounded-(--radius-lg) border border-(--border) bg-(--card) shadow-(--shadow-card) p-6 flex flex-col gap-5">
      <h3 className="text-h4-size! text-bold!">Experience</h3>

      {experience.length === 0 && (
        <p className="text-(--body-sm) text-(--muted-foreground)">No experience added yet.</p>
      )}

      {experience.map((entry) => (
        <div key={entry.id} className="flex flex-col gap-3  pb-5 last:border-0 last:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-semibold! text-body-md!">Company</Label>
              <Input
                value={entry.company}
                onChange={(e) => updateExperience(entry.id, { company: e.target.value })}
                placeholder="Company name"
                className="bg-input  rounded-(--radius-sm) h-11 px-4 text-(--text-primary) placeholder:text-(--muted-foreground) focus-visible:ring-2 focus-visible:ring-(--ring)"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-semibold! text-body-md!">Job title</Label>
              <Input
                value={entry.jobTitle}
                onChange={(e) => updateExperience(entry.id, { jobTitle: e.target.value })}
                placeholder="Senior Product Designer"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-semibold! text-body-md!">Years of Experience</Label>
              <div className="flex gap-2">
                <Input
                  value={entry.yearsOfExperience}
                  onChange={(e) => updateExperience(entry.id, { yearsOfExperience: e.target.value })}
                  placeholder="2"
                  className={inputClass}
                />
                  
              </div>
           
            </div>
            
          </div>
 <Button type="button" variant="ghost" size="icon" onClick={() => removeExperience(entry.id)} className="text-danger hover:bg-(--danger-hover) self-end shrink-0 mx-1 ">
               <Trash2 size={32} className="text-danger " />
                </Button> 
         
        </div>
      ))}

      <Button
        type="button"
        onClick={() => addExperience()}
            className="self-end  bg-primary hover:bg-(--primary-hover) text-white rounded-(--radius-sm) py-6 px-4 shrink-0"
      >
         Add Experience +
      </Button>
    </div>
  );
}

export default ExperienceForm;