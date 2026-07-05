// Message Storage Utility Functions

const CHATS_KEY = "chats";
const MESSAGES_KEY = "messages";
const PROFILES_PREFIX = "profile_";

export interface Chat {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  timestamp: number;
  unreadCount: number;
  avatarUrl?: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
}

// Get all chats from localStorage
export function getChats(): Chat[] {
  try {
    const stored = localStorage.getItem(CHATS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading chats from localStorage:", error);
  }
  return [];
}

// Save chats to localStorage
export function saveChats(chats: Chat[]): void {
  try {
    localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
  } catch (error) {
    console.error("Error saving chats to localStorage:", error);
  }
}

// Get all messages from localStorage
export function getMessages(chatId: string): Message[] {
  try {
    const stored = localStorage.getItem(MESSAGES_KEY);
    if (stored) {
      const allMessages = JSON.parse(stored);
      return allMessages[chatId] || [];
    }
  } catch (error) {
    console.error(`Error loading messages for chat ${chatId}:`, error);
  }
  return [];
}

// Save all messages to localStorage
export function saveMessages(chatId: string, messages: Message[]): void {
  try {
    const stored = localStorage.getItem(MESSAGES_KEY);
    const allMessages = stored ? JSON.parse(stored) : {};
    allMessages[chatId] = messages;
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(allMessages));
  } catch (error) {
    console.error(`Error saving messages for chat ${chatId}:`, error);
  }
}

// Add or update a chat in the sidebar
export function addOrUpdateChat(chat: Chat): void {
  const chats = getChats();
  const existingIndex = chats.findIndex((c) => c.id === chat.id);
  
  if (existingIndex >= 0) {
    // Update existing chat
    chats[existingIndex] = {
      ...chats[existingIndex],
      lastMessage: chat.lastMessage,
      timestamp: chat.timestamp,
      unreadCount: chat.unreadCount,
    };
  } else {
    // Add new chat
    chats.unshift(chat);
  }
  
  saveChats(chats);
}

// Get profile data for a user
export function getProfile(userId: string): any {
  try {
    const stored = localStorage.getItem(`${PROFILES_PREFIX}${userId}`);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error(`Error loading profile for user ${userId}:`, error);
  }
  return null;
}
