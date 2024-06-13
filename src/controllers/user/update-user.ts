import { Request } from "express";
import { ControllerResponse, ok } from "../helpers/responses";
import { validateId } from "../helpers/validation";
import { updateUserSchema } from "../../schemas/user";
import { UpdateUserUseCase } from "../../use-cases/user/update-user";
import { InvalidIdError } from "../../errors/user";
import { handleUserErrorResponse } from "../helpers/errors/handleUserError";

export class UpdateUserController {
  async execute(httpRequest: Request): Promise<ControllerResponse> {
    try {
      const userId = httpRequest.userId;
      const params = httpRequest.body;

      const idIsValid = validateId(userId);

      if (!idIsValid) {
        throw new InvalidIdError();
      }

      await updateUserSchema.parseAsync(params);

      const updateUserUseCase = new UpdateUserUseCase();
      const updatedUser = await updateUserUseCase.execute(params, userId);

      return ok(updatedUser);
    } catch (err) {
      console.error(err);

      return handleUserErrorResponse(err);
    }
  }
}
