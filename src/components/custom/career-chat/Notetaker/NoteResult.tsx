import type { GeneratedNote } from "../../../../types/ai/notetaker";

interface NoteResultProps {
  note: GeneratedNote;
}

const sections = [
  {
    key: "summary" as keyof GeneratedNote,
    label: "Summary",
    icon: "≡",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    colSpan: "col-span-2", // full width
    mobileColSpan: "col-span-1 sm:col-span-2",
  },
  {
    key: "keyPoints" as keyof GeneratedNote,
    label: "Key Points",
    icon: "★",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    colSpan: "col-span-1",
    mobileColSpan: "col-span-1",
  },
  {
    key: "importantNotes" as keyof GeneratedNote,
    label: "Important Notes",
    icon: "⏱",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    colSpan: "col-span-1",
    mobileColSpan: "col-span-1",
  },
  {
    key: "mainIdeas" as keyof GeneratedNote,
    label: "Main Ideas",
    icon: "💡",
    color: "text-orange-400",
    bgColor: "bg-orange-50",
    colSpan: "col-span-1",
    mobileColSpan: "col-span-1",
  },
  {
    key: "simpleExplanation" as keyof GeneratedNote,
    label: "Simple Explanation",
    icon: "≡",
    color: "text-teal-500",
    bgColor: "bg-teal-50",
    colSpan: "col-span-1",
    mobileColSpan: "col-span-1",
  },
];

export function NoteResult({ note }: NoteResultProps) {
  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm">
      <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">New Note</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {sections.map(({ key, label, icon, color, bgColor, mobileColSpan }) => (
          <div
            key={key}
            className={`${mobileColSpan} ${bgColor} rounded-lg sm:rounded-xl p-2 sm:p-3`}
          >
            <p className={`text-[10px] sm:text-xs font-bold ${color} mb-1 flex items-center gap-1`}>
              <span className="text-xs sm:text-base">{icon}</span> {label}
            </p>
            <p className="text-[11px] sm:text-xs text-gray-700 leading-relaxed whitespace-pre-line break-words">
              {note[key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}