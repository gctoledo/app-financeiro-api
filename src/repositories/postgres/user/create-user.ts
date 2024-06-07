import { User } from "@prisma/client";
import prisma from "../../../../prisma/prisma";
import { ResponseUser } from "../../../schemas/user";

export class PostgresCreateUserRepository {
  async execute(params: User): Promise<ResponseUser> {
    const user = await prisma.user.create({
      data: {
        email: params.email,
        first_name: params.first_name,
        last_name: params.last_name,
        password: params.password,
        id: params.id,
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
