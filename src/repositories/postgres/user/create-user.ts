import { User } from "@prisma/client";
import prisma from "../../../../prisma/prisma";

export class PostgresCreateUserRepository {
  async execute(params: User): Promise<User> {
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
