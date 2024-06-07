import prisma from "../../../../prisma/prisma";
import { UpdateUser, ResponseUser } from "../../../schemas";

export class PostgresUpdateUserRepository {
  async execute(params: UpdateUser, userId: string): Promise<ResponseUser> {
    const user = await prisma.user.update({
      where: { id: userId },
      data: params,
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
