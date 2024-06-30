import prisma from "../../../../prisma/prisma";
import { ResponseBalances } from "../../../schemas";

export class PostgresGetBalancesByDateRepository {
  async execute(startDate: Date, endDate: Date): Promise<ResponseBalances> {
    const balances = await prisma.balance.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { balances };
  }
}
