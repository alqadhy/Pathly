import { CircleCheck } from "lucide-react";

import type { Course } from "../../../../types/courses.types";

type Props = {
  course: Course;
};

const LearningOverview = ({ course }: Props) => {
  return (
    <div className="p-md">
      {/* ABOUT */}
      <div>
        <p className="mt-lg text-h4 font-bold text-text-primary">
          About This Course
        </p>

        <p className="max-w-[980px] text-h4 leading-[190%] text-dark">
          {course.about}
        </p>
      </div>

      {/* LEARN */}
      <div className="mt-sm">
        <p className="mb-sm text-h4 font-bold text-text-primary">
          You will learn
        </p>

        <div className="">
          {course.learn?.map((item) => (
            <div key={item} className="flex items-center gap-sm">
              <CircleCheck size={22} className="fill-primary text-text-light" />

              <span className="text-[22px] text-dark">
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