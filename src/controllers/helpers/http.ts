import { Balance } from "@prisma/client";
import { ResponseUser } from "../../schemas/user";

interface ErrorMessage {
  message: string;
}
export interface ControllerResponse {
  status: number;
  body: ResponseUser | Balance | ErrorMessage;
}

export const badRequest = (
  body: ResponseUser | ErrorMessage
): ControllerResponse => {
  return {
    status: 400,
    body,
  };
};

export const ok = (
  body: ResponseUser | ErrorMessage | Balance
): ControllerResponse => {
  return {
    status: 200,
    body,
  };
};

export const serverError = (): ControllerResponse => {
  return {
    status: 500,
    body: { message: "Internal server error" },
  };
};

export const notFound = (body: ErrorMessage): ControllerResponse => {
  return {
    status: 404,
    body,
  };
};
