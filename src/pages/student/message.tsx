import { useState } from "react";
import { ChatSidebar } from "../../components/custom/message/ChatSidebar";
import { ChatArea } from "../../components/custom/message/ChatArea";

export default function message() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

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