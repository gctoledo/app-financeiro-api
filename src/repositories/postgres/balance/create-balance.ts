import prisma from "../../../../prisma/prisma";
import { ResponseBalance } from "../../../schemas";

export class PostgresCreateBalanceRepository {
  async execute(params: ResponseBalance): Promise<ResponseBalance> {
    const balance = await prisma.balance.create({
      data: params,
    });

    return balance;
  }
}
