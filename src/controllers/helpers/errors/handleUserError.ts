import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  AuthenticationError,
  AuthorizationError,
  EmailAlreadyInUseError,
  InvalidIdError,
  UserNotFoundError,
} from "../../../errors/user";
import { badRequest, notFound, serverError, unauthorized } from "../responses";
import jwt from "jsonwebtoken";
import { ControllerResponse } from "../types";
import {
  BalanceAuthError,
  BalanceNotFoundError,
  MissingParamsError,
} from "../../../errors/balance";

export const handleErrorResponse = (err: any): ControllerResponse => {
  console.error(err);

  //BAD REQUESTS
  if (err instanceof ZodError) {
    return badRequest({ message: err.errors[0].message });
  }

  if (
    err instanceof MissingParamsError ||
    InvalidIdError ||
    EmailAlreadyInUseError
  ) {
    return badRequest({ message: err.message });
  }

  //UNAUTHORIZED
  if (
    err instanceof AuthenticationError ||
    AuthorizationError ||
    BalanceAuthError ||
    jwt.JsonWebTokenError
  ) {
    return unauthorized({ message: err.message });
  }

  //NOT FOUND
  if (
    err instanceof PrismaClientKnownRequestError ||
    UserNotFoundError ||
    BalanceNotFoundError
  ) {
    if (err.code === "P2025") {
      return notFound({ message: String(err.meta?.cause) });
    }
    return notFound({ message: err.message });
  }

  //SERVER ERROR
  return serverError();
};
