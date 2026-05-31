"use client";

import { useCallback, useEffect, useState } from "react";
import type { Task } from "@/lib/types/task";
import { apiFetch } from "@/lib/api/client";
import { useToast } from "@/components/ui/toast-provider";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTasks = useCallback(async () => {
    try {
      const data = await apiFetch<Task[]>("/api/tasks");
      setTasks(data);
    } catch {
      toast("Failed to load tasks", "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (title: string) => {
    if (!title.trim()) return;

    try {
      await apiFetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      await fetchTasks();
      toast("Task added");
    } catch {
      toast("Failed to add task", "error");
    }
  };

  const toggleTask = async (id: string, completed: boolean) => {
    try {
      await apiFetch("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed }),
      });
      await fetchTasks();
    } catch {
      toast("Failed to update task", "error");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await apiFetch("/api/tasks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      await fetchTasks();
      toast("Task deleted");
    } catch {
      toast("Failed to delete task", "error");
    }
  };

  return { tasks, loading, addTask, toggleTask, deleteTask };
}
