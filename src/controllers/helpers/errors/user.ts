import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";
import {
  AuthenticationError,
  EmailAlreadyInUseError,
  InvalidIdError,
  UserNotFoundError,
} from "../../../errors/user";
import {
  ControllerResponse,
  badRequest,
  notFound,
  serverError,
  unauthorized,
} from "../http";

export const generateUserErrorResponse = (err: any): ControllerResponse => {
  if (err instanceof ZodError) {
    return badRequest({ message: err.errors[0].message });
  }

  if (err instanceof AuthenticationError) {
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

  return serverError();
};
