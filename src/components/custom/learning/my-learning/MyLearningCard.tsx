import { useNavigate } from "react-router-dom";

import CourseCard from "../../CourseCard";

import { APP_ROUTES } from "../../../../constants";

import type { Course } from "../../../../types/courses.types";
import type { LearningPlayerState } from "../../../../../public/mocked/learning/learningPlayerStorage";

type Props = {
  course: Course;
  progress?: LearningPlayerState;
};

const MyLearningCard = ({
  course,
  progress,
}: Props) => {
  const navigate = useNavigate();

  return (
    <CourseCard
      id={course.id}
      image={course.image}
      title={course.title}
      instructor={course.instructor}
      rating={course.rating}
      reviews={course.reviews}
      duration={course.duration}
      level={course.level}
      hasCertificate={course.hasCertificate}
      price={course.price}
      tag={course.tag}
      completedLessons={
        progress?.completedLessons.length ?? 0
      }
      totalLessons={course.totalLessons}
      showProgress={!!progress}
      buttonText="Continue Learning"
      onClickFn={() =>
        navigate(
          APP_ROUTES.Learning.continueCourse.replace(
            ":id",
            String(course.id)
          )
        )
      }
    />
  );
};

export default MyLearningCard;