"use client";

import Link from "next/link";
import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/ui/page-header";
import { useStats } from "@/hooks/use-stats";

function formatLastActivity(date: string | null) {
  if (!date) return "—";
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return d.toLocaleDateString();
}

const quickActions = [
  { href: "/dashboard/ai", label: "Ask AI", icon: "🤖", desc: "Explain, quiz, or plan" },
  { href: "/dashboard/notes", label: "View Notes", icon: "📝", desc: "Saved study content" },
  { href: "/dashboard/planner", label: "Add Task", icon: "✅", desc: "Track your progress" },
  { href: "/dashboard/history", label: "History", icon: "🕐", desc: "Past AI requests" },
];

export function DashboardContent() {
  const { stats, loading } = useStats();

  return (
    <div className="mx-auto w-full max-w-5xl animate-fade-in">
      <PageHeader
        title="Welcome back 👋"
        description="Your AI-powered study workspace at a glance."
      />

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 sm:mb-10">
        <StatCard
          title="Total Notes"
          value={stats?.totalNotes ?? 0}
          description="Saved AI outputs"
          icon="📝"
          href="/dashboard/notes"
          loading={loading}
        />
        <StatCard
          title="AI Requests"
          value={stats?.aiRequestsCount ?? 0}
          description="Total AI interactions"
          icon="🤖"
          href="/dashboard/history"
          loading={loading}
        />
        <StatCard
          title="Study Tasks"
          value={stats?.totalTasks ?? 0}
          description="In your planner"
          icon="📚"
          href="/dashboard/planner"
          loading={loading}
        />
        <StatCard
          title="Last Activity"
          value={formatLastActivity(stats?.lastActivity ?? null)}
          description="Most recent action"
          icon="⚡"
          loading={loading}
        />
      </div>

      <h2 className="mb-4 text-lg font-semibold sm:text-xl">Quick Actions</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="glass-card rounded-2xl p-5 card-hover block"
          >
            <span className="text-2xl block mb-3">{action.icon}</span>
            <h3 className="font-semibold text-sm mb-1">{action.label}</h3>
            <p className="text-xs text-muted">{action.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
