import { Request } from "express";
import { validateId } from "../helpers/validation";
import { InvalidIdError } from "../../errors/user";
import { GetBalancesByUserIdUseCase } from "../../use-cases/balance/get-balances-by-user-id";
import { handleErrorResponse } from "../helpers/errors/handleUserError";
import { ControllerResponse } from "../helpers/types";
import { ok } from "../helpers/responses";

export class GetBalancesByUserIdController {
  async execute(httpRequest: Request): Promise<ControllerResponse> {
    try {
      const userId = httpRequest.userId;

      const page = httpRequest.query.page as string;
      const pageSize = httpRequest.query.pageSize as string;

      const idIsValid = validateId(userId);

      if (!idIsValid) {
        throw new InvalidIdError();
      }

      const getBalancesByUserIdUseCase = new GetBalancesByUserIdUseCase();

      const balances = await getBalancesByUserIdUseCase.execute(
        userId,
        pageSize,
        page
      );

      return ok(balances);
    } catch (err) {
      return handleErrorResponse(err);
    }
  }
}
