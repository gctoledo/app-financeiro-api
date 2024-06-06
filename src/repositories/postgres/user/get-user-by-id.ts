import { User } from "@prisma/client";
import prisma from "../../../../prisma/prisma";

export class GetUserByIdRepository {
  async execute(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }
}
