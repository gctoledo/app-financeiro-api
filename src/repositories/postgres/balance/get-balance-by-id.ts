import { Balance } from "@prisma/client";
import prisma from "../../../../prisma/prisma";

export class PostgresGetBalanceByIdRepository {
  async execute(balanceId: string): Promise<Balance | null> {
    const balance = await prisma.balance.findUnique({
      where: {
        id: balanceId,
      },
    });

    return balance;
  }
}
