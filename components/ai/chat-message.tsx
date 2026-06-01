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
        <div className="max-w-full rounded-2xl rounded-br-md px-4 py-3 text-sm leading-relaxed shadow-md gradient-bg text-white break-words sm:max-w-[85%]">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start animate-fade-in">
      <div className="max-w-full min-w-0 rounded-2xl rounded-bl-md px-4 py-3 text-sm leading-relaxed glass-card break-words sm:max-w-[85%]">
        {type && (
          <span className="mb-2 inline-block rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-500 dark:bg-indigo-950">
            {typeLabels[type]}
          </span>
        )}
        <div className="overflow-x-auto whitespace-pre-wrap break-words">
          {animate ? <TypingText text={content} /> : content}
        </div>
        {(onCopy || onSave) && (
          <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-200/50 pt-3">
            {onCopy && (
              <button
                onClick={onCopy}
                className="btn-secondary rounded-lg px-3 py-1.5 text-xs"
              >
                Copy response
              </button>
            )}
            {onSave && (
              <button
                onClick={onSave}
                disabled={saving}
                className="btn-primary rounded-lg px-3 py-1.5 text-xs disabled:opacity-50"
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
