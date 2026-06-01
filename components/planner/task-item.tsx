"use client";

import type { Task } from "@/lib/types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/40 p-3 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => onToggle(task.id, e.target.checked)}
          className="h-4 w-4 shrink-0 rounded accent-indigo-500"
        />

        <span
          className={`break-words text-sm ${task.completed ? "text-muted line-through" : ""}`}
        >
          {task.title}
        </span>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="shrink-0 rounded-lg px-2 py-1 text-xs text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
}
