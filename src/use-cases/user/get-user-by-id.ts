import { GetUserByIdRepository } from "../../repositories/postgres/user/get-user-by-id";
import { UserWId } from "../../schemas/user";

export class GetUserByIdUseCase {
  async execute(userId: string): Promise<UserWId> {
    const getUserByIdRepository = new GetUserByIdRepository();

    const user = await getUserByIdRepository.execute(userId);

    return user;
  }
}
