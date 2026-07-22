const STORAGE_KEY = "learningProgress";

export type LearningProgress = {
  userEmail: string;
  courseId: number;
  lessonId: number;
  watchedSeconds: number;
  completedLessons: number[];
};

export const getLearningProgress = (): LearningProgress[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
};

export const getCourseProgress = (
  email: string,
  courseId: number
) => {
  return getLearningProgress().find(
    (item) =>
      item.userEmail === email &&
      item.courseId === courseId
  );
};

export const saveCourseProgress = (
  progress: LearningProgress
) => {
  const progressList =
    getLearningProgress();

  const index =
    progressList.findIndex(
      (item) =>
        item.userEmail ===
          progress.userEmail &&
        item.courseId ===
          progress.courseId
    );

  if (index !== -1) {
    progressList[index] = progress;
  } else {
    progressList.push(progress);
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(progressList)
  );
};

export const updateLessonTime = (
  email: string,
  courseId: number,
  lessonId: number,
  watchedSeconds: number
) => {
  const progress =
    getCourseProgress(
      email,
      courseId
    );

  if (!progress) {
    saveCourseProgress({
      userEmail: email,
      courseId,
      lessonId,
      watchedSeconds,
      completedLessons: [],
    });

    return;
  }

  progress.lessonId = lessonId;
  progress.watchedSeconds =
    watchedSeconds;

  saveCourseProgress(progress);
};

export const completeLesson = (
  email: string,
  courseId: number,
  lessonId: number
) => {
  const progress =
    getCourseProgress(
      email,
      courseId
    );

  if (!progress) {
    saveCourseProgress({
      userEmail: email,
      courseId,
      lessonId,
      watchedSeconds: 0,
      completedLessons: [lessonId],
    });

    return;
  }

  if (
    !progress.completedLessons.includes(
      lessonId
    )
  ) {
    progress.completedLessons.push(
      lessonId
    );
  }

  saveCourseProgress(progress);
};