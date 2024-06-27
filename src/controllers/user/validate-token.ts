import { Request } from "express";
import { AuthorizationError } from "../../errors/user";
import jwt from "jsonwebtoken";
import { handleErrorResponse } from "../helpers/errors/handleUserError";
import { ok } from "../helpers/responses";
import { ControllerResponse } from "../helpers/types";

export interface JWTPayload {
  id: string;
  first_name: string;
  email: string;
}

export class ValidateTokenController {
  execute(httpRequest: Request): ControllerResponse {
    try {
      const authorization = httpRequest.headers.authorization;

      if (!authorization) {
        throw new AuthorizationError();
      }

      const [, token] = authorization.split(" ");

      const { id, first_name, email } = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JWTPayload;

      return ok({
        validate: true,
        user: {
          id,
          first_name,
          email,
        },
      });
    } catch (err) {
      return handleErrorResponse(err);
    }
  }
}
