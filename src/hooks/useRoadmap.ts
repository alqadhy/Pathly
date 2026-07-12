import { useState } from "react";
import { aiProvider } from "../lib/ai";
import type { Roadmap, RoadmapStep } from "../types/ai/roadmap";

const ROADMAP_SYSTEM_PROMPT = `
You are a career planning assistant. When the user gives you a career goal,
you must respond ONLY with a valid JSON object — no extra text, no markdown, no backticks.

The JSON must follow this exact structure:
{
  "goal": "string - the user's career goal",
  "estimatedDuration": "string - e.g. 18-24 months",
  "phases": [
    {
      "id": 1,
      "title": "Phase 1",
      "subtitle": "Foundation & Assessment",
      "duration": "2-3 months",
      "skills": ["skill1", "skill2", "skill3", "skill4"],
      "resources": [
        { "label": "Resource name", "type": "book" },
        { "label": "Resource name", "type": "course" },
        { "label": "Resource name", "type": "tool" }
      ],
      "completed": false
    }
  ]
}

Rules:
- Always create exactly 4 phases
- Each phase must have 4 skills and 3 resources
- resource type must be one of: "book", "course", "tool", "other"
- Return ONLY the JSON, nothing else
`;

export function useRoadmap() {
  const [step, setStep] = useState<RoadmapStep>("start");
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRoadmap = async (goal: string) => {
    if (!goal.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const reply = await aiProvider.sendMessage([
        { role: "system", content: ROADMAP_SYSTEM_PROMPT },
        { role: "user", content: `My career goal: ${goal}` },
      ]);

      // Strip any accidental markdown fences
      const clean = reply.replace(/```json|```/g, "").trim();
      const parsed: Roadmap = JSON.parse(clean);
      setRoadmap(parsed);
      setStep("result");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate roadmap"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePhaseComplete = (phaseId: number) => {
    if (!roadmap) return;
    setRoadmap({
      ...roadmap,
      phases: roadmap.phases.map((p) =>
        p.id === phaseId ? { ...p, completed: !p.completed } : p
      ),
    });
  };

  const reset = () => {
    setStep("start");
    setRoadmap(null);
    setError(null);
  };

  return {
    step,
    setStep,
    roadmap,
    isLoading,
    error,
    generateRoadmap,
    togglePhaseComplete,
    reset,
  };
}