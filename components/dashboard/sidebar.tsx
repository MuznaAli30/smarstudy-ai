"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSidebar } from "@/components/dashboard/sidebar-context";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/dashboard/ai", label: "AI Tools", icon: "🤖" },
  { href: "/dashboard/notes", label: "Notes", icon: "📝" },
  { href: "/dashboard/history", label: "History", icon: "🕐" },
  { href: "/dashboard/planner", label: "Study Planner", icon: "📚" },
] as const;

export function DashboardSidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();
  const isDesktop = useIsDesktop();

  return (
    <>
      {/* Backdrop — tablet & mobile only */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
        aria-hidden={!isOpen}
      />

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 max-w-[85vw] flex-col
          border-r border-slate-200/60 bg-[var(--sidebar)] backdrop-blur-xl
          transition-transform duration-300 ease-in-out
          lg:static lg:z-auto lg:max-w-none lg:translate-x-0 lg:shrink-0
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        aria-label="Main navigation"
        aria-hidden={!isDesktop && !isOpen}
      >
        <div className="flex items-center justify-between border-b border-slate-200/40 p-4 sm:p-6">
          <Link
            href="/dashboard"
            className="flex min-w-0 items-center gap-2"
            onClick={close}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl gradient-bg text-sm font-bold text-white shadow-md">
              S
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold tracking-tight">
                SmartStudy
              </h1>
              <p className="truncate text-xs text-muted">AI Learning Platform</p>
            </div>
          </Link>

          <button
            type="button"
            onClick={close}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200/60 text-muted transition-colors hover:bg-slate-100/80 hover:text-foreground lg:hidden"
            aria-label="Close navigation menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "gradient-bg text-white shadow-md shadow-indigo-500/20"
                    : "text-muted hover:bg-slate-100/80 hover:text-foreground dark:hover:bg-slate-800/50"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-200/40 p-4">
          <div className="glass-card rounded-xl p-3 text-xs text-muted">
            <p className="mb-1 font-medium text-foreground">Pro Tip</p>
            <p>Save AI responses to Notes and export them as PDF.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
