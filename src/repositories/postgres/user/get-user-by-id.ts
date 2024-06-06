import { User } from "@prisma/client";
import prisma from "../../../../prisma/prisma";
import { UserNotFoundError } from "../../../errors/user";

export class GetUserByIdRepository {
  async execute(userId: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
