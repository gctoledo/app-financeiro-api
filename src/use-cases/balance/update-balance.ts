import { ResponseBalance, UpdateBalance } from "../../schemas/balance";
import { PostgresGetBalanceByIdRepository } from "../../repositories/postgres/balance/get-balance-by-id";
import { BalanceNotFoundError } from "../../errors/balance";
import { PostgresUpdateBalanceRepository } from "../../repositories/postgres/balance/update-balance";

export class UpdateBalanceUseCase {
  async execute(
    params: UpdateBalance,
    balanceId: string
  ): Promise<ResponseBalance> {
    const getBalanceByIdRepository = new PostgresGetBalanceByIdRepository();

    const balance = await getBalanceByIdRepository.execute(balanceId);

    if (!balance) {
      throw new BalanceNotFoundError();
    }

    const updateBalanceRepository = new PostgresUpdateBalanceRepository();

    const updatedBalance = await updateBalanceRepository.execute(
      params,
      balanceId
    );

    return updatedBalance;
  }
}
