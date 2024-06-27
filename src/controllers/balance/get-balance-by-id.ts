import { Request } from "express";
import { validateId } from "../helpers/validation";
import { InvalidIdError } from "../../errors/user";
import { GetBalanceByIdUseCase } from "../../use-cases/balance/get-balance-by-id";
import { ok } from "../helpers/responses";
import { ControllerResponse } from "../helpers/types";
import { handleUserErrorResponse } from "../helpers/errors/handleUserError";


export class GetBalanceByIdController {
  async execute(httpRequest: Request): Promise<ControllerResponse> {
    try {
      const { balanceId } = httpRequest.params;
      const userId = httpRequest.userId;

      const idIsValid = validateId(userId);

      if (!idIsValid) {
        throw new InvalidIdError();
      }

      const getBalanceByIdUseCase = new GetBalanceByIdUseCase();

      const balance = await getBalanceByIdUseCase.execute(userId, balanceId);

      return ok(balance);
    } catch (err) {
      return handleUserErrorResponse(err);
    }
  }
}
