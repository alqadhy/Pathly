import { useState, useRef, useEffect } from "react";
import { useChat } from "../../../../hooks/useChat";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { RoadmapPanel } from "../Roadmap/RoadmapPanel";
import {
  getCurrentUser,
  getStoredProfile,
} from "../../Profile/crud/profileStorage";
import type { Profile } from "../../../../types/profile";
import { NotetakerPanel } from "../Notetaker/NotetakerPanel";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant" as const,
  content:
    "Let's map out your career journey. I have access to your complete profile, skills, and goals. I can help you build a personalized roadmap, explore paths, or identify skill gaps. What would you like to focus on today?",
  createdAt: Date.now(),
};

const DATA_LOADED_ITEMS = [
  { label: "Skills & Technologies", loaded: true },
  { label: "Education history", loaded: true },
  { label: "Career goals", loaded: true },
  { label: "Applied & saved jobs", loaded: true },
  { label: "Course progress", loaded: true },
  { label: "Scholarship matches", loaded: true },
  { label: "Work experience", loaded: false },
];

const RECENT_ITEMS = [
  "Skills & Technologies",
  "Education history",
  "Career goals",
  "Applied & saved jobs",
  "Course progress",
  "Scholarship matches",
];

type TabType = "chat" | "notetaker" | "roadmap";

export function ChatPanel() {
  const [activeTab, setActiveTab] = useState<TabType>("chat");
  const { messages, sendMessage, isLoading, error } = useChat([
    WELCOME_MESSAGE,
  ]);
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userAvatarUrl, setUserAvatarUrl] = useState<string | undefined>(
    undefined,
  );
  const [userInitial, setUserInitial] = useState<string>("U");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const profile = getStoredProfile() as Profile | null;
    if (profile?.avatarImage?.url) {
      setUserAvatarUrl(profile.avatarImage.url);
    } else {
      // Get first letter from currentUser if no profile image
      const currentUser = getCurrentUser();
      if (currentUser?.fullName) {
        setUserInitial(currentUser.fullName.charAt(0).toUpperCase());
      }
    }
  }, []);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleSend = () => {
    if (!input.trim() && !selectedImage) return;
    if (isLoading) return;

    let messageContent = input;
    if (selectedImage) {
      messageContent += `\n[Image uploaded: ${selectedImage}]`;
    }

    sendMessage(messageContent);
    setInput("");
    setSelectedImage(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setSelectedImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordedAudioUrl(null);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const playRecording = () => {
    if (recordedAudioUrl) {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      const audio = new Audio(recordedAudioUrl);
      audioRef.current = audio;

      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      audio.onpause = () => setIsPlaying(false);

      audio.play();
    }
  };

  const discardRecording = () => {
    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setRecordedAudioUrl(null);
    setIsPlaying(false);
  };

  const sendRecording = async () => {
    if (recordedAudioUrl) {
      try {
        const response = await fetch(recordedAudioUrl);
        const audioBlob = await response.blob();
        const reader = new FileReader();

        reader.onload = () => {
          const audioData = reader.result as string;
          sendMessage(`[Voice message: ${audioData}]`);
          setRecordedAudioUrl(null);
          setIsPlaying(false);
        };

        reader.readAsDataURL(audioBlob);
      } catch (error) {
        console.error("Error sending voice message:", error);
        alert("Could not send voice message. Please try again.");
      }
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Top Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 rounded-lg! overflow-x-auto">
          <div className="flex min-w-max lg:min-w-0">
            <button
              onClick={() => handleTabClick("chat")}
              className={`flex-1 py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-medium rounded-tl-lg rounded-bl-lg transition-colors whitespace-nowrap ${
                activeTab === "chat"
                  ? "text-indigo-600 bg-indigo-50 "
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <span className="flex items-center justify-center gap-1 sm:gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                Chat
              </span>
            </button>
            <button
              onClick={() => handleTabClick("notetaker")}
              className={`flex-1 py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "notetaker"
                  ? "text-indigo-600 bg-indigo-50 "
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <span className="flex items-center justify-center gap-1 sm:gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Notetaker
              </span>
            </button>
            <button
              onClick={() => handleTabClick("roadmap")}
              className={`flex-1 py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-medium rounded-tr-lg rounded-br-lg transition-colors whitespace-nowrap ${
                activeTab === "roadmap"
                  ? "text-indigo-600 bg-indigo-50 "
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <span className="flex items-center justify-center gap-1 sm:gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Roadmap
              </span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {activeTab === "chat" && (
            <div className="h-full overflow-y-auto p-3 sm:p-6 space-y-4">
              {messages.map((m) => (
                <MessageBubble
                  key={m.id}
                  message={m}
                  userAvatarUrl={userAvatarUrl}
                  userInitial={userInitial}
                />
              ))}
              {isLoading && (
                <div className="text-sm text-gray-400 italic">Thinking...</div>
              )}
              {error && (
                <div className="text-sm text-red-500 mt-2">Error: {error}</div>
              )}
            </div>
          )}

          {activeTab === "roadmap" && <RoadmapPanel />}
          {activeTab === "notetaker" && <NotetakerPanel />}
        </div>

        {/* Input Area - Only show for chat tab */}
        {activeTab === "chat" && (
          <MessageInput
            input={input}
            onInputChange={setInput}
            onSend={handleSend}
            onKeyDown={handleKeyDown}
            selectedImage={selectedImage}
            onImageUpload={handleImageUpload}
            onImageRemove={() => setSelectedImage(null)}
            isRecording={isRecording}
            onToggleRecording={toggleRecording}
            recordedAudioUrl={recordedAudioUrl}
            onPlayRecording={playRecording}
            onDiscardRecording={discardRecording}
            onSendRecording={sendRecording}
            isLoading={isLoading}
            isPlaying={isPlaying}
            fileInputRef={fileInputRef}
          />
        )}
        <p className="text-[10px] sm:text-xs text-gray-400 text-center mt-2 px-1">
          AI has full access to your profile, CV, goals, and application history
        </p>
      </div>

      {/* Right Sidebar - Hidden on mobile, shown on desktop */}
      <div className="hidden lg:block w-64 xl:w-80 p-4 xl:p-6 overflow-y-auto ">
        {/* New Chat Button */}
        {activeTab === "chat" && (
          <button
            onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-6"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New chat
          </button>
        )}

        {/* Data Loaded Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Data Loaded
          </h3>
          <div className="space-y-2">
            {DATA_LOADED_ITEMS.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                {item.loaded ? (
                  <svg
                    className="w-4 h-4 text-green-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-red-500 flex-shrink-0"
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
                )}
                <span
                  className={item.loaded ? "text-gray-700" : "text-gray-400"}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Resents Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Resents
          </h3>
          <div className="space-y-2">
            {RECENT_ITEMS.map((item, index) => (
              <div
                key={index}
                className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
