"use client";

import { useCallback, useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/toast-provider";
import { apiFetch } from "@/lib/api/client";
import Link from "next/link";

interface HistoryItem {
  id: string;
  type: string;
  input: string;
  output: string;
  createdAt: string;
}

const typeLabels: Record<string, string> = {
  explain: "Explain",
  quiz: "Quiz",
  plan: "Study Plan",
};

export function HistoryPanel() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);
  const { toast } = useToast();

  const fetchHistory = useCallback(async () => {
    try {
      const data = await apiFetch<HistoryItem[]>("/api/history");
      setHistory(data);
    } catch {
      toast("Failed to load history", "error");
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const deleteItem = async (id: string) => {
    setDeleting(id);
    try {
      await apiFetch(`/api/history/${id}`, { method: "DELETE" });
      setHistory((prev) => prev.filter((item) => item.id !== id));
      if (expanded === id) setExpanded(null);
      toast("History item deleted");
    } catch {
      toast("Failed to delete history item", "error");
    } finally {
      setDeleting(null);
    }
  };

  const clearAll = async () => {
    if (!confirm("Delete all AI history? This cannot be undone.")) return;

    setClearing(true);
    try {
      await apiFetch("/api/history", { method: "DELETE" });
      setHistory([]);
      setExpanded(null);
      toast("All history cleared");
    } catch {
      toast("Failed to clear history", "error");
    } finally {
      setClearing(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl animate-fade-in">
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="AI History"
          description="Browse your past AI requests and responses."
        />
        {!loading && history.length > 0 && (
          <button
            onClick={clearAll}
            disabled={clearing}
            className="btn-secondary w-full shrink-0 rounded-xl px-4 py-2 text-sm font-medium text-red-600 disabled:opacity-50 sm:w-auto"
          >
            {clearing ? "Clearing..." : "Clear All"}
          </button>
        )}
      </div>

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      )}

      {!loading && history.length === 0 && (
        <div className="glass-card rounded-2xl">
          <EmptyState
            icon="🕐"
            title="No AI history yet"
            description="Your AI requests will appear here after you use the AI Tools."
            action={
              <Link
                href="/dashboard/ai"
                className="btn-primary px-5 py-2.5 rounded-xl text-sm font-medium"
              >
                Try AI Tools
              </Link>
            }
          />
        </div>
      )}

      {!loading && history.length > 0 && (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="glass-card card-hover animate-fade-in rounded-2xl p-4 sm:p-5"
            >
              <div
                className="flex cursor-pointer flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                onClick={() =>
                  setExpanded(expanded === item.id ? null : item.id)
                }
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {typeLabels[item.type] ?? item.type}
                    </span>
                    <span className="text-xs text-muted">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="truncate text-sm">{item.input}</p>
                </div>
                <div className="flex shrink-0 items-center justify-between gap-2 sm:justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteItem(item.id);
                    }}
                    disabled={deleting === item.id}
                    className="btn-secondary text-xs px-3 py-1.5 rounded-lg text-red-600 disabled:opacity-50"
                  >
                    {deleting === item.id ? "Deleting..." : "Delete"}
                  </button>
                  <span className="text-muted text-sm">
                    {expanded === item.id ? "▲" : "▼"}
                  </span>
                </div>
              </div>

              {expanded === item.id && (
                <div className="mt-4 border-t border-slate-200/40 pt-4">
                  <p className="mb-2 text-xs font-medium text-muted">Response</p>
                  <p className="break-words text-sm whitespace-pre-wrap">
                    {item.output}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
