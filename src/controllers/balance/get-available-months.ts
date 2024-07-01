import { Request } from "express";
import { validateId } from "../helpers/validation";
import { InvalidIdError } from "../../errors/user";
import { GetAvailableMonthsUseCase } from "../../use-cases/balance/get-available-months";
import { ok } from "../helpers/responses";
import { handleErrorResponse } from "../helpers/errors/handleUserError";
import { ControllerResponse } from "../helpers/types";

export class GetAvailableMonthsController {
  async execute(httpRequest: Request): Promise<ControllerResponse> {
    try {
      const userId = httpRequest.userId;

      const idIsValid = validateId(userId);

      if (!idIsValid) {
        throw new InvalidIdError();
      }

      const getAvailableMonthsUseCase = new GetAvailableMonthsUseCase();
      const availableMonths = await getAvailableMonthsUseCase.execute(userId);

      return ok(availableMonths);
    } catch (err) {
      return handleErrorResponse(err);
    }
  }
}
