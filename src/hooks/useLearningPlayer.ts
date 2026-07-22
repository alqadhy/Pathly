import {
  useEffect,
  useState,
} from "react";

import type { YouTubePlayer } from "react-youtube";

import type {
  LearningLesson,
} from "../../public/mocked/learning/learningContent";

import {
  completeLesson,
  getPlayerState,
  savePlayerState,
} from "../../public/mocked/learning/learningPlayerStorage";

type Props = {
  courseId: number;
  lessons: LearningLesson[];
};

const useLearningPlayer = ({
  courseId,
  lessons,
}: Props) => {
  const currentUser = JSON.parse(
    localStorage.getItem(
      "currentUser"
    ) || "{}"
  );

  const userEmail =
    currentUser.email || "";

  /* Lesson */

  const [
    currentLesson,
    setCurrentLesson,
  ] = useState<
    LearningLesson | undefined
  >();

  const [
    completedLessons,
    setCompletedLessons,
  ] = useState<number[]>([]);

  /* YouTube Player */

  const [
    player,
    setPlayer,
  ] =
    useState<YouTubePlayer | null>(
      null
    );

  /* Time */

  const [
    currentTime,
    setCurrentTime,
  ] = useState(0);

  const [
    duration,
    setDuration,
  ] = useState(0);

  /* Load State */

  useEffect(() => {
    if (lessons.length === 0)
      return;

    if (!userEmail) {
      setCurrentLesson(
        lessons[0]
      );
      return;
    }

    const state =
      getPlayerState(
        userEmail,
        courseId
      );

    if (!state) {
      setCurrentLesson(
        lessons[0]
      );

      setCurrentTime(0);

      setCompletedLessons([]);

      return;
    }

    const lesson =
      lessons.find(
        (item) =>
          item.id ===
          state.currentLessonId
      );

    setCurrentLesson(
      lesson || lessons[0]
    );

    setCurrentTime(
      state.currentTime
    );

    setCompletedLessons(
      state.completedLessons
    );
  }, [
    courseId,
    lessons,
    userEmail,
  ]);

  /* Save Progress */

  const saveProgress = () => {
    if (
      !userEmail ||
      !currentLesson
    )
      return;

    savePlayerState({
      userEmail,
      courseId,
      currentLessonId:
        currentLesson.id,
      currentTime,
      completedLessons,
    });
  };

  /* Change Lesson */

  const changeLesson = (
    lesson: LearningLesson
  ) => {
    saveProgress();

    setCurrentLesson(
      lesson
    );

    setCurrentTime(0);
  };

  /* Complete Lesson */

  const completeCurrentLesson =
    () => {
      if (
        !currentLesson ||
        !userEmail
      )
        return;

      if (
        completedLessons.includes(
          currentLesson.id
        )
      )
        return;

      completeLesson(
        userEmail,
        courseId,
        currentLesson.id
      );

      setCompletedLessons(
        (prev) => [
          ...prev,
          currentLesson.id,
        ]
      );
    };

  /* Navigation */

  const goToNextLesson =
    () => {
      if (!currentLesson)
        return;

      const index =
        lessons.findIndex(
          (lesson) =>
            lesson.id ===
            currentLesson.id
        );

      if (
        index === -1 ||
        index ===
          lessons.length - 1
      )
        return;

      changeLesson(
        lessons[index + 1]
      );
    };

  const goToPreviousLesson =
    () => {
      if (!currentLesson)
        return;

      const index =
        lessons.findIndex(
          (lesson) =>
            lesson.id ===
            currentLesson.id
        );

      if (index <= 0)
        return;

      changeLesson(
        lessons[index - 1]
      );
    };

  /* Time */

  const updateTime = (
    seconds: number
  ) => {
    setCurrentTime(seconds);
  };
const currentLessonIndex =
  currentLesson
    ? lessons.findIndex(
        (lesson) =>
          lesson.id === currentLesson.id
      )
    : -1;

const hasPreviousLesson =
  currentLessonIndex > 0;

const hasNextLesson =
  currentLessonIndex <
  lessons.length - 1;
  
  return {
    /* Lesson */

    currentLesson,
    changeLesson,

    completedLessons,
    completeCurrentLesson,

    /* Navigation */

    goToNextLesson,
    goToPreviousLesson,

    hasPreviousLesson,
    hasNextLesson,

    /* Time */

    currentTime,
    updateTime,

    duration,
    setDuration,

    /* YouTube Player */

    player,
    setPlayer,

    /* Storage */

    saveProgress,
  };
};

export default useLearningPlayer;