import EmptyLearningState from "../../components/custom/learning/EmptyLearningState";
import LearningCard from "../../components/custom/learning/LearningCard";

import { learningData } from "../../data/learning.data";

const Learning = () => {
  return (
    <div
      className="
        space-y-2xl
        p-lg
        lg:p-2xl
      "
    >
      {/* HERO */}
      <EmptyLearningState />

      {/* SECTION */}
      <div className="space-y-lg">
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <h2
            className="
              text-h3
              font-bold
              text-text-primary
            "
          >
            Recommended Courses
          </h2>

          <button
            className="
              text-body-sm
              font-semibold
              text-primary
              transition-colors
              hover:text-primary-hover
              active:text-primary-active
            "
          >
            View All
          </button>
        </div>

        {/* GRID */}
        <div
          className="
            grid
            gap-lg
            sm:grid-cols-2
            xl:grid-cols-3
          "
        >
          {learningData.map((course) => (
            <LearningCard
              key={course.id}
              course={course}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learning;