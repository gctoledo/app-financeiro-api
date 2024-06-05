import prisma from "../../../../prisma/prisma";
import { UserWId } from "../../../schemas/user";

export class PostgresGetUserByEmailRepository {
  async execute(email: string): Promise<UserWId | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
