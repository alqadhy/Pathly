import CourseCard from "../CourseCard";

import type { Course } from "../../../types/courses.types";
type Props = {
  course: Course;
  onClick: () => void;
};

const LearningCourseCard = ({
  course,
  onClick,
}: Props) => {
  return (
    <CourseCard
      {...course}
      buttonText="View Details"
      onClickFn={onClick}
    />
  );
};

export default LearningCourseCard;