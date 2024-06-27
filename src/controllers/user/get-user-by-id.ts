import { Request } from "express";
import { ok } from "../helpers/responses";
import { GetUserByIdUseCase } from "../../use-cases/user/get-user-by-id";
import { validateId } from "../helpers/validation";
import { handleErrorResponse } from "../helpers/errors/handleUserError";
import { InvalidIdError } from "../../errors/user";
import { ControllerResponse } from "../helpers/types";

export class GetUserByIdController {
  async execute(httpRequest: Request): Promise<ControllerResponse> {
    try {
      const userId = httpRequest.userId;

      const idIsValid = validateId(userId);

      if (!idIsValid) {
        throw new InvalidIdError();
      }

      const getUserByIdUseCase = new GetUserByIdUseCase();

      const user = await getUserByIdUseCase.execute(userId);

      return ok(user);
    } catch (err) {
      console.error(err);

      return handleErrorResponse(err);
    }
  }
}
