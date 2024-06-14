import { Request } from "express";
import { validateId } from "../helpers/validation";
import { badRequest, notFound, ok, serverError } from "../helpers/responses";
import { UpdateBalance, updateBalanceSchema } from "../../schemas";
import { UpdateBalanceUseCase } from "../../use-cases/balance/update-balance";
import { ZodError } from "zod";
import { BalanceNotFoundError } from "../../errors/balance";
import { ControllerResponse } from "../helpers/types";

export class UpdateBalanceController {
  async execute(httpRequest: Request): Promise<ControllerResponse> {
    try {
      const params = httpRequest.body;
      const balanceId = httpRequest.params.balanceId;

      const idIsValid = validateId(balanceId);

      if (!idIsValid) {
        return badRequest({ message: "The provided id is not valid" });
      }

      const balanceParams: UpdateBalance = {
        ...params,
        cash_amount: Number(params.cash_amount),
        expense_amount: Number(params.expense_amount),
        credit_amount: Number(params.credit_amount),
        debit_amount: Number(params.debit_amount),
      };

      await updateBalanceSchema.parseAsync(balanceParams);

      const updateBalanceUseCase = new UpdateBalanceUseCase();

      const updatedBalance = await updateBalanceUseCase.execute(
        balanceParams,
        balanceId
      );

      return ok(updatedBalance);
    } catch (err) {
      console.error(err);

      if (err instanceof ZodError) {
        return badRequest({ message: err.errors[0].message });
      }

      if (err instanceof BalanceNotFoundError) {
        return notFound({ message: err.message });
      }

      return serverError();
    }
  }
}
