import { Request } from "express";
import { createUserSchema } from "../../schemas/user";
import { CreateUserUseCase } from "../../use-cases/user/create-user";
import { ControllerResponse, ok } from "../helpers/http";
import { generateUserErrorResponse } from "../helpers/errors/user";

export class CreateUserController {
  async execute(httpRequest: Request): Promise<ControllerResponse> {
    try {
      const params = httpRequest.body;

      await createUserSchema.parseAsync(params);

      const createUserUseCase = new CreateUserUseCase();

      const createdUser = await createUserUseCase.execute(params);

      return ok(createdUser);
    } catch (err) {
      console.error(err);

      return generateUserErrorResponse(err);
    }
  }
}
