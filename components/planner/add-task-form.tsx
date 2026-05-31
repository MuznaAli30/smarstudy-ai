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
    <div className="glass-card rounded-2xl p-6 mb-6 card-hover">
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
        className="btn-primary px-5 py-2.5 rounded-xl text-sm font-medium"
      >
        Add Task
      </button>
    </div>
  );
}
