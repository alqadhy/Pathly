import { Star } from "lucide-react";

import { Button } from "../../../ui/button";

import type { Course } from "../../../../types/courses.types";

type Props = {
  course: Course;
};

const CourseMentor = ({
  course,
}: Props) => {
  return (
    <section className="mt-xl flex flex-col gap-lg rounded-2xl border border-border bg-card p-xl shadow-card lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-lg">
        {/* Image */}
        <img
          src={course.instructorImage}
          alt={course.instructor}
          className="h-[80px] w-[80px] rounded-full object-cover"
        />

        {/* Info */}
        <div>
          <h2 className="text-[28px] font-bold text-text-primary">
            {course.instructor}
          </h2>

          <div className="mt-sm flex items-center gap-sm">
            <Star size={18} className="fill-yellow-400 text-yellow-400" />

            <span className="text-body-lg font-medium text-text-secondary">
              {course.rating}
            </span>

            <span className="text-body-lg text-text-secondary">
              ({course.reviews})
            </span>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="h-[56px] rounded-xl px-xl text-body-lg font-semibold"
      >
        View Profile
      </Button>
    </section>
  );
};

export default CourseMentor;