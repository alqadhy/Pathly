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
        className="flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium transition bg-amber-50 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      <button
        onClick={goToNextLesson}
        disabled={!hasNextLesson}
        className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default PlayerNavigation;