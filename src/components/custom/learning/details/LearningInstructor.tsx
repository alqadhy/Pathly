import { Star } from "lucide-react";

import type { Course } from "../../../../types/courses.types";

type Props = {
  course: Course;
};

const LearningInstructor = ({ course }: Props) => {
  return (
    <div className="p-md">
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
            <p className="whitespace-nowrap text-h3 font-semibold leading-none text-dark">
              {course.instructor}
            </p>

            <div className="mt-sm flex items-center gap-xs">
              <Star size={18} className="fill-warning text-warning" />

              <span className="text-body-lg font-medium text-dark">
                {course.rating}
              </span>

              <span className="text-body-lg text-dark">
                ({course.reviews})
              </span>
            </div>
          </div>
        </div>

        <button className="h-[52px] rounded-sm border-2 border-primary bg-card px-xl text-h5 font-semibold text-primary transition-all duration-normal hover:bg-primary-hover hover:text-primary-foreground active:scale-[0.98] active:bg-primary-active ">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default LearningInstructor;