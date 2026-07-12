import type { Roadmap } from "../../../../types/ai/roadmap";
import { RoadmapPhaseCard } from "./RoadmapPhaseCard";

interface RoadmapResultProps {
  roadmap: Roadmap;
  onTogglePhase: (id: number) => void;
  onReset: () => void;
}

export function RoadmapResult({ roadmap, onTogglePhase, onReset }: RoadmapResultProps) {
  const completedCount = roadmap.phases.filter((p) => p.completed).length;
  const total = roadmap.phases.length;
  const progressPercent = Math.round((completedCount / total) * 100);

  return (
    <div className="h-full overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
      {/* Header card */}
      <div className="bg-white border border-indigo-200 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-1">
          <h2 className="text-base sm:text-lg font-extrabold text-indigo-900 tracking-wide uppercase">
            Your Roadmap
          </h2>
          <button
            onClick={onReset}
            title="Start over"
            className="text-gray-400 hover:text-gray-600 transition-colors w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-0"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="sm:hidden text-xs text-gray-400">Start over</span>
          </button>
        </div>

        <p className="text-[10px] sm:text-xs text-indigo-400 mb-2 sm:mb-3 flex items-center gap-1">
          ⏱ Estimated duration: {roadmap.estimatedDuration}
        </p>

        {/* Progress bar */}
        <div className="w-full h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden mb-1.5 sm:mb-2">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-0 text-[10px] sm:text-xs text-gray-500">
          <span>{completedCount} of {total} phases completed</span>
          <span className="font-bold text-indigo-600">{progressPercent}% complete</span>
        </div>
      </div>

      {/* Phase cards */}
      <div className="space-y-3 sm:space-y-4">
        {roadmap.phases.map((phase) => (
          <RoadmapPhaseCard
            key={phase.id}
            phase={phase}
            onToggleComplete={onTogglePhase}
          />
        ))}
      </div>
    </div>
  );
}