import prisma from "../../../../prisma/prisma";
import { UpdateUser } from "../../../schemas/user";
import { User } from "@prisma/client";

export class PostgresUpdateUserRepository {
  async execute(params: UpdateUser, userId: string): Promise<User> {
    const user = await prisma.user.update({
      where: { id: userId },
      data: params,
    });

    return user;
  }
}
