"use client";

import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/dashboard/sidebar-context";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/ai": "AI Tools",
  "/dashboard/notes": "Notes",
  "/dashboard/history": "History",
  "/dashboard/planner": "Study Planner",
};

export function DashboardHeader() {
  const pathname = usePathname();
  const { open } = useSidebar();

  const title =
    Object.entries(pageTitles).find(([path]) =>
      path === "/dashboard"
        ? pathname === "/dashboard"
        : pathname.startsWith(path)
    )?.[1] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-200/40 bg-[var(--background)]/80 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4 lg:px-8">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={open}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/60 text-foreground transition-colors hover:bg-slate-100/80 lg:hidden"
          aria-label="Open navigation menu"
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
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
          </svg>
        </button>

        <h2 className="truncate text-base font-semibold sm:text-lg">{title}</h2>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-bg text-xs font-bold text-white">
          U
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium leading-none">Student</p>
          <p className="mt-0.5 text-xs text-muted">Free Plan</p>
        </div>
      </div>
    </header>
  );
}
