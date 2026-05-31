"use client";

import Link from "next/link";
import { useNotes } from "@/hooks/use-notes";
import { useToast } from "@/components/ui/toast-provider";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { noteTypeLabel } from "@/lib/types/note";
import { exportNotesToPDF } from "@/lib/pdf/export-notes";

const typeColors: Record<string, string> = {
  explanation: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  quiz: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  plan: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
};

export function NotesPanel() {
  const { notes, loading, deleteNote } = useNotes();
  const { toast } = useToast();

  const handleExport = async () => {
    if (notes.length === 0) {
      toast("No notes to export", "error");
      return;
    }
    try {
      await exportNotesToPDF(notes);
      toast("PDF downloaded successfully");
    } catch {
      toast("Failed to export PDF", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-start justify-between mb-8">
        <PageHeader
          title="My Notes"
          description="Saved AI explanations, quizzes, and study plans."
        />
        <button
          onClick={handleExport}
          disabled={notes.length === 0}
          className="btn-primary px-5 py-2.5 rounded-xl text-sm font-medium disabled:opacity-50 shrink-0 mt-1"
        >
          Export All to PDF
        </button>
      </div>

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
      )}

      {!loading && notes.length === 0 && (
        <div className="glass-card rounded-2xl">
          <EmptyState
            icon="📝"
            title="No notes yet"
            description="Use AI Tools to generate content, then save responses to your notes."
            action={
              <Link
                href="/dashboard/ai"
                className="btn-primary px-5 py-2.5 rounded-xl text-sm font-medium"
              >
                Go to AI Tools
              </Link>
            }
          />
        </div>
      )}

      {!loading && notes.length > 0 && (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="glass-card rounded-2xl p-5 card-hover animate-fade-in"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-semibold text-base">{note.title}</h3>
                  <p className="text-xs text-muted mt-1">
                    {new Date(note.createdAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${typeColors[note.type] ?? ""}`}
                >
                  {noteTypeLabel(note.type)}
                </span>
              </div>
              <p className="text-sm text-muted whitespace-pre-wrap line-clamp-4">
                {note.content}
              </p>
              <div className="flex gap-2 mt-4 pt-3 border-t border-slate-200/40">
                <button
                  onClick={() => deleteNote(note.id)}
                  className="btn-secondary text-xs px-3 py-1.5 rounded-lg text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
