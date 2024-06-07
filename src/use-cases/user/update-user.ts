import { PostgresGetUserByEmailRepository } from "../../repositories/postgres/user/get-user-by-email";
import { ResponseUser, UpdateUser } from "../../schemas";
import { EmailAlreadyInUseError, UserNotFoundError } from "../../errors/user";
import bcrypt from "bcrypt";
import { PostgresUpdateUserRepository } from "../../repositories/postgres/user/update-user";
import { PostgresGetUserByIdRepository } from "../../repositories/postgres/user/get-user-by-id";

export class UpdateUserUseCase {
  async execute(params: UpdateUser, userId: string): Promise<ResponseUser> {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const userExist = await getUserByIdRepository.execute(userId);

    if (!userExist) {
      throw new UserNotFoundError();
    }

    if (params.email) {
      const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
      const userWithProvidedEmail = await getUserByEmailRepository.execute(
        params.email
      );

      if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
        throw new EmailAlreadyInUseError(params.email);
      }
    }

    const user: UpdateUser = {
      ...params,
    };

    if (params.password) {
      const hashedPassword = await bcrypt.hash(params.password, 10);
      user.password = hashedPassword;
    }

    const updateUserRepository = new PostgresUpdateUserRepository();
    const updatedUser = await updateUserRepository.execute(user, userId);

    return updatedUser;
  }
}
