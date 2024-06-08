import { Request } from "express";
import { AuthLoginUseCase } from "../../use-cases/user/auth-login";
import { authLoginSchema } from "../../schemas";
import { badRequest, ok, serverError, unauthorized } from "../helpers/http";
import { ZodError } from "zod";
import { AuthenticationError } from "../../errors/user";

export class AuthLoginController {
  async execute(httpRequest: Request) {
    try {
      const { email, password } = await authLoginSchema.parseAsync(
        httpRequest.body
      );

      const authLoginUseCase = new AuthLoginUseCase();

      const login = await authLoginUseCase.execute(email, password);

      return ok(login);
    } catch (err) {
      console.error(err);

      if (err instanceof ZodError) {
        return badRequest({ message: err.errors[0].message });
      }

      if (err instanceof AuthenticationError) {
        return unauthorized({ message: err.message });
      }

      return serverError();
    }
  }
}
