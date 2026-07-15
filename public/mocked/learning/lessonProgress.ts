import { getPlayerState } from "./learningPlayerStorage";

type Props = {
  userEmail: string;
  courseId: number;
  totalLessons: number;
};

export const getCourseProgress = ({
  userEmail,
  courseId,
  totalLessons,
}: Props) => {
  const state = getPlayerState(
    userEmail,
    courseId
  );

  if (!state) {
    return {
      started: false,
      completed: false,
      progress: 0,
      completedLessons: 0,
    };
  }

  const completedLessons =
    state.completedLessons.length;

  const progress =
    totalLessons === 0
      ? 0
      : Math.round(
          (completedLessons /
            totalLessons) *
            100
        );

  return {
    started: true,
    completed:
      completedLessons === totalLessons,
    progress,
    completedLessons,
  };
};