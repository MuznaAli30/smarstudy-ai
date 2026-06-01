"use client";

interface AddTaskFormProps {
  title: string;
  onTitleChange: (value: string) => void;
  onSubmit: () => void;
}

export function AddTaskForm({
  title,
  onTitleChange,
  onSubmit,
}: AddTaskFormProps) {
  return (
    <div className="glass-card card-hover mb-6 rounded-2xl p-4 sm:p-6">
      <h2 className="font-semibold mb-3">Add New Task</h2>

      <input
        className="border border-slate-200/60 rounded-xl p-3 w-full mb-3 bg-white/50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-shadow"
        placeholder="Enter your study task..."
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
      />

      <button
        onClick={onSubmit}
        className="btn-primary w-full rounded-xl px-5 py-2.5 text-sm font-medium sm:w-auto"
      >
        Add Task
      </button>
    </div>
  );
}
