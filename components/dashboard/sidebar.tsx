"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/dashboard/ai", label: "AI Tools", icon: "🤖" },
  { href: "/dashboard/notes", label: "Notes", icon: "📝" },
  { href: "/dashboard/history", label: "History", icon: "🕐" },
  { href: "/dashboard/planner", label: "Study Planner", icon: "📚" },
] as const;

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex flex-col border-r border-slate-200/60 bg-[var(--sidebar)] backdrop-blur-xl">
      <div className="p-6 border-b border-slate-200/40">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white text-sm font-bold shadow-md">
            S
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">SmartStudy</h1>
            <p className="text-xs text-muted">AI Learning Platform</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "gradient-bg text-white shadow-md shadow-indigo-500/20"
                  : "text-muted hover:bg-slate-100/80 dark:hover:bg-slate-800/50 hover:text-foreground"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200/40">
        <div className="glass-card rounded-xl p-3 text-xs text-muted">
          <p className="font-medium text-foreground mb-1">Pro Tip</p>
          <p>Save AI responses to Notes and export them as PDF.</p>
        </div>
      </div>
    </aside>
  );
}
