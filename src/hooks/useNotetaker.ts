import { useState } from "react";
import { aiProvider } from "../lib/ai";
import { transcribeAudio } from "../lib/ai/transcribeAudio";
import { extractPdfText } from "../lib/ai/extractPdfText";
import type { GeneratedNote, UploadedSource } from "../types/ai/notetaker";

const NOTE_SYSTEM_PROMPT = `
You are a study assistant. You will receive raw text from a lecture, podcast, video, or book.
Generate structured study notes from it.

Respond ONLY with a valid JSON object — no markdown, no backticks, no extra text.

Use this exact structure:
{
  "summary": "2-4 sentence overview of the content",
  "keyPoints": "3-5 most important points, separated by newlines starting with •",
  "importantNotes": "2-3 critical insights or warnings, separated by newlines starting with •",
  "mainIdeas": "2-3 core ideas or themes, separated by newlines starting with •",
  "simpleExplanation": "Explain the content as if talking to a beginner in 2-3 sentences"
}
`;

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function getAudioDuration(file: File): Promise<string> {
  return new Promise((resolve) => {
    const audio = document.createElement("audio");
    audio.src = URL.createObjectURL(file);
    audio.onloadedmetadata = () => {
      const secs = Math.floor(audio.duration);
      const m = String(Math.floor(secs / 60)).padStart(2, "0");
      const s = String(secs % 60).padStart(2, "0");
      resolve(`${m}:${s}`);
    };
    audio.onerror = () => resolve("--:--");
  });
}

export function useNotetaker() {
  const [source, setSource] = useState<UploadedSource | null>(null);
  const [note, setNote] = useState<GeneratedNote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(""); // e.g. "Transcribing..." / "Generating notes..."
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File, type: UploadedSource["type"]) => {
    setError(null);
    setNote(null);
    setIsLoading(true);

    try {
      // Build source metadata
      const uploadedSource: UploadedSource = {
        name: file.name,
        type,
        size: formatFileSize(file.size),
        file,
      };

      if (type === "audio" || type === "video") {
        uploadedSource.duration = await getAudioDuration(file);
      }

      setSource(uploadedSource);

      // Step 1 — extract text from file
      let rawText = "";

      if (type === "audio" || type === "video") {
        setLoadingStep("Transcribing audio...");
        rawText = await transcribeAudio(file);
      } else if (type === "pdf") {
        setLoadingStep("Reading PDF...");
        rawText = await extractPdfText(file);
      }

      if (!rawText.trim()) throw new Error("Could not extract any text from this file.");

      // Step 2 — generate notes with AI
      setLoadingStep("Generating notes...");
      const reply = await aiProvider.sendMessage([
        { role: "system", content: NOTE_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Here is the content to analyze:\n\n${rawText.slice(0, 12000)}`, // cap at 12k chars
        },
      ]);

      const clean = reply.replace(/```json|```/g, "").trim();
      const parsed: GeneratedNote = JSON.parse(clean);
      setNote(parsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  const reset = () => {
    setSource(null);
    setNote(null);
    setError(null);
  };

  return { source, note, isLoading, loadingStep, error, handleFile, reset };
}