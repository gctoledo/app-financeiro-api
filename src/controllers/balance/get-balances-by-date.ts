import { Request } from "express";
import { MissingParamsError } from "../../errors/balance";
import { GetBalancesByDateUseCase } from "../../use-cases/balance/get-balances-by-date";
import { ok } from "../helpers/responses";
import { handleErrorResponse } from "../helpers/errors/handleUserError";

export class GetBalancesByDateController {
  async execute(httpRequest: Request) {
    try {
      const month = httpRequest.query.month as string;

      const year = httpRequest.query.year as string;

      if (!year || !month) {
        throw new MissingParamsError("year and month");
      }

      const getBalancesByDateUseCase = new GetBalancesByDateUseCase();
      const { balances } = await getBalancesByDateUseCase.execute(
        parseInt(year, 10),
        parseInt(month, 10)
      );

      return ok({ balances });
    } catch (err) {
      return handleErrorResponse(err);
    }
  }
}
