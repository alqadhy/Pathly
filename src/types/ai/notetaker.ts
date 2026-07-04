export type SourceType = "audio" | "video" | "pdf";

export interface UploadedSource {
  name: string;
  type: SourceType;
  size: string;       // e.g. "12.4 MB"
  duration?: string;  // e.g. "08:32" — only for audio/video
  file: File;
}

export interface GeneratedNote {
  summary: string;
  keyPoints: string;
  importantNotes: string;
  mainIdeas: string;
  simpleExplanation: string;
}