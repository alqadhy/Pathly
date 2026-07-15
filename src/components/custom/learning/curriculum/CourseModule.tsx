import { useState } from "react";

import {
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import type {
  LearningModule,
} from "../../../../../public/mocked/learning/learningContent";

import useLearningPlayerContext from "../../../../hooks/useLearningPlayerContext";

import CourseLesson from "./CourseLesson";

type Props = {
  module: LearningModule;
};

const CourseModule = ({
  module,
}: Props) => {
  const [open, setOpen] =
    useState(true);

  const {
    currentLesson,
    changeLesson,
    completedLessons,
  } = useLearningPlayerContext();

  const completedCount =
    module.lessons.filter((lesson) =>
      completedLessons.includes(
        lesson.id
      )
    ).length;

  return (
    <div className="border-b border-border">
      {/* Header */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="flex w-full items-center justify-between px-lg py-md transition-colors hover:bg-muted"
      >
        <div>
          <h3 className="text-left text-h4 font-semibold text-text-primary">
            {module.title}
          </h3>

          <p className="mt-xs text-[15px] text-text-secondary">
            {completedCount} / {module.lessons.length} Lessons
          </p>
        </div>

        {open ? (
          <ChevronDown size={22} />
        ) : (
          <ChevronRight size={22} />
        )}
      </button>

      {/* Lessons */}

      {open && (
        <div>
          {module.lessons.map(
            (lesson) => (
              <CourseLesson
                key={lesson.id}
                lesson={lesson}
                active={
                  currentLesson?.id ===
                  lesson.id
                }
                completed={completedLessons.includes(
                  lesson.id
                )}
                onClick={() =>
                  changeLesson(
                    lesson
                  )
                }
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default CourseModule;