import { useState, useEffect } from "react";

interface Chat {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  timestamp: number;
  unreadCount: number;
  avatarUrl?: string;
  isOnline: boolean;
}

interface ChatSidebarProps {
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
}

export function ChatSidebar({ selectedChat, onSelectChat }: ChatSidebarProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch data from JSON
    fetch("/mocked/messages/message.json")
      .then((res) => res.json())
      .then((data) => setChats(data.chats))
      .catch((err) => console.error("Error loading chats:", err));
  }, []);

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);

    if (hours < 1) return "Just now";
    if (hours === 1) return "1 hour ago";
    if (hours < 24) return `${hours} hours ago`;
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-900">Chats</h1>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`p-3 mx-2 mb-1 rounded-lg cursor-pointer transition-colors ${
              selectedChat === chat.id
                ? "bg-gray-100"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                {chat.avatarUrl ? (
                  <img
                    src={chat.avatarUrl}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                    {chat.name.charAt(0)}
                  </div>
                )}
                {chat.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unreadCount}
                  </span>
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {formatTime(chat.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate mb-0.5">
                  {chat.role}
                </p>
                <p className="text-sm text-gray-600 truncate">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}