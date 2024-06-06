import prisma from "../../../../prisma/prisma";
import { Balance } from "@prisma/client";

export class PostgresCreateBalanceRepository {
  async execute(params: Balance): Promise<Balance> {
    const balance = await prisma.balance.create({
      data: params,
    });

    return balance;
  }
}
