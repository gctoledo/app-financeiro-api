import { Request } from "express";
import { UserControllerResponse, notFound, ok } from "../helpers/http";
import { GetUserByIdUseCase } from "../../use-cases/user/get-user-by-id";
import { badRequest, serverError } from "../helpers/http";
import validator from "validator";
import { UserNotFoundError } from "../../errors/user";

export class GetUserByIdController {
  async execute(httpRequest: Request): Promise<UserControllerResponse> {
    try {
      const { userId } = httpRequest.params;

      const idIsValid = validator.isUUID(userId);

      if (!idIsValid) {
        return badRequest({ message: "The provided id is invalid" });
      }

      const getUserByIdUseCase = new GetUserByIdUseCase();

      const user = await getUserByIdUseCase.execute(userId);

      return ok(user);
    } catch (err) {
      if (err instanceof UserNotFoundError) {
        return notFound({ message: err.message });
      }

      return serverError();
    }
  }
}
