import { useState, useEffect } from "react";
import { MessageBubble } from "../career-chat/Chat/MessageBubble";
import { MessageInput } from "../career-chat/Chat/MessageInput";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
}

interface ChatAreaProps {
  chatId: string | null;
}

export function ChatArea({ chatId }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatName, setChatName] = useState("");
  const [chatRole, setChatRole] = useState("");
  const [chatAvatar, setChatAvatar] = useState<string | undefined>(undefined);
  const [userAvatar, setUserAvatar] = useState<string | undefined>(
    "https://i.pravatar.cc/150?u=student",
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = {
    current: null,
  } as React.RefObject<HTMLInputElement | null>;

  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      setChatName("");
      setChatAvatar(undefined);
      return;
    }

    // Fetch chat data and messages from JSON
    fetch("/mocked/messages/message.json")
      .then((res) => res.json())
      .then((data) => {
        const chat = data.chats.find((c: any) => c.id === chatId);
        if (chat) {
          setChatName(chat.name);
          setChatRole(chat.role);
          setChatAvatar(chat.avatarUrl);
        }
        const chatMessages = data.messages[chatId] || [];
        setMessages(chatMessages);
      })
      .catch((err) => console.error("Error loading messages:", err));
  }, [chatId]);

  // Load current user profile
  useEffect(() => {
    // Fetch user profile from JSON
    fetch("/mocked/Profile/profile.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.avatarImage?.url) {
          setUserAvatar(data.avatarImage.url);
        }
      })
      .catch((err) => console.error("Error loading user profile:", err));
  }, []);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !chatId) return;

    let messageContent = inputValue;
    if (selectedImage) {
      messageContent += `\n[Image uploaded: ${selectedImage}]`;
    }
    if (recordedAudioUrl) {
      messageContent += `\n[Voice message: ${recordedAudioUrl}]`;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setSelectedImage(null);
    setRecordedAudioUrl(null);
    setIsTyping(true);

    // Simulate assistant response
    setTimeout(() => {
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Thanks for your message! I'm processing your request and will provide a detailed response shortly.",
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, assistantResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const playRecording = () => {
    if (recordedAudioUrl) {
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 2000);
    }
  };

  const discardRecording = () => {
    setRecordedAudioUrl(null);
    setIsPlaying(false);
  };

  const sendRecording = () => {
    if (recordedAudioUrl) {
      handleSendMessage();
    }
  };

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          {/* Illustration */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            {/* Chat bubbles */}
            <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Main chat bubble */}
              <path
                d="M40 120C40 120 40 80 40 80C40 66.745 50.745 56 64 56H136C149.255 56 160 66.745 160 80V120C160 133.255 149.255 144 136 144H100L80 164V144H64C50.745 144 40 133.255 40 120Z"
                stroke="#6366F1"
                strokeWidth="2.5"
                fill="white"
              />
              {/* Three dots */}
              <circle cx="85" cy="100" r="4" fill="#6366F1" />
              <circle cx="100" cy="100" r="4" fill="#6366F1" />
              <circle cx="115" cy="100" r="4" fill="#6366F1" />
              
              {/* Secondary chat bubble */}
              <path
                d="M120 140C120 140 120 100 120 100C120 86.745 130.745 76 144 76H160C173.255 76 184 86.745 184 100V140C184 153.255 173.255 164 160 164H144C130.745 164 120 153.255 120 140Z"
                stroke="#06B6D4"
                strokeWidth="2.5"
                fill="white"
              />
              
              {/* Paper airplane */}
              <path
                d="M150 40L165 55M165 55L150 70M165 55H135"
                stroke="#6366F1"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Stars/sparkles */}
              <circle cx="50" cy="60" r="2" fill="#6366F1" />
              <circle cx="170" cy="90" r="2" fill="#06B6D4" />
              <circle cx="45" cy="140" r="2" fill="#06B6D4" />
              <circle cx="175" cy="150" r="2" fill="#6366F1" />
            </svg>
          </div>

          {/* Text */}
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            No Conversation yet
          </h2>
          <p className="text-gray-600 mb-6 mx-auto">
            Start networking with instructors and companies.
          </p>

          {/* Button */}
          <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
            Start a Conversation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white h-full">
      {/* Chat Header */}
      <div className="px-6 py-4 ">
        <h2 className="text-lg font-semibold text-gray-900">{chatName}</h2>
        <p className="text-xs text-gray-500 truncate mb-0.5">{chatRole}</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            userAvatarUrl={message.role === "user" ? userAvatar : chatAvatar}
            assistantAvatarUrl={
              message.role === "assistant" ? chatAvatar : undefined
            }
          />
        ))}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <MessageInput
        input={inputValue}
        onInputChange={setInputValue}
        onSend={handleSendMessage}
        onKeyDown={handleKeyPress}
        selectedImage={selectedImage}
        onImageUpload={handleImageUpload}
        onImageRemove={() => setSelectedImage(null)}
        isRecording={isRecording}
        onToggleRecording={toggleRecording}
        recordedAudioUrl={recordedAudioUrl}
        onPlayRecording={playRecording}
        onDiscardRecording={discardRecording}
        onSendRecording={sendRecording}
        isLoading={isTyping}
        isPlaying={isPlaying}
        fileInputRef={fileInputRef}
      />
    </div>
  );
}
