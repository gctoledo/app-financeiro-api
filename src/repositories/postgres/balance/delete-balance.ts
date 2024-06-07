import prisma from "../../../../prisma/prisma";
import { ResponseBalance } from "../../../schemas";

export class PostgresDeleteBalanceRepository {
  async execute(balanceId: string): Promise<ResponseBalance> {
    const balance = await prisma.balance.delete({
      where: {
        id: balanceId,
      },
    });

    return balance;
  }
}
