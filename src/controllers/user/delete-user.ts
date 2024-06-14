import { Request } from "express";
import { validateId } from "../helpers/validation";
import { ok } from "../helpers/responses";
import { DeleteUserUseCase } from "../../use-cases/user/delete-user";
import { handleUserErrorResponse } from "../helpers/errors/handleUserError";
import { InvalidIdError } from "../../errors/user";
import { ControllerResponse } from "../helpers/types";

export class DeleteUserController {
  async execute(httpRequest: Request): Promise<ControllerResponse> {
    try {
      const userId = httpRequest.userId;

      const idIsValid = validateId(userId);

      if (!idIsValid) {
        throw new InvalidIdError();
      }

      const deleteUserUseCase = new DeleteUserUseCase();
      const user = await deleteUserUseCase.execute(userId);

      return ok(user);
    } catch (err) {
      console.error(err);

      return handleUserErrorResponse(err);
    }
  }
}
