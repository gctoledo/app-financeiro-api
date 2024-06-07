import { Balance } from "@prisma/client";
import prisma from "../../../../prisma/prisma";

export class PostgresDeleteBalanceRepository {
  async execute(balanceId: string): Promise<Balance> {
    const balance = await prisma.balance.delete({
      where: {
        id: balanceId,
      },
    });

    return balance;
  }
}
