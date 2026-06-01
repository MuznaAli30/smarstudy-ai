"use client";

import { useState } from "react";
import { useAI } from "@/hooks/use-ai";
import { useNotes } from "@/hooks/use-notes";
import { useToast } from "@/components/ui/toast-provider";
import { PageHeader } from "@/components/ui/page-header";
import { ChatMessage, getNoteTitle } from "@/components/ai/chat-message";
import { LoadingSpinner } from "@/components/ai/loading-spinner";
import { ChatSkeleton } from "@/components/ui/skeleton";
import type { AIRequestType } from "@/lib/types/ai";
import { aiTypeToNoteType } from "@/lib/types/note";

const aiActions: { type: AIRequestType; label: string; icon: string }[] = [
  { type: "explain", label: "Explain", icon: "💡" },
  { type: "quiz", label: "Quiz", icon: "❓" },
  { type: "plan", label: "Study Plan", icon: "📋" },
];

export function AIToolsPanel() {
  const { text, setText, result, runAI, loading, lastType, lastInput } =
    useAI();
  const { saveNote } = useNotes();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const handleRun = async (type: AIRequestType) => {
    if (!text.trim()) {
      toast("Please enter some text first", "error");
      return;
    }
    setShowResponse(false);
    await runAI(type);
    setShowResponse(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      toast("Copied to clipboard");
    } catch {
      toast("Failed to copy", "error");
    }
  };

  const handleSave = async () => {
    if (!result || !lastType) return;
    setSaving(true);
    await saveNote({
      title: getNoteTitle(lastType, lastInput || text),
      content: result,
      type: aiTypeToNoteType(lastType),
    });
    setSaving(false);
  };

  return (
    <div className="mx-auto w-full max-w-3xl animate-fade-in">
      <PageHeader
        title="AI Study Assistant"
        description="Explain topics, generate quizzes, and create study plans with AI."
      />

      <div className="glass-card card-hover mb-6 rounded-2xl p-4 sm:p-5">
        <label className="mb-2 block text-sm font-medium">
          Your study material
        </label>
        <textarea
          className="w-full min-w-0 resize-none rounded-xl border border-slate-200/60 bg-white/50 p-3 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:bg-slate-800/50 sm:p-4"
          rows={5}
          placeholder="Paste your notes, topic, or question here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
          {aiActions.map((action) => (
            <button
              key={action.type}
              onClick={() => handleRun(action.type)}
              disabled={loading}
              className="btn-primary flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium disabled:opacity-50 sm:flex-none sm:px-5"
            >
              <span>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[120px] space-y-4 overflow-hidden">
        {loading && (
          <div className="glass-card rounded-2xl p-4 sm:p-5">
            <LoadingSpinner />
            <ChatSkeleton />
          </div>
        )}

        {!loading && result && lastInput && (
          <>
            <ChatMessage role="user" content={lastInput} />
            <ChatMessage
              role="assistant"
              content={result}
              type={lastType ?? undefined}
              animate={showResponse}
              onCopy={handleCopy}
              onSave={handleSave}
              saving={saving}
            />
          </>
        )}

        {!loading && !result && (
          <div className="glass-card rounded-2xl p-6 text-center text-muted sm:p-8">
            <span className="text-4xl block mb-3">🤖</span>
            <p className="text-sm">
              Enter your material above and choose an AI action to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
