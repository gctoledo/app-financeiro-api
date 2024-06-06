import { User } from "@prisma/client";
import prisma from "../../../../prisma/prisma";

export class PostgresDeleteUserRepository {
  async execute(userId: string): Promise<User> {
    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return user;
  }
}
