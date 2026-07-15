import { CircleCheck } from "lucide-react";

import type { Course } from "../../../../types/courses.types";

type Props = {
  course: Course;
};

const LearningOverview = ({ course }: Props) => {
  return (
    <div className="bg-card p-md">
      {/* ABOUT */}
      <div>
        <h3 className="mb-lg text-[32px] font-bold text-text-primary">
          About This Course
        </h3>

        <p className="max-w-[980px] text-[22px] leading-[190%] text-text-secondary">
          {course.about}
        </p>
      </div>

      {/* LEARN */}
      <div className="mt-2xl">
        <h3 className="mb-lg text-[32px] font-bold text-text-primary">
          You will learn
        </h3>

        <div className="space-y-md">
          {course.learn?.map((item) => (
            <div key={item} className="flex items-center gap-sm">
              <CircleCheck size={22} className="fill-primary text-primary" />

              <span className="text-[22px] text-text-secondary">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningOverview;