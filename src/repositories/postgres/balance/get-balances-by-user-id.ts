import prisma from "../../../../prisma/prisma";
import { ResponseBalances } from "../../../schemas";

export class PostgresGetBalancesByUserIdRepository {
  async execute(
    userId: string,
    pageSize?: string,
    page?: string
  ): Promise<ResponseBalances> {
    if (page && pageSize) {
      const skip =
        page && pageSize ? (Number(page) - 1) * Number(pageSize) : undefined;
      const take = pageSize ? Number(pageSize) : undefined;

      const balancesCount = await prisma.balance.count({
        where: {
          user_id: userId,
        },
      });

      const totalPages = Math.ceil(balancesCount / Number(pageSize));

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
          total_balances: balancesCount,
          total_pages: totalPages,
        },
      };
    }

    const balances = await prisma.balance.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { balances };
  }
}
