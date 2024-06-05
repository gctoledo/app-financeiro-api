import { Request } from "express";
import { createUserSchema } from "../../schemas/user";
import { CreateUserUseCase } from "../../use-cases/user/create-user";
import { ZodError } from "zod";
import {
  UserControllerResponse,
  badRequest,
  ok,
  serverError,
} from "../helpers/http";
import { EmailAlreadyInUseError } from "../errors/user";

export class CreateUserController {
  async execute(httpRequest: Request): Promise<UserControllerResponse> {
    try {
      const params = httpRequest.body;

      await createUserSchema.parseAsync(params);

      const createUserUseCase = new CreateUserUseCase();

      const createdUser = await createUserUseCase.execute(params);

      return ok(createdUser);
    } catch (err) {
      console.error(err);
      if (err instanceof ZodError) {
        return badRequest({ message: err.errors[0].message });
      }

      if (err instanceof EmailAlreadyInUseError) {
        return badRequest({ message: "Email already exists" });
      }

      return serverError();
    }
  }
}
