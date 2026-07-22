import { useNavigate } from "react-router-dom";

import CourseProgress from "./course-overview/CourseProgress";
import LearningOverviewBadges from "./details/LearningOverview-Badges";

import { Button } from "../../ui/button";

import type { Course } from "../../../types/courses.types";
import type { LearningPlayerState } from "../../../../public/mocked/learning/learningPlayerStorage";

import { APP_ROUTES } from "../../../constants";

type Props = {
  course: Course;
  progress: LearningPlayerState;
};

const ContinueLearning = ({
  course,
  progress,
}: Props) => {
  const navigate = useNavigate();

  return (
    <section className="overflow-hidden rounded-2xl bg-card shadow-sm">
      <div className="flex flex-col xl:flex-row">
        {/* Image */}
        <div className="order-1 h-[220px] w-full sm:h-[300px] xl:h-auto xl:w-[40%]">
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="order-2 flex flex-1 flex-col justify-center p-lg sm:p-xl xl:p-2xl">
          <p className="mb-xs text-body-sm font-semibold uppercase tracking-wider text-primary md:text-body-md">
            Continue Learning
          </p>

          <h2 className="mb-sm text-h3 font-bold leading-tight text-text-primary sm:text-h2 lg:text-[42px]">
            {course.title}
          </h2>

          <p className="mb-xl text-body-md text-text-secondary sm:text-body-lg lg:text-[20px]">
            By Dr. {course.instructor}
          </p>

          <CourseProgress
            completed={progress.completedLessons.length}
            totalLessons={course.totalLessons}
          />

          <LearningOverviewBadges course={course} />

          <Button
            className="mt-2xl h-[56px] w-full rounded-xl text-body-lg font-bold sm:w-fit sm:min-w-[240px] lg:h-[64px] lg:text-[20px]"
            onClick={() =>
              navigate(
                `${APP_ROUTES.Learning.continueCourse.replace(
                  ":id",
                  String(course.id)
                )}?lesson=${progress.currentLessonId}`
              )
            }
          >
            Continue Learning
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContinueLearning;