import {
  BookOpen,
  Clock3,
} from "lucide-react";

import useLearningPlayerContext from "../../../../hooks/useLearningPlayerContext";

import type { Course } from "../../../../types/courses.types";

type Props = {
  course: Course;
};

const CourseInfo = ({
  course,
}: Props) => {
  const {
    currentLesson,
  } = useLearningPlayerContext();

  if (!currentLesson)
    return null;

  return (
    <section className="mt-xl rounded-2xl border border-border bg-card p-xl shadow-card">
      <p className="text-body-lg font-medium text-primary">
        {course.title}
      </p>

      <h1 className="mt-sm text-[38px] font-bold text-text-primary">
        {currentLesson.title}
      </h1>

      <div className="mt-lg flex flex-wrap items-center gap-lg">
        <div className="flex items-center gap-xs text-body-lg text-text-secondary">
          <Clock3 size={18} />
          {currentLesson.duration}
        </div>

        <div className="flex items-center gap-xs text-body-lg text-text-secondary">
          <BookOpen size={18} />
          Lesson {currentLesson.id}
        </div>
      </div>

      <p className="mt-xl text-[19px] leading-[180%] text-text-secondary">
        {course.about}
      </p>
    </section>
  );
};

export default CourseInfo;