import type { AIRequestType } from "@/lib/types/ai";

export function buildAIPrompt(type: AIRequestType, text: string): string {
  switch (type) {
    case "explain":
      return `Explain this in simple student-friendly words:\n\n${text}`;
    case "quiz":
      return `Generate 5 exam-style questions from this topic:\n\n${text}`;
    case "plan":
      return `Create a structured study plan for this topic:\n\n${text}`;
    default:
      return text;
  }
}

export function isAIRequestType(type: string): type is AIRequestType {
  return type === "explain" || type === "quiz" || type === "plan";
}
