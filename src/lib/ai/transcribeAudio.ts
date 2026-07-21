// Transcribes audio/video files using Groq's Whisper API (free tier)

export async function transcribeAudio(file: File): Promise<string> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) throw new Error("Missing VITE_GROQ_API_KEY");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("model", "whisper-large-v3");
  formData.append("response_format", "text");

  const res = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Whisper transcription failed (${res.status}): ${err}`);
  }

  return await res.text();
}