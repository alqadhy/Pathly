import { useMemo } from "react";

import { getAllPlayerStates } from "../../../../../public/mocked/learning/learningPlayerStorage";

import MyLearningCard from "./MyLearningCard";

import type { Course } from "../../../../types/courses.types";

type Props = {
  courses: Course[];
};

const MyLearningGrid = ({
  courses,
}: Props) => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") ||
      "{}"
  );

  const playerStates = useMemo(
    () =>
      getAllPlayerStates().filter(
        (item) =>
          item.userEmail ===
          currentUser.email
      ),
    [currentUser.email]
  );

  return (
    <div
      className="
        grid
        gap-xl
        sm:grid-cols-2
        xl:grid-cols-3
      "
    >
      {courses.map((course) => {
        const progress =
          playerStates.find(
            (item) =>
              item.courseId ===
              course.id
          );

        return (
          <MyLearningCard
            key={course.id}
            course={course}
            progress={progress}
          />
        );
      })}
    </div>
  );
};

export default MyLearningGrid;