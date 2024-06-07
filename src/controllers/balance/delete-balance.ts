import { Request } from "express";
import {
  ControllerResponse,
  badRequest,
  notFound,
  ok,
  serverError,
} from "../helpers/http";
import { DeleteBalanceUseCase } from "../../use-cases/balance/delete-balance";
import { validateId } from "../helpers/validation";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class DeleteBalanceController {
  async execute(httpRequest: Request): Promise<ControllerResponse> {
    try {
      const { balanceId } = httpRequest.params;

      const idIsValid = validateId(balanceId);

      if (!idIsValid) {
        return badRequest({ message: "The provided id is not valid" });
      }

      const deleteBalanceUseCase = new DeleteBalanceUseCase();
      const balance = await deleteBalanceUseCase.execute(balanceId);

      return ok(balance);
    } catch (err) {
      console.error(err);

      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
          return notFound({ message: "Balance does not exist" });
        }
      }

      return serverError();
    }
  }
}
