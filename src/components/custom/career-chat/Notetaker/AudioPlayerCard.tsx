import { useEffect, useRef, useState } from "react";
import type { UploadedSource } from "../../../../types/ai/notetaker";

interface AudioPlayerCardProps {
  source: UploadedSource;
}

export function AudioPlayerCard({ source }: AudioPlayerCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [current, setCurrent] = useState("00:00");
  const [progress, setProgress] = useState(0);
  const [objectUrl, setObjectUrl] = useState("");

  useEffect(() => {
    const url = URL.createObjectURL(source.file);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [source.file]);

  const handleTimeUpdate = () => {
    const el = audioRef.current;
    if (!el) return;
    const secs = Math.floor(el.currentTime);
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    setCurrent(`${m}:${s}`);
    setProgress(el.duration ? (el.currentTime / el.duration) * 100 : 0);
  };

  const typeIcon =
    source.type === "audio" ? "🎙️" : source.type === "video" ? "🎬" : "📄";

  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 shadow-sm">
      <div className="text-2xl sm:text-3xl shrink-0">{typeIcon}</div>
      <div className="flex-1 min-w-0 w-full">
        <p className="font-semibold text-sm text-gray-900 truncate">{source.name}</p>
        <p className="text-xs text-gray-400 truncate">
          {source.type.toUpperCase()} {source.duration && `• ${source.duration}`} • {source.size}
        </p>
        {(source.type === "audio" || source.type === "video") && objectUrl && (
          <>
            <audio
              ref={audioRef}
              src={objectUrl}
              onTimeUpdate={handleTimeUpdate}
              className="hidden"
            />
            <div className="mt-2">
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>{current}</span>
                <span>{source.duration ?? "--:--"}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}