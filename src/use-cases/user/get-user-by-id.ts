import { User } from "@prisma/client";
import { PostgresGetUserByIdRepository } from "../../repositories/postgres/user/get-user-by-id";
import { UserNotFoundError } from "../../errors/user";

export class GetUserByIdUseCase {
  async execute(userId: string): Promise<User> {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const user = await getUserByIdRepository.execute(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
