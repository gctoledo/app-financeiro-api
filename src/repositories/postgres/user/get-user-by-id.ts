import { User as PrismaUser } from "@prisma/client";
import prisma from "../../../../prisma/prisma";
import { ResponseUser } from "../../../schemas";

export class PostgresGetUserByIdRepository {
  async execute(userId: string): Promise<ResponseUser | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
      },
    });

    return user;
  }
}
