import { Star } from "lucide-react";

import type { Course } from "../../../../types/courses.types";

type Props = {
  course: Course;
};

const LearningInstructor = ({ course }: Props) => {
  return (
    <div className=" bg-white p-md">
      <div className="flex flex-col gap-lg lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-lg">
          <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full">
            <img
              src={course.instructorImage}
              alt={course.instructor}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="whitespace-nowrap text-[32px] font-semibold leading-none text-text-primary">
              {course.instructor}
            </h3>

            <div className="mt-sm flex items-center gap-xs">
              <Star size={18} className="fill-yellow-400 text-yellow-400" />

              <span className="text-[18px] font-medium text-text-secondary">
                {course.rating}
              </span>

              <span className="text-[18px] text-text-secondary">
                ({course.reviews})
              </span>
            </div>
          </div>
        </div>

        <button className="h-[72px] w-full rounded-xl border-2 border-primary bg-white px-xl text-[24px] font-semibold text-primary transition-all duration-300 hover:bg-primary-hover hover:text-primary-foreground active:scale-[0.98] active:bg-primary-active lg:w-[230px]">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default LearningInstructor;