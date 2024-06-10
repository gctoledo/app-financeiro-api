import { Request } from "express";
import { ControllerResponse, ok } from "../helpers/responses";
import { validateId } from "../helpers/validation";
import { InvalidIdError } from "../../errors/user";
import { GetBalancesByUserIdUseCase } from "../../use-cases/balance/get-balances-by-user-id";
import { handleUserErrorResponse } from "../helpers/errors/handleUserError";

export class GetBalancesByUserIdController {
  async execute(httpRequest: Request): Promise<ControllerResponse> {
    try {
      const userId = httpRequest.params.userId;

      const idIsValid = validateId(userId);

      if (!idIsValid) {
        throw new InvalidIdError();
      }

      const getBalancesByUserIdUseCase = new GetBalancesByUserIdUseCase();

      const balances = await getBalancesByUserIdUseCase.execute(userId);

      return ok(balances);
    } catch (err) {
      return handleUserErrorResponse(err);
    }
  }
}
