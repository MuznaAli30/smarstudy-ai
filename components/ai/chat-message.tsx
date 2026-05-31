"use client";

import { TypingText } from "@/components/ai/typing-text";
import type { AIRequestType } from "@/lib/types/ai";
import { noteTypeLabel, aiTypeToNoteType } from "@/lib/types/note";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  type?: AIRequestType;
  animate?: boolean;
  onCopy?: () => void;
  onSave?: () => void;
  saving?: boolean;
}

const typeLabels: Record<AIRequestType, string> = {
  explain: "Explain",
  quiz: "Quiz",
  plan: "Study Plan",
};

export function ChatMessage({
  role,
  content,
  type,
  animate = false,
  onCopy,
  onSave,
  saving,
}: ChatMessageProps) {
  if (role === "user") {
    return (
      <div className="flex justify-end animate-fade-in">
        <div className="max-w-[85%] rounded-2xl rounded-br-md px-4 py-3 gradient-bg text-white text-sm leading-relaxed shadow-md">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start animate-fade-in">
      <div className="max-w-[85%] glass-card rounded-2xl rounded-bl-md px-4 py-3 text-sm leading-relaxed">
        {type && (
          <span className="inline-block text-xs font-semibold text-indigo-500 mb-2 px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950">
            {typeLabels[type]}
          </span>
        )}
        <div className="whitespace-pre-wrap">
          {animate ? <TypingText text={content} /> : content}
        </div>
        {(onCopy || onSave) && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-slate-200/50">
            {onCopy && (
              <button
                onClick={onCopy}
                className="btn-secondary text-xs px-3 py-1.5 rounded-lg"
              >
                Copy response
              </button>
            )}
            {onSave && (
              <button
                onClick={onSave}
                disabled={saving}
                className="btn-primary text-xs px-3 py-1.5 rounded-lg disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save to Notes"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function getNoteTitle(type: AIRequestType, input: string): string {
  const label = noteTypeLabel(aiTypeToNoteType(type));
  const preview = input.slice(0, 40).trim();
  return `${label}: ${preview}${input.length > 40 ? "..." : ""}`;
}
