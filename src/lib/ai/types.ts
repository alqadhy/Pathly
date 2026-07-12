export interface AIProviderMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIProvider {
  /** Human-readable name, useful for debugging/UI */
  name: string;
  /** Send a full message history, get back the assistant's reply text */
  sendMessage: (messages: AIProviderMessage[]) => Promise<string>;
}