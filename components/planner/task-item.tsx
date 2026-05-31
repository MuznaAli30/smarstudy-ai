"use client";

import type { Task } from "@/lib/types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="flex justify-between items-center border border-slate-200/40 p-3 rounded-xl transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => onToggle(task.id, e.target.checked)}
          className="w-4 h-4 rounded accent-indigo-500"
        />

        <span
          className={`text-sm ${task.completed ? "line-through text-muted" : ""}`}
        >
          {task.title}
        </span>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
      >
        Delete
      </button>
    </div>
  );
}
