import { User } from "@prisma/client";
import { GetUserByIdRepository } from "../../repositories/postgres/user/get-user-by-id";

export class GetUserByIdUseCase {
  async execute(userId: string): Promise<User> {
    const getUserByIdRepository = new GetUserByIdRepository();

    const user = await getUserByIdRepository.execute(userId);

    return user;
  }
}
