import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import useLearningPlayerContext from "../../../../hooks/useLearningPlayerContext";

const PlayerNavigation = () => {
  const {
    goToPreviousLesson,
    goToNextLesson,
    hasPreviousLesson,
    hasNextLesson,
  } = useLearningPlayerContext();

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={goToPreviousLesson}
        disabled={!hasPreviousLesson}
        className="flex items-center gap-xs rounded-xl border border-border bg-warning-light px-lg py-md text-body-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      <button
        onClick={goToNextLesson}
        disabled={!hasNextLesson}
        className="flex items-center gap-xs rounded-xl bg-primary px-lg py-md text-body-sm font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default PlayerNavigation;