import prisma from "../../../../prisma/prisma";
import { ResponseBalance } from "../../../schemas";

export class PostgresGetBalanceByIdRepository {
  async execute(balanceId: string): Promise<ResponseBalance | null> {
    const balance = await prisma.balance.findUnique({
      where: {
        id: balanceId,
      },
    });

    return balance;
  }
}
