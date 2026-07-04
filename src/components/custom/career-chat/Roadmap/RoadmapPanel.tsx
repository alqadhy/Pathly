import { useRoadmap } from "../../../../hooks/useRoadmap";
import { RoadmapStart } from "./RoadmapStart";
import { RoadmapGoalInput } from "./RoadmapGoalInput";
import { RoadmapResult } from "./RoadmapResult";

export function RoadmapPanel() {
  const {
    step,
    setStep,
    roadmap,
    isLoading,
    error,
    generateRoadmap,
    togglePhaseComplete,
    reset,
  } = useRoadmap();

  return (
    <div className="h-full flex flex-col">
      {/* Error banner */}
      {error && (
        <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Step renderer */}
      <div className="overflow-hidden">
        {step === "start" && (
          <RoadmapStart onStart={() => setStep("input")} />
        )}

        {step === "input" && (
          <RoadmapGoalInput
            onGenerate={generateRoadmap}
            isLoading={isLoading}
          />
        )}

        {step === "result" && roadmap && (
          <RoadmapResult
            roadmap={roadmap}
            onTogglePhase={togglePhaseComplete}
            onReset={reset}
          />
        )}
      </div>
    </div>
  );
}
