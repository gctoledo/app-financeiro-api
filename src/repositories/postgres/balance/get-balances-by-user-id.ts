import prisma from "../../../../prisma/prisma";
import { ResponseBalances } from "../../../schemas";

export class PostgresGetBalancesByUserIdRepository {
  async execute(
    userId: string,
    pageSize?: string,
    page?: string
  ): Promise<ResponseBalances> {
    const skip =
      page && pageSize ? (Number(page) - 1) * Number(pageSize) : undefined;
    const take = Number(pageSize);

    const balancesCounter = await prisma.balance.count();

    const totalPages = Math.ceil(balancesCounter / Number(pageSize));

    const balances = await prisma.balance.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: skip ? skip : 0,
      take: take ? take : undefined,
    });

    return {
      balances,
      metadata: {
        page: Number(page) || 1,
        total_balances: balancesCounter,
        total_pages: totalPages,
      },
    };
  }
}
