import { useCallback, useState } from "react";
import { aiProvider } from "../lib/ai";
import type { ChatMessage } from "../types/ai/chat";

const SYSTEM_PROMPT =
  "You are a helpful career-planning assistant. You have access to the user's profile, skills, education history, career goals, and application history. Help them build a personalized roadmap, explore career paths, and identify skill gaps.";

function makeId() {
  return crypto.randomUUID();
}

export function useChat(initialMessages: ChatMessage[] = []) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      const userMessage: ChatMessage = {
        id: makeId(),
        role: "user",
        content,
        createdAt: Date.now(),
      };

      const nextMessages = [...messages, userMessage];
      setMessages(nextMessages);
      setIsLoading(true);
      setError(null);

      try {
        const reply = await aiProvider.sendMessage([
          { role: "system", content: SYSTEM_PROMPT },
          ...nextMessages.map((m) => ({ role: m.role, content: m.content })),
        ]);

        const assistantMessage: ChatMessage = {
          id: makeId(),
          role: "assistant",
          content: reply,
          createdAt: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  return { messages, sendMessage, isLoading, error };
}