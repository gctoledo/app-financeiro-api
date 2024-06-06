import { Request } from "express";
import {
  ControllerResponse,
  badRequest,
  notFound,
  ok,
  serverError,
} from "../helpers/http";
import { validateId } from "../helpers/validation";
import { updateUserSchema } from "../../schemas/user";
import { UpdateUserUseCase } from "../../use-cases/user/update-user";
import { EmailAlreadyInUseError, UserNotFoundError } from "../../errors/user";
import { ZodError } from "zod";

export class UpdateUserController {
  async execute(httpRequest: Request): Promise<ControllerResponse> {
    try {
      const { userId } = httpRequest.params;
      const params = httpRequest.body;

      const idIsValid = validateId(userId);

      if (!idIsValid) {
        return badRequest({ message: "Invalid user id" });
      }

      await updateUserSchema.parseAsync(params);

      const updateUserUseCase = new UpdateUserUseCase();
      const updatedUser = await updateUserUseCase.execute(params, userId);

      return ok(updatedUser);
    } catch (err) {
      console.error(err);

      if (err instanceof ZodError) {
        return badRequest({ message: err.errors[0].message });
      }

      if (err instanceof UserNotFoundError) {
        return notFound({ message: err.message });
      }

      if (err instanceof EmailAlreadyInUseError) {
        return badRequest({ message: err.message });
      }

      return serverError();
    }
  }
}
