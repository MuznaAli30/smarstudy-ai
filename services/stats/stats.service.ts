import { noteService } from "@/services/notes/note.service";
import { aiRequestService } from "@/services/ai/ai-request.service";
import { taskService } from "@/services/tasks/task.service";
import type { DashboardStats } from "@/lib/types/stats";

export const statsService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const [totalNotes, aiRequestsCount, tasks, lastAiRequest] =
      await Promise.all([
        noteService.count(),
        aiRequestService.count(),
        taskService.findAll(),
        aiRequestService.getLastActivity(),
      ]);

    const lastNote = await noteService.findAll().then((notes) => notes[0]);
    const lastTask = tasks[0];

    const dates = [
      lastAiRequest?.createdAt,
      lastNote?.createdAt,
      lastTask?.createdAt,
    ].filter(Boolean) as Date[];

    const lastActivity =
      dates.length > 0
        ? new Date(Math.max(...dates.map((d) => d.getTime()))).toISOString()
        : null;

    return {
      totalNotes,
      aiRequestsCount,
      totalTasks: tasks.length,
      lastActivity,
    };
  },
};
