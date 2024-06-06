import { User } from "@prisma/client";
import { DeleteUserRepository } from "../../repositories/postgres/user/delete-user";

export class DeleteUserUseCase {
  async execute(userId: string): Promise<User> {
    const deleteUserRepository = new DeleteUserRepository();

    const user = deleteUserRepository.execute(userId);

    return user;
  }
}
