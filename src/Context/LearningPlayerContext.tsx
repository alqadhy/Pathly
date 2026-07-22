import { createContext } from "react";

import type { YouTubePlayer } from "react-youtube";

import type {
  LearningLesson,
} from "../../public/mocked/learning/learningContent";

type LearningPlayerContextType = {
  /* Current Lesson */

  currentLesson?: LearningLesson;

  changeLesson: (
    lesson: LearningLesson
  ) => void;

  completedLessons: number[];

  completeCurrentLesson: () => void;

  goToNextLesson: () => void;

  goToPreviousLesson: () => void;

  hasPreviousLesson: boolean;

  hasNextLesson: boolean;

  /* Time */

  currentTime: number;

  duration: number;

  updateTime: (
    seconds: number
  ) => void;

  setDuration: (
    seconds: number
  ) => void;

  /* YouTube Player */

  player: YouTubePlayer | null;

  setPlayer: (
    player: YouTubePlayer | null
  ) => void;

  /* Storage */

  saveProgress: () => void;
};

export const LearningPlayerContext =
  createContext<LearningPlayerContextType | null>(
    null
  );