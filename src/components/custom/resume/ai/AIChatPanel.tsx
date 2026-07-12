import { useEffect, useRef, useState } from "react";
import { Bot, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCVStore } from "@/store/useCVStore";
import { useBuilderUIStore } from "@/store/useBuilderUIStore";
import { sendChatMessage, type ChatMessage } from "@/Services/ai.service";
import CVPreviewModal from "@/components/resume/preview/CVPreviewModal";

interface ScriptedStep {
  question: string;
  apply: (answer: string) => void;
}

function AIChatPanel() {
  const setPersonalInfo = useCVStore((s) => s.setPersonalInfo);
  const setContactInfo = useCVStore((s) => s.setContactInfo);
  const addEducation = useCVStore((s) => s.addEducation);
  const addExperience = useCVStore((s) => s.addExperience);
  const addSkill = useCVStore((s) => s.addSkill);
  const setSummary = useCVStore((s) => s.setSummary);
  const draft = useCVStore((s) => s.draft);
  const openPreview = useBuilderUIStore((s) => s.openPreview);

  const steps: ScriptedStep[] = [
    {
      question: "What's your full name?",
      apply: (answer) => {
        const [firstName, ...rest] = answer.trim().split(/\s+/);
        setPersonalInfo({ firstName, lastName: rest.join(" ") });
      },
    },
    {
      question: "What's your current job title and location? (e.g. \"Senior Product Designer, Cairo, Egypt\")",
      apply: (answer) => {
        const [currentPosition, ...locationParts] = answer.split(",");
        setPersonalInfo({ currentPosition: currentPosition.trim(), location: locationParts.join(",").trim() });
      },
    },
    {
      question: "What's your email and phone number?",
      apply: (answer) => {
        const emailMatch = answer.match(/[\w.-]+@[\w.-]+\.\w+/);
        const phoneMatch = answer.match(/\+?\d[\d\s-]{6,}/);
        setContactInfo({ email: emailMatch?.[0] ?? "", phoneNumber: phoneMatch?.[0]?.trim() ?? "" });
      },
    },
    {
      question: "Tell me about your most recent job: company, title, and 1-2 key achievements.",
      apply: (answer) => {
        addExperience({ company: "", jobTitle: "", yearsOfExperience: "", bullets: [answer] });
      },
    },
    {
      question: "Where did you study, and what year did you graduate?",
      apply: (answer) => {
        const yearMatch = answer.match(/\d{4}/);
        addEducation({ university: answer.replace(yearMatch?.[0] ?? "", "").trim(), yearsOfGraduation: yearMatch?.[0] ?? "" });
      },
    },
    {
      question: "List your top skills, separated by commas.",
      apply: (answer) => {
        answer.split(",").map((s) => s.trim()).filter(Boolean).forEach(addSkill);
      },
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: steps[0].question },
  ]);
  const [stepIndex, setStepIndex] = useState(0);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    const answer = input.trim();
    if (!answer || isSending) return;

    const userMessage: ChatMessage = { role: "user", content: answer };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);

    steps[stepIndex].apply(answer);

    const reply = await sendChatMessage([...messages, userMessage]);
    const nextIndex = stepIndex + 1;

    if (nextIndex < steps.length) {
      setMessages((prev) => [...prev, { role: "assistant", content: reply }, { role: "assistant", content: steps[nextIndex].question }]);
      setStepIndex(nextIndex);
    } else {
      const generatedSummary = `${draft.personalInfo.currentPosition || "Professional"} with hands-on experience across ${
        draft.skills.map((s) => s.name).slice(0, 3).join(", ") || "several domains"
      }.`;
      setSummary(generatedSummary);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply },
        { role: "assistant", content: "That's everything I need! I've drafted your CV — take a look." },
      ]);
      setIsDone(true);
    }

    setIsSending(false);
  }

  return (
    <div className="rounded-(--radius-md) border border-(--border) bg-(--card) flex flex-col h-[560px] max-w-2xl">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2 items-start ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-7 h-7 rounded-(--radius-full) flex items-center justify-center shrink-0 ${
              m.role === "user" ? "bg-(--secondary-light) text-(--secondary)" : "bg-(--primary-light) text-(--primary)"
            }`}>
              {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div className={`rounded-(--radius-md) px-3 py-2 text-(--body-sm) max-w-[80%] ${
              m.role === "user" ? "bg-(--secondary-light) text-(--secondary-darker)" : "bg-(--light) text-(--text-primary)"
            }`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-(--border) p-3 flex gap-2">
        {isDone ? (
          <Button onClick={openPreview} className="w-full">
            Preview my CV
          </Button>
        ) : (
          <>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your answer..."
              disabled={isSending}
            />
            <Button onClick={handleSend} disabled={isSending} size="icon">
              <Send size={16} />
            </Button>
          </>
        )}
      </div>

      <CVPreviewModal />
    </div>
  );
}

export default AIChatPanel;
