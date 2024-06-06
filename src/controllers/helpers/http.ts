import { Balance, User } from "@prisma/client";

interface ErrorMessage {
  message: string;
}
export interface ControllerResponse {
  status: number;
  body: User | Balance | ErrorMessage;
}

export const badRequest = (body: User | ErrorMessage): ControllerResponse => {
  return {
    status: 400,
    body,
  };
};

export const ok = (body: User | ErrorMessage | Balance): ControllerResponse => {
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

export const notFound = (body: User | ErrorMessage): ControllerResponse => {
  return {
    status: 404,
    body,
  };
};
