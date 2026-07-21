import { useRef } from "react";

interface MessageInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  selectedImage: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  isRecording: boolean;
  onToggleRecording: () => void;
  recordedAudioUrl: string | null;
  onPlayRecording: () => void;
  onDiscardRecording: () => void;
  onSendRecording: () => void;
  isLoading: boolean;
  isPlaying: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export function MessageInput({
  input,
  onInputChange,
  onSend,
  onKeyDown,
  selectedImage,
  onImageUpload,
  onImageRemove,
  isRecording,
  onToggleRecording,
  recordedAudioUrl,
  onPlayRecording,
  onDiscardRecording,
  onSendRecording,
  isLoading,
  isPlaying,
  fileInputRef,
}: MessageInputProps) {
  return (
    <div className="border-t border-gray-200 p-3 sm:p-4">
      {/* Image Preview */}
      {selectedImage && (
        <div className="mb-3 relative inline-block">
          <img
            src={selectedImage}
            alt="Selected"
            className="max-h-24 sm:max-h-32 rounded-lg border border-gray-200"
          />
          <button
            onClick={onImageRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Recording Indicator */}
      {isRecording && (
        <div className="mb-3 flex flex-wrap items-center gap-2 text-red-600">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
          <span className="text-sm">Recording...</span>
          <button
            onClick={onToggleRecording}
            className="ml-auto px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
            Stop
          </button>
        </div>
      )}

      {/* Recording Playback */}
      {recordedAudioUrl && !isRecording && (
        <div className="mb-3 flex flex-wrap items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <svg
            className="w-5 h-5 text-gray-600 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
          <span className="text-sm text-gray-700 flex-1 min-w-[120px]">
            Voice message recorded
          </span>
          <button
            onClick={onPlayRecording}
            disabled={isPlaying}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50"
            title="Play recording"
          >
            {isPlaying ? (
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </button>
          <button
            onClick={onDiscardRecording}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            title="Discard recording"
          >
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
          <button
            onClick={onSendRecording}
            className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
            title="Send recording"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask about career planning..."
          className="flex-1 bg-transparent outline-none text-xs sm:text-sm min-w-0"
          disabled={isLoading || isRecording}
        />
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
          />

          {/* Image upload button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-full transition-colors"
            title="Upload image"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>

          {/* Voice recording button */}
          <button
            onClick={onToggleRecording}
            className={`p-1.5 sm:p-2 rounded-full transition-colors ${
              isRecording
                ? "bg-red-600 text-white hover:bg-red-700"
                : "hover:bg-gray-200"
            }`}
            title={isRecording ? "Stop recording" : "Start voice recording"}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </button>

          {/* Send button */}
          <button
            onClick={onSend}
            disabled={
              (!input.trim() && !selectedImage) ||
              isLoading ||
              isRecording
            }
            className="p-1.5 sm:p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            title="Send message"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* <p className="text-[10px] sm:text-xs text-gray-400 text-center mt-2 px-1">
        AI has full access to your profile, CV, goals, and application history
      </p> */}
    </div>
  );
}