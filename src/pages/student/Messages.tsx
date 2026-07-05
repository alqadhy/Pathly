import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ChatSidebar } from "../../components/custom/message/ChatSidebar";
import { ChatArea } from "../../components/custom/message/ChatArea";

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const userId = searchParams.get("userId");
    if (userId) {
      setSelectedChat(userId);
    }
  }, [searchParams]);

  return (
    <div className="h-screen flex bg-gray-50">
      <ChatArea chatId={selectedChat} />
      <ChatSidebar 
        selectedChat={selectedChat} 
        onSelectChat={setSelectedChat} 
      />
    </div>
  );
}
