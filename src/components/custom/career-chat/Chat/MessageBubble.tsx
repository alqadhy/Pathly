import type { ChatMessage } from "../../../../types/ai/chat";

interface MessageBubbleProps {
  message: ChatMessage;
  userAvatarUrl?: string;
  assistantAvatarUrl?: string;
}

export function MessageBubble({ message, userAvatarUrl, assistantAvatarUrl }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return "Just now";
    if (minutes === 1) return "1 min";
    if (minutes < 60) return `${minutes} min`;
    
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return "1 hour";
    if (hours < 24) return `${hours} hours`;
    
    const days = Math.floor(hours / 24);
    if (days === 1) return "1 day";
    return `${days} days`;
  };

  const renderMessageContent = () => {
    const parts = message.content.split('\n');
    const elements: React.ReactNode[] = [];
    
    parts.forEach((part, index) => {
      const trimmedPart = part.trim();
      
      if (trimmedPart.startsWith('[Image uploaded:')) {
        // Extract image URL - match everything between the brackets
        const imageUrlMatch = trimmedPart.match(/\[Image uploaded: (.+?)\]/);
        if (imageUrlMatch && imageUrlMatch[1]) {
          const imageUrl = imageUrlMatch[1].trim();
          elements.push(
            <img
              key={index}
              src={imageUrl}
              alt="Uploaded"
              className="max-w-full max-h-64 rounded-lg mb-2"
            />
          );
        }
      } else if (trimmedPart.startsWith('[Voice message:')) {
        // Extract voice message URL
        const voiceUrlMatch = trimmedPart.match(/\[Voice message: (.+?)\]/);
        elements.push(
          <div key={index} className="flex items-center gap-2 mb-2 p-2 bg-gray-50 rounded-lg">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="text-sm text-gray-600">Voice message</span>
            {voiceUrlMatch && voiceUrlMatch[1] && (
              <audio controls className="max-w-xs ml-2">
                <source src={voiceUrlMatch[1].trim()} type="audio/webm" />
              </audio>
            )}
          </div>
        );
      } else if (trimmedPart) {
        elements.push(<span key={index}>{trimmedPart}</span>);
      }
    });

    return elements;
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {isAssistant && (
        <div className="flex-shrink-0 mr-2 sm:mr-3">
          {assistantAvatarUrl ? (
            <img
              src={assistantAvatarUrl}
              alt="Assistant avatar"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          )}
        </div>
      )}

      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[85%] sm:max-w-[70%]`}>
        <div
          className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm ${
            isUser
              ? "bg-white border border-gray-200 text-gray-800"
              : "bg-white border border-gray-200 text-gray-800"
          }`}
        >
          {renderMessageContent()}
        </div>
        <span className="text-[10px] sm:text-xs text-gray-400 mt-1 px-1">
          {formatTime(message.createdAt)}
        </span>
      </div>

      {isUser && (
        <div className="flex-shrink-0 ml-2 sm:ml-3">
          {userAvatarUrl ? (
            <img
              src={userAvatarUrl}
              alt="User avatar"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </div>
      )}
    </div>
  );
}