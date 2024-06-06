import { User } from "@prisma/client";
import { PostgresDeleteUserRepository } from "../../repositories/postgres/user/delete-user";

export class DeleteUserUseCase {
  async execute(userId: string): Promise<User> {
    const deleteUserRepository = new PostgresDeleteUserRepository();

    const user = deleteUserRepository.execute(userId);

    return user;
  }
}