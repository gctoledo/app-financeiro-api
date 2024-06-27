import prisma from "../../../../prisma/prisma";
import { ResponseBalance } from "../../../schemas";

export class PostgresGetBalancesByUserIdRepository {
  async execute(
    userId: string,
    pageSize?: string,
    page?: string
  ): Promise<ResponseBalance[]> {
    const skip =
      page && pageSize ? (Number(page) - 1) * Number(pageSize) : undefined;
    const take = Number(pageSize);

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

    return balances;
  }
}
