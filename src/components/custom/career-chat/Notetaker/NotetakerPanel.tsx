import { useNotetaker } from "../../../../hooks/useNotetaker";
import { AudioPlayerCard } from "./AudioPlayerCard";
import { NoteResult } from "./NoteResult";
import { UploadSource } from "./UploadSource";

export function NotetakerPanel() {
  const { source, note, isLoading, loadingStep, error, handleFile } = useNotetaker();

  return (
    <div className="h-full overflow-y-auto p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4">
      {/* Upload cards — always visible */}
      <UploadSource onFile={handleFile} disabled={isLoading} />

      {/* Error */}
      {error && (
        <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Uploaded source player */}
      {source && <AudioPlayerCard source={source} />}

      {/* Loading state */}
      {isLoading && (
        <div className="bg-white rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center gap-3 shadow-sm">
          <svg className="animate-spin w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <p className="text-xs sm:text-sm text-gray-500 text-center">{loadingStep || "Processing..."}</p>
        </div>
      )}

      {/* Note result */}
      {!isLoading && note && <NoteResult note={note} />}

      {/* Empty state */}
      {!source && !isLoading && !note && (
        <div className="bg-white rounded-2xl p-4 sm:p-6 text-center text-gray-400 text-xs sm:text-sm shadow-sm">
          New Note
        </div>
      )}
    </div>
  );
}