import type { RoadmapPhase } from "../../../../types/ai/roadmap";

interface RoadmapPhaseCardProps {
  phase: RoadmapPhase;
  onToggleComplete: (id: number) => void;
}

const resourceIcon = (type: string) => {
  switch (type) {
    case "book":   return { icon: "📙", color: "text-orange-500" };
    case "course": return { icon: "🎓", color: "text-blue-500" };
    case "tool":   return { icon: "💎", color: "text-green-500" };
    default:       return { icon: "🔗", color: "text-gray-400" };
  }
};

export function RoadmapPhaseCard({ phase, onToggleComplete }: RoadmapPhaseCardProps) {
  return (
    <div className={`bg-white rounded-2xl p-4 sm:p-5 shadow-sm border ${phase.completed ? "border-indigo-200 opacity-70" : "border-gray-100"}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
        <div className="flex items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => onToggleComplete(phase.id)}
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors shrink-0 ${
              phase.completed
                ? "bg-indigo-600 border-indigo-600 text-white"
                : "border-gray-300 text-gray-400"
            }`}
          >
            {phase.completed ? "✓" : phase.id}
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] sm:text-xs text-gray-400 truncate">{phase.title}</p>
            <p className="font-semibold text-gray-900 text-xs sm:text-sm break-words">{phase.subtitle}</p>
          </div>
        </div>
        <span className="text-[10px] sm:text-xs text-indigo-500 bg-indigo-50 px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 shrink-0 w-full sm:w-auto justify-center sm:justify-start">
          ⏱ {phase.duration}
        </span>
      </div>

      {/* Skills & Resources */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Skills */}
        <div className="bg-gray-50 rounded-xl p-2 sm:p-3">
          <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-2">
            Skills
          </p>
          <div className="flex flex-wrap gap-1">
            {phase.skills.map((skill) => (
              <span
                key={skill}
                className="text-[10px] sm:text-[11px] bg-indigo-100 text-indigo-700 px-1.5 sm:px-2 py-0.5 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="bg-gray-50 rounded-xl p-2 sm:p-3">
          <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 sm:mb-2">
            Resources
          </p>
          <ul className="space-y-0.5 sm:space-y-1">
            {phase.resources.map((res) => {
              const { icon } = resourceIcon(res.type);
              return (
                <li key={res.label} className="text-[10px] sm:text-[11px] text-gray-600 flex items-center gap-1 truncate">
                  <span className="shrink-0">{icon}</span> 
                  <span className="truncate">{res.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}