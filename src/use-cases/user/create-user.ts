import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { RequestUser, ResponseUser } from "../../schemas/user";
import { PostgresGetUserByEmailRepository } from "../../repositories/postgres/user/get-user-by-email";
import { PostgresCreateUserRepository } from "../../repositories/postgres/user/create-user";
import { EmailAlreadyInUseError } from "../../errors/user";

export class CreateUserUseCase {
  async execute(params: RequestUser): Promise<ResponseUser> {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const emailAlreadyExists = await getUserByEmailRepository.execute(
      params.email
    );
    if (emailAlreadyExists) {
      throw new EmailAlreadyInUseError(params.email);
    }

    const userId = uuidv4();

    const hashedPassword = await bcrypt.hash(params.password, 10);

    const user = {
      ...params,
      id: userId,
      password: hashedPassword,
    };

    const postgresCreateUserRepository = new PostgresCreateUserRepository();
    const createdUser = await postgresCreateUserRepository.execute(user);

    return createdUser;
  }
}
