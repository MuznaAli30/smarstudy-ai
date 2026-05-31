import { prisma } from "@/lib/prisma";
import type { NoteType } from "@/lib/types/note";

export const noteService = {
  findAll() {
    return prisma.note.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  create(data: { title: string; content: string; type: NoteType }) {
    return prisma.note.create({ data });
  },

  delete(id: string) {
    return prisma.note.delete({ where: { id } });
  },

  count() {
    return prisma.note.count();
  },
};
