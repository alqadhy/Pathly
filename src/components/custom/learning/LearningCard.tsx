import { useNavigate } from "react-router-dom";

import LearningCourseCard from "./LearningCourseCard";

import type { Course } from "../../../types/courses.types";

import type { LearningPlayerState } from "../../../../public/mocked/learning/learningPlayerStorage";

import { APP_ROUTES } from "../../../constants";

type Props = {
  course: Course;
  progress?: LearningPlayerState;
};

const LearningCard = ({
  course,
}: Props) => {
  const navigate = useNavigate();

  return (
    <LearningCourseCard
      course={course}
      onClick={() =>
        navigate(
          APP_ROUTES.Learning.courseDetails.replace(
          ":id",
          String(course.id)
          )
        )
      }
    />
  );
};

export default LearningCard;