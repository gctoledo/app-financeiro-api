import { User } from "@prisma/client";

interface ErrorMessage {
  message: string;
}
export interface UserControllerResponse {
  status: number;
  body: User | ErrorMessage;
}

export const badRequest = (
  body: User | ErrorMessage
): UserControllerResponse => {
  return {
    status: 400,
    body,
  };
};

export const ok = (body: User | ErrorMessage): UserControllerResponse => {
  return {
    status: 200,
    body,
  };
};

export const serverError = (): UserControllerResponse => {
  return {
    status: 500,
    body: { message: "Internal server error" },
  };
};

export const notFound = (body: User | ErrorMessage): UserControllerResponse => {
  return {
    status: 404,
    body,
  };
};
