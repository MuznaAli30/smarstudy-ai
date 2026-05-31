import { prisma } from "@/lib/prisma";

export const taskService = {
  findAll() {
    return prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  create(title: string) {
    return prisma.task.create({
      data: { title },
    });
  },

  updateCompleted(id: string, completed: boolean) {
    return prisma.task.update({
      where: { id },
      data: { completed },
    });
  },

  delete(id: string) {
    return prisma.task.delete({
      where: { id },
    });
  },
};
