import { useRef } from "react";
import type { SourceType } from "../../../../types/ai/notetaker";

interface UploadSourceProps {
  onFile: (file: File, type: SourceType) => void;
  disabled?: boolean;
}

const sources: {
  type: SourceType;
  label: string;
  accept: string;
  icon: React.ReactNode;
}[] = [
  {
    type: "audio",
    label: "Upload Audio Lecture",
    accept: "audio/*",
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    type: "video",
    label: "Upload Video Lecture",
    accept: "video/*",
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
      </svg>
    ),
  },
  {
    type: "pdf",
    label: "Upload Book/PDF",
    accept: "application/pdf",
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    ),
  },
];

export function UploadSource({ onFile, disabled }: UploadSourceProps) {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleChange = (type: SourceType, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile(file, type);
    e.target.value = "";
  };

  return (
    <div className="w-full">
      <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-3">Analyze New Source</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
        {sources.map(({ type, label, accept, icon }) => (
          <button
            key={type}
            disabled={disabled}
            onClick={() => inputRefs.current[type]?.click()}
            className="flex flex-col items-center justify-center gap-2 sm:gap-3 bg-indigo-50 hover:bg-indigo-100 transition-colors rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center disabled:opacity-50 disabled:cursor-not-allowed w-full"
          >
            {icon}
            <span className="text-[10px] sm:text-xs text-indigo-700 font-medium leading-snug">{label}</span>
            <input
              ref={(el) => { inputRefs.current[type] = el; }}
              type="file"
              accept={accept}
              className="hidden"
              onChange={(e) => handleChange(type, e)}
            />
          </button>
        ))}
      </div>
    </div>
  );
}