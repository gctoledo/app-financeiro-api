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

export const handleUserErrorResponse = (err: any): ControllerResponse => {
  console.error(err);

  if (err instanceof ZodError) {
    return badRequest({ message: err.errors[0].message });
  }

  if (err instanceof AuthenticationError || err instanceof AuthorizationError) {
    return unauthorized({ message: err.message });
  }

  if (err instanceof EmailAlreadyInUseError) {
    return badRequest({ message: "Email already exists" });
  }

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return notFound({ message: String(err.meta?.cause) });
    }
  }

  if (err instanceof UserNotFoundError) {
    return notFound({ message: err.message });
  }

  if (err instanceof InvalidIdError) {
    return badRequest({ message: err.message });
  }

  if (err instanceof jwt.JsonWebTokenError) {
    return unauthorized({ message: err.message });
  }

  return serverError();
};
