import { User as PrismaUser } from "@prisma/client";
import prisma from "../../../../prisma/prisma";

export class PostgresGetUserByEmailRepository {
  async execute(email: string): Promise<PrismaUser | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
