import { Balance } from "@prisma/client";
import { PostgresDeleteBalanceRepository } from "../../repositories/postgres/balance/delete-balance";

export class DeleteBalanceUseCase {
  async execute(balanceId: string): Promise<Balance> {
    const deleteBalanceRepository = new PostgresDeleteBalanceRepository();

    const balance = await deleteBalanceRepository.execute(balanceId);

    return balance;
  }
}
