// ==========================================================================
// IMPORTANT — read before wiring this to a real model
// ==========================================================================
// This app has no backend, but the Anthropic API requires a secret API key
// on every request. Calling api.anthropic.com directly from browser JS would
// mean shipping that key inside the bundle — anyone can open devtools and
// steal it. That is NOT safe to do, even for a side project.
//
// Options when you're ready to go from mock -> real AI:
// 1. A tiny serverless function (Vercel/Netlify/Cloudflare Worker) that
//    holds the key server-side and forwards the chat messages to
//    api.anthropic.com, returning only the response to the client.
// 2. A real backend endpoint if/when you add one.
//
// Until then, `sendChatMessage` below returns a scripted mock response so
// the AIChatPanel UI is fully clickable and demoable. Swap the body of this
// function for a `fetch('/api/ai-chat', ...)` call to your proxy later —
// nothing else in the app needs to change.
// ==========================================================================

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function sendChatMessage(messages: ChatMessage[]): Promise<string> {
  // Mocked network delay so the UI's loading state is exercised realistically
  await new Promise((resolve) => setTimeout(resolve, 500));

  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
  return `Got it — noted: "${lastUserMessage?.content ?? ""}"`;
}
