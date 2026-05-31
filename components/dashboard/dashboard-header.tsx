"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/ai": "AI Tools",
  "/dashboard/notes": "Notes",
  "/dashboard/history": "History",
  "/dashboard/planner": "Study Planner",
};

export function DashboardHeader() {
  const pathname = usePathname();
  const title =
    Object.entries(pageTitles).find(([path]) =>
      path === "/dashboard"
        ? pathname === "/dashboard"
        : pathname.startsWith(path)
    )?.[1] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 border-b border-slate-200/40 bg-[var(--background)]/80 backdrop-blur-xl">
      <h2 className="text-lg font-semibold">{title}</h2>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">
          U
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium leading-none">Student</p>
          <p className="text-xs text-muted mt-0.5">Free Plan</p>
        </div>
      </div>
    </header>
  );
}
