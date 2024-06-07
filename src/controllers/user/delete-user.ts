import { Request } from "express";
import { validateId } from "../helpers/validation";
import {
  ControllerResponse,
  badRequest,
  notFound,
  ok,
  serverError,
} from "../helpers/http";
import { DeleteUserUseCase } from "../../use-cases/user/delete-user";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class DeleteUserController {
  async execute(httpRequest: Request): Promise<ControllerResponse> {
    try {
      const { userId } = httpRequest.params;

      const idIsValid = validateId(userId);

      if (!idIsValid) {
        return badRequest({ message: "The provided id is invalid" });
      }

      const deleteUserUseCase = new DeleteUserUseCase();
      const user = await deleteUserUseCase.execute(userId);

      return ok(user);
    } catch (err) {
      console.error(err);

      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
          return notFound({ message: "User does not exist" });
        }
      }

      return serverError();
    }
  }
}
