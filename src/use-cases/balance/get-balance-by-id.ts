import { BalanceAuthError, BalanceNotFoundError } from "../../errors/balance";
import { PostgresGetBalanceByIdRepository } from "../../repositories/postgres/balance/get-balance-by-id";
import { PostgresGetUserByIdRepository } from "../../repositories/postgres/user/get-user-by-id";
import { ResponseBalance } from "../../schemas";

export class GetBalanceByIdUseCase {
  async execute(userId: string, balanceId: string): Promise<ResponseBalance> {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const user = await getUserByIdRepository.execute(userId);

    const getBalanceByIdRepository = new PostgresGetBalanceByIdRepository();
    const balance = await getBalanceByIdRepository.execute(balanceId);

    if (!balance) {
      throw new BalanceNotFoundError();
    }

    if (balance?.user_id !== user?.id) {
      throw new BalanceAuthError();
    }

    return balance;
  }
}
