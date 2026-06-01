"use client";

import { PageHeader } from "@/components/ui/page-header";
import { useState } from "react";
import { useTasks } from "@/hooks/use-tasks";
import { AddTaskForm } from "@/components/planner/add-task-form";
import { TaskList } from "@/components/planner/task-list";

export function StudyPlanner() {
  const [title, setTitle] = useState("");
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();

  const handleAddTask = async () => {
    if (!title) return;
    await addTask(title);
    setTitle("");
  };

  return (
    <div className="mx-auto w-full max-w-3xl animate-fade-in">
      <PageHeader
        title="Study Planner"
        description="Track your study tasks and stay organized."
      />

      <AddTaskForm
        title={title}
        onTitleChange={setTitle}
        onSubmit={handleAddTask}
      />

      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  );
}
