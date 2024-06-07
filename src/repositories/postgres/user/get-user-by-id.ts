import { User as PrismaUser } from "@prisma/client";
import prisma from "../../../../prisma/prisma";

export class PostgresGetUserByIdRepository {
  async execute(userId: string): Promise<PrismaUser | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }
}
