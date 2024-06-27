import { Request } from "express";
import { AuthLoginUseCase } from "../../use-cases/user/auth-login";
import { authLoginSchema } from "../../schemas";
import { ok } from "../helpers/responses";
import { handleErrorResponse } from "../helpers/errors/handleUserError";
import { ControllerResponse } from "../helpers/types";

export class AuthLoginController {
  async execute(httpRequest: Request): Promise<ControllerResponse> {
    try {
      const { email, password } = await authLoginSchema.parseAsync(
        httpRequest.body
      );

      const authLoginUseCase = new AuthLoginUseCase();

      const login = await authLoginUseCase.execute(email, password);

      return ok(login);
    } catch (err) {
      console.error(err);

      return handleErrorResponse(err);
    }
  }
}
