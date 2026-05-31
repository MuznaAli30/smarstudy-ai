import { prisma } from "@/lib/prisma";

export const aiRequestService = {
  create(data: { type: string; input: string; output: string }) {
    return prisma.aIRequest.create({ data });
  },

  findAll() {
    return prisma.aIRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  count() {
    return prisma.aIRequest.count();
  },

  getLastActivity() {
    return prisma.aIRequest.findFirst({
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    });
  },

  delete(id: string) {
    return prisma.aIRequest.delete({ where: { id } });
  },

  deleteAll() {
    return prisma.aIRequest.deleteMany();
  },
};
