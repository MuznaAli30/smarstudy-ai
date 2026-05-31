"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
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

  useEffect(() => {
    apiFetch<HistoryItem[]>("/api/history")
      .then(setHistory)
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <PageHeader
        title="AI History"
        description="Browse your past AI requests and responses."
      />

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
              className="glass-card rounded-2xl p-5 card-hover cursor-pointer animate-fade-in"
              onClick={() =>
                setExpanded(expanded === item.id ? null : item.id)
              }
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {typeLabels[item.type] ?? item.type}
                    </span>
                    <span className="text-xs text-muted">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm truncate">{item.input}</p>
                </div>
                <span className="text-muted text-sm shrink-0">
                  {expanded === item.id ? "▲" : "▼"}
                </span>
              </div>

              {expanded === item.id && (
                <div className="mt-4 pt-4 border-t border-slate-200/40">
                  <p className="text-xs font-medium text-muted mb-2">Response</p>
                  <p className="text-sm whitespace-pre-wrap">{item.output}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
