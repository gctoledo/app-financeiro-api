import { Request } from "express";
import { badRequest, ok, serverError } from "../helpers/responses";
import { CreateBalanceUseCase } from "../../use-cases/balance/create-balance";
import { RequestBalance, createBalanceSchema } from "../../schemas/balance";
import { ZodError } from "zod";
import { UserNotFoundError } from "../../errors/user";
import { ControllerResponse } from "../helpers/types";

export class CreateBalanceController {
  async execute(httpRequest: Request): Promise<ControllerResponse> {
    try {
      const params = httpRequest.body;

      const userId = httpRequest.userId;

      const balance: RequestBalance = {
        ...params,
        cash_amount: Number(params.cash_amount),
        credit_amount: Number(params.credit_amount),
        debit_amount: Number(params.debit_amount),
        expense_amount: Number(params.expense_amount),
        user_id: userId,
      };

      await createBalanceSchema.parseAsync(balance);

      const createBalanceUseCase = new CreateBalanceUseCase();
      const createdBalance = await createBalanceUseCase.execute(balance);

      return ok(createdBalance);
    } catch (err) {
      console.error(err);

      if (err instanceof ZodError) {
        return badRequest({ message: err.errors[0].message });
      }

      if (err instanceof UserNotFoundError) {
        return badRequest({ message: err.message });
      }

      return serverError();
    }
  }
}
