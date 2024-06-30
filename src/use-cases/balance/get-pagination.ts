import { UserNotFoundError } from "../../errors/user";
import { PostgresGetBalancesByUserIdRepository } from "../../repositories/postgres/balance/get-balances-by-user-id";
import { PostgresGetUserByIdRepository } from "../../repositories/postgres/user/get-user-by-id";
import { ResponseBalances } from "../../schemas";

export class GetPaginationUseCase {
  async execute(
    userId: string,
    pageSize: string,
    page: string
  ): Promise<ResponseBalances> {
    const getUserByUserIdRepository = new PostgresGetUserByIdRepository();

    const user = await getUserByUserIdRepository.execute(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const getBalancesByUserIdRepository =
      new PostgresGetBalancesByUserIdRepository();

    const { balances, metadata } = await getBalancesByUserIdRepository.execute(
      userId,
      pageSize,
      page
    );

    return {
      balances,
      metadata,
    };
  }
}
