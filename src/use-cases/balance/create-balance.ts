import { RequestBalance, ResponseBalance } from "../../schemas";
import { PostgresGetUserByIdRepository } from "../../repositories/postgres/user/get-user-by-id";
import { UserNotFoundError } from "../../errors/user";
import { v4 as uuidv4 } from "uuid";
import { Decimal } from "@prisma/client/runtime/library";
import { PostgresCreateBalanceRepository } from "../../repositories/postgres/balance/create-balance";

export class CreateBalanceUseCase {
  async execute(params: RequestBalance): Promise<ResponseBalance> {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const userExist = await getUserByIdRepository.execute(params.user_id);

    if (!userExist) {
      throw new UserNotFoundError();
    }

    const balanceId = uuidv4();

    const balance: ResponseBalance = {
      ...params,
      id: balanceId,
      createdAt: new Date(params.createdAt),
      credit_amount: new Decimal(params.credit_amount),
      debit_amount: new Decimal(params.debit_amount),
      cash_amount: new Decimal(params.cash_amount),
      expense_amount: new Decimal(params.expense_amount),
    };

    const createBalanceRepository = new PostgresCreateBalanceRepository();
    const createdBalance = await createBalanceRepository.execute(balance);

    return createdBalance;
  }
}
