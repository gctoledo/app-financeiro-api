import { PostgresGetBalancesByDateRepository } from "../../repositories/postgres/balance/get-balances-by-date";
import { ResponseBalances } from "../../schemas";

export class GetBalancesByDateUseCase {
  async execute(year: number, month: number): Promise<ResponseBalances> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const getBalancesByDateRepository =
      new PostgresGetBalancesByDateRepository();
    const { balances } = await getBalancesByDateRepository.execute(
      startDate,
      endDate
    );

    return { balances };
  }
}
