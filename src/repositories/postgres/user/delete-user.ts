import prisma from "../../../../prisma/prisma";
import { ResponseUser } from "../../../schemas/user";

export class PostgresDeleteUserRepository {
  async execute(userId: string): Promise<ResponseUser> {
    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        password: false,
      },
    });

    return user;
  }
}
