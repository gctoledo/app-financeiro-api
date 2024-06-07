import { PostgresDeleteUserRepository } from "../../repositories/postgres/user/delete-user";
import { ResponseUser } from "../../schemas/user";

export class DeleteUserUseCase {
  async execute(userId: string): Promise<ResponseUser> {
    const deleteUserRepository = new PostgresDeleteUserRepository();

    const user = await deleteUserRepository.execute(userId);

    return user;
  }
}
