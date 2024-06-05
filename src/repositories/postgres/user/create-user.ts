import prisma from "../../../../prisma/prisma";
import { UserWId } from "../../../schemas/user";

export class PostgresCreateUserRepository {
  async execute(params: UserWId): Promise<UserWId> {
    const user = await prisma.user.create({
      data: {
        email: params.email,
        first_name: params.first_name,
        last_name: params.last_name,
        password: params.password,
        id: params.id,
      },
    });

    return user;
  }
}
