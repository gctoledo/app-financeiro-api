import prisma from "../../../../prisma/prisma";
import { ResponseBalance, UpdateBalance } from "../../../schemas/balance";

export class PostgresUpdateBalanceRepository {
  async execute(
    params: UpdateBalance,
    balanceId: string
  ): Promise<ResponseBalance> {
    const balance = await prisma.balance.update({
      where: {
        id: balanceId,
      },
      data: params,
    });

    return balance;
  }
}
