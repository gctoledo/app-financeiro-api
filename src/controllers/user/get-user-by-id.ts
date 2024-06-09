import { Request } from "express";
import { ControllerResponse, notFound, ok } from "../helpers/responses";
import { GetUserByIdUseCase } from "../../use-cases/user/get-user-by-id";
import { validateId } from "../helpers/validation";
import { handleUserErrorResponse } from "../helpers/errors/handleUserError";
import { InvalidIdError } from "../../errors/user";

export class GetUserByIdController {
  async execute(httpRequest: Request): Promise<ControllerResponse> {
    try {
      const { userId } = httpRequest.params;

      const idIsValid = validateId(userId);

      if (!idIsValid) {
        throw new InvalidIdError();
      }

      const getUserByIdUseCase = new GetUserByIdUseCase();

      const user = await getUserByIdUseCase.execute(userId);

      return ok(user);
    } catch (err) {
      console.error(err);

      return handleUserErrorResponse(err);
    }
  }
}
