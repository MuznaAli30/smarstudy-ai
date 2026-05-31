"use client";

import type { Task } from "@/lib/types/task";
import { TaskItem } from "@/components/planner/task-item";
import { EmptyState } from "@/components/ui/empty-state";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  return (
    <div className="glass-card rounded-2xl p-6 card-hover">
      <h2 className="font-semibold mb-4">Your Tasks</h2>

      {tasks.length === 0 ? (
        <EmptyState
          icon="✅"
          title="No tasks yet"
          description="Add your first study task above to get started."
        />
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
