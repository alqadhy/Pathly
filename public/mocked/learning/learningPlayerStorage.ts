const STORAGE_KEY = "learningPlayer";

export type LearningPlayerState = {
  userEmail: string;
  courseId: number;
  currentLessonId: number;
  currentTime: number;
  completedLessons: number[];
  updatedAt: string;
};

const getAllStates = (): LearningPlayerState[] => {
  const data =
    localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
};

export const getPlayerState = (
  userEmail: string,
  courseId: number
) => {
  return getAllStates().find(
    (item) =>
      item.userEmail === userEmail &&
      item.courseId === courseId
  );
};

export const savePlayerState = (
  state: LearningPlayerState
) => {
  const data = getAllStates();

  const index = data.findIndex(
    (item) =>
      item.userEmail ===
        state.userEmail &&
      item.courseId ===
        state.courseId
  );

  if (index === -1) {
    data.push(state);
  } else {
    data[index] = state;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
};

/* Helpers */

export const isLessonCompleted = (
  userEmail: string,
  courseId: number,
  lessonId: number
) => {
  const state = getPlayerState(
    userEmail,
    courseId
  );

  return (
    state?.completedLessons.includes(
      lessonId
    ) ?? false
  );
};
export const getAllPlayerStates = () => {
  return getAllStates();
};
export const completeLesson = (
  userEmail: string,
  courseId: number,
  lessonId: number
) => {
  const state =
    getPlayerState(
      userEmail,
      courseId
    );

  if (!state) return;

  if (
    state.completedLessons.includes(
      lessonId
    )
  )
    return;

  savePlayerState({
    ...state,
    completedLessons: [
      ...state.completedLessons,
      lessonId,
    ],
    updatedAt: new Date().toISOString(),
  });
  
};