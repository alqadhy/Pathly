import type { AddCourseFormData } from "../../../../types/instructor.types";

type Props = {
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  onChange: (
    field: keyof AddCourseFormData,
    value: string | number
  ) => void;
};

const CourseInfo = ({
  title,
  description,
  category,
  level,
  duration,
  price,
  onChange,
}: Props) => {
  return (
    <div className="space-y-xl rounded-3xl border border-border bg-card p-2xl shadow-card">
      <h3 className="text-h4 font-bold text-text-primary">
        Course Information
      </h3>

      <div className="space-y-md">
        <label className="text-body-md font-medium text-text-primary">
          Course Title
        </label>

        <input
          value={title}
          onChange={(e) =>
            onChange("title", e.target.value)
          }
          placeholder="Enter course title"
          className="h-12 w-full rounded-xl border border-border bg-background px-lg outline-none transition-all focus:border-primary"
        />
      </div>

      <div className="space-y-md">
        <label className="text-body-md font-medium text-text-primary">
          Description
        </label>

        <textarea
          rows={5}
          value={description}
          onChange={(e) =>
            onChange(
              "description",
              e.target.value
            )
          }
          placeholder="Write course description..."
          className="w-full rounded-xl border border-border bg-background p-lg outline-none transition-all focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
        <div className="space-y-md">
          <label className="text-body-md font-medium text-text-primary">
            Category
          </label>

          <input
            value={category}
            onChange={(e) =>
              onChange(
                "category",
                e.target.value
              )
            }
            placeholder="Frontend"
            className="h-12 w-full rounded-xl border border-border bg-background px-lg outline-none focus:border-primary"
          />
        </div>

        <div className="space-y-md">
          <label className="text-body-md font-medium text-text-primary">
            Level
          </label>

          <select
            value={level}
            onChange={(e) =>
              onChange(
                "level",
                e.target.value
              )
            }
            className="h-12 w-full rounded-xl border border-border bg-background px-lg outline-none focus:border-primary"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
        <div className="space-y-md">
          <label className="text-body-md font-medium text-text-primary">
            Duration
          </label>

          <input
            value={duration}
            onChange={(e) =>
              onChange(
                "duration",
                e.target.value
              )
            }
            placeholder="12 Hours"
            className="h-12 w-full rounded-xl border border-border bg-background px-lg outline-none focus:border-primary"
          />
        </div>

        <div className="space-y-md">
          <label className="text-body-md font-medium text-text-primary">
            Price
          </label>

          <input
            type="number"
            value={price}
            onChange={(e) =>
              onChange(
                "price",
                Number(e.target.value)
              )
            }
            className="h-12 w-full rounded-xl border border-border bg-background px-lg outline-none focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;