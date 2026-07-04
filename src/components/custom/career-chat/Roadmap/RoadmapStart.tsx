interface RoadmapStartProps {
  onStart: () => void;
}

export function RoadmapStart({ onStart }: RoadmapStartProps) {
  return (
    <div className="flex items-center justify-center h-full p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 md:p-10 w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg" style={{
            background: "linear-gradient(to right, #06b6d4, #6366f1)",
          }}>
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
          Start Your Career Journey
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
          Your personalized career path is waiting to be built. Select a field
          to build your custom roadmap tailored to your goals.
        </p>

        <button
          onClick={onStart}
          className="w-full py-3 sm:py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2 transition-colors shadow-md text-sm sm:text-base"
        >
          Start
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        <p className="text-[10px] sm:text-xs text-gray-400 mt-3 sm:mt-4 px-2">
          AI has full access to your profile, CV, goals, and application history
        </p>
      </div>
    </div>
  );
}