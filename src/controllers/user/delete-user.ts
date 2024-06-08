import { Request } from "express";
import { validateId } from "../helpers/validation";
import { ControllerResponse, ok } from "../helpers/http";
import { DeleteUserUseCase } from "../../use-cases/user/delete-user";
import { generateUserErrorResponse } from "../helpers/errors/user";
import { InvalidIdError } from "../../errors/user";

export class DeleteUserController {
  async execute(httpRequest: Request): Promise<ControllerResponse> {
    try {
      const { userId } = httpRequest.params;

      const idIsValid = validateId(userId);

      if (!idIsValid) {
        throw new InvalidIdError();
      }

      const deleteUserUseCase = new DeleteUserUseCase();
      const user = await deleteUserUseCase.execute(userId);

      return ok(user);
    } catch (err) {
      console.error(err);

      return generateUserErrorResponse(err);
    }
  }
}
