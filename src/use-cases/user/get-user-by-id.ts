import { User as PrismaUser } from "@prisma/client";
import { PostgresGetUserByIdRepository } from "../../repositories/postgres/user/get-user-by-id";
import { UserNotFoundError } from "../../errors/user";
import { ResponseUser } from "../../schemas";

export class GetUserByIdUseCase {
  async execute(userId: string): Promise<ResponseUser> {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const user = await getUserByIdRepository.execute(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
