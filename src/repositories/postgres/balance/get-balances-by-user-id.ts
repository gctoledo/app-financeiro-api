import prisma from "../../../../prisma/prisma";
import { ResponseBalance } from "../../../schemas";

export class PostgresGetBalancesByUserIdRepository {
  async execute(userId: string): Promise<ResponseBalance[]> {
    const balances = await prisma.balance.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return balances;
  }
}
