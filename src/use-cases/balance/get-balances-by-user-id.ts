import { UserNotFoundError } from "../../errors/user";
import { PostgresGetBalancesByUserIdRepository } from "../../repositories/postgres/balance/get-balances-by-user-id";
import { PostgresGetUserByIdRepository } from "../../repositories/postgres/user/get-user-by-id";
import { ResponseBalances } from "../../schemas";

export class GetBalancesByUserIdUseCase {
  async execute(userId: string): Promise<ResponseBalances> {
    const getUserByUserIdRepository = new PostgresGetUserByIdRepository();

    const user = await getUserByUserIdRepository.execute(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const getBalanceByUserIdRepository =
      new PostgresGetBalancesByUserIdRepository();
    const { balances } = await getBalanceByUserIdRepository.execute(userId);

    return { balances };
  }
}
