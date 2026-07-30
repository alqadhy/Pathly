import { Plus, Trash2 } from "lucide-react";

import { Button } from "../../../ui/button";

type Props = {
  objectives: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (
    index: number,
    value: string
  ) => void;
};

const LearningObjectives = ({
  objectives,
  onAdd,
  onRemove,
  onChange,
}: Props) => {
  return (
    <div className="space-y-xl rounded-3xl border border-border bg-card p-2xl shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-h4 font-bold text-text-primary">
          Learning Objectives
        </h3>

        <Button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-sm"
        >
          <Plus size={18} />
          Add
        </Button>
      </div>

      <div className="space-y-lg">
        {objectives.map(
          (objective, index) => (
            <div
              key={index}
              className="flex items-center gap-md"
            >
              <input
                value={objective}
                onChange={(e) =>
                  onChange(
                    index,
                    e.target.value
                  )
                }
                placeholder={`Learning objective ${index + 1}`}
                className="h-12 flex-1 rounded-xl border border-border bg-background px-lg outline-none transition-all focus:border-primary"
              />

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() =>
                  onRemove(index)
                }
              >
                <Trash2 size={18} />
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LearningObjectives;