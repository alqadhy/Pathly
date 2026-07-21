export interface RoadmapResource {
  label: string;
  type: "book" | "course" | "tool" | "other";
}

export interface RoadmapPhase {
  id: number;
  title: string;
  subtitle: string;
  duration: string; // e.g. "2-3 months"
  skills: string[];
  resources: RoadmapResource[];
  completed: boolean;
}

export interface Roadmap {
  goal: string;
  estimatedDuration: string; // e.g. "18-24 months"
  phases: RoadmapPhase[];
}

export type RoadmapStep = "start" | "input" | "result";