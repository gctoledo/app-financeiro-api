import { UserWId } from "../../schemas/user";

interface ErrorMessage {
  message: string;
}
export interface UserControllerResponse {
  status: number;
  body: UserWId | ErrorMessage;
}

export const badRequest = (
  body: UserWId | ErrorMessage
): UserControllerResponse => {
  return {
    status: 400,
    body,
  };
};

export const ok = (body: UserWId | ErrorMessage): UserControllerResponse => {
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

export const notFound = (
  body: UserWId | ErrorMessage
): UserControllerResponse => {
  return {
    status: 404,
    body,
  };
};
