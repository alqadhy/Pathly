import type { LearningModule } from "../../../../../public/mocked/learning/learningContent";

import useLearningPlayerContext from "../../../../hooks/useLearningPlayerContext";

import CourseProgress from "../course-overview/CourseProgress";
import CourseModule from "./CourseModule";

type Props = {
  modules: LearningModule[];
  totalLessons: number;
};

const CourseCurriculum = ({
  modules,
  totalLessons,
}: Props) => {
  const { completedLessons } =
    useLearningPlayerContext();

  return (
    <aside className="w-full rounded-2xl border border-border bg-card shadow-card lg:w-[380px]">
      {/* Header */}

      <div className="border-b border-border p-lg">
        <h2 className="mb-md text-[28px] font-bold text-text-primary">
          Course Content
        </h2>

        <CourseProgress
          completed={completedLessons.length}
          totalLessons={totalLessons}
        />
      </div>

      {/* Modules */}

      <div className="max-h-[700px] overflow-y-auto">
        {modules.map((module) => (
          <CourseModule
            key={module.id}
            module={module}
          />
        ))}
      </div>
    </aside>
  );
};

export default CourseCurriculum;