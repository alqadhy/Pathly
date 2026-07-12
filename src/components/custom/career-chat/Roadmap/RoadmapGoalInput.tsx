import { useState } from "react";

interface RoadmapGoalInputProps {
  onGenerate: (goal: string) => void;
  isLoading: boolean;
}

export function RoadmapGoalInput({ onGenerate, isLoading }: RoadmapGoalInputProps) {
  const [goal, setGoal] = useState("");

  return (
    <div className="flex items-center justify-center h-full p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 md:p-8 w-full ">
        <p className="text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">
          Enter Your Career Goal
        </p>

        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Describe your career goal..."
          rows={4}
          disabled={isLoading}
          className="w-full bg-gray-100 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-700 outline-none resize-none placeholder-gray-400 mb-3 sm:mb-4"
        />

        <button
          onClick={() => onGenerate(goal)}
          disabled={isLoading || !goal.trim()}
          className="w-full py-2.5 sm:py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base"
          style={{
            background: "linear-gradient(to right, #06b6d4, #6366f1)",
          }}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Generate My Roadmap</span>
            </>
          )}
        </button>

        <p className="text-[10px] sm:text-xs text-gray-400 text-center mt-3 sm:mt-4 px-2">
          AI has full access to your profile, CV, goals, and application history
        </p>
      </div>
    </div>
  );
}