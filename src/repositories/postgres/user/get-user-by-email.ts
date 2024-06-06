import { User } from "@prisma/client";
import prisma from "../../../../prisma/prisma";

export class PostgresGetUserByEmailRepository {
  async execute(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
