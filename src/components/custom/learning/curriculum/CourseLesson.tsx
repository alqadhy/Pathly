import {
  CheckCircle2,
  PlayCircle,
} from "lucide-react";

import clsx from "clsx";

import type {
  LearningLesson,
} from "../../../../../public/mocked/learning/learningContent";

type Props = {
  lesson: LearningLesson;
  active: boolean;
  completed?: boolean;
  onClick: () => void;
};

const CourseLesson = ({
  lesson,
  active,
  completed = false,
  onClick,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex w-full items-center justify-between border-l-4 px-lg py-md transition-all duration-200 hover:bg-muted",
        active ? "border-primary bg-primary/5" : "border-transparent"
      )}
    >
      <div className="flex items-center gap-md">
        {completed ? (
          <CheckCircle2
            size={22}
            className="text-success"
          />
        ) : (
          <PlayCircle
            size={22}
            className="text-primary"
          />
        )}

        <div className="text-left">
          <h4 className={clsx("text-[17px] font-medium", active ? "text-primary" : "text-text-primary")}>
            {lesson.title}
          </h4>

          <p className="mt-[2px] text-body-sm text-text-secondary">
            {lesson.duration}
          </p>
        </div>
      </div>

      {active && (
        <span className="rounded-full bg-primary px-sm py-[2px] text-[12px] font-semibold text-white">
          Playing
        </span>
      )}
    </button>
  );
};

export default CourseLesson;