import type { PrismaClient } from "@prisma/client";

export class TagService {
  static getAllTags(prisma: PrismaClient) {
    return prisma.communityTag.findMany({
        
    })
  }
}
