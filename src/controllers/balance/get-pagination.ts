import { Request } from "express";
import { InvalidIdError } from "../../errors/user";
import { handleErrorResponse } from "../helpers/errors/handleUserError";
import { ok } from "../helpers/responses";
import { ControllerResponse } from "../helpers/types";
import { validateId } from "../helpers/validation";
import { GetPaginationUseCase } from "../../use-cases/balance/get-pagination";
import { MissingParamsError } from "../../errors/balance";

export class GetPaginationController {
  async execute(httpRequest: Request): Promise<ControllerResponse> {
    try {
      const userId = httpRequest.userId;

      const page = httpRequest.query.page;
      const pageSize = httpRequest.query.pageSize;

      if (page === undefined || pageSize === undefined) {
        throw new MissingParamsError('"page" and "pageSize" are required');
      }

      const idIsValid = validateId(userId);

      if (!idIsValid) {
        throw new InvalidIdError();
      }

      const getPaginationUseCase = new GetPaginationUseCase();

      const { balances, metadata } = await getPaginationUseCase.execute(
        userId,
        pageSize as string,
        page as string
      );

      return ok({
        balances,
        metadata,
      });
    } catch (err) {
      return handleErrorResponse(err);
    }
  }
}
