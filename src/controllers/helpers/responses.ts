import { ControllerResponse, BodyResponse, ErrorMessage } from "./types";

export const badRequest = (body: BodyResponse): ControllerResponse => {
  return {
    status: 400,
    body,
  };
};

export const unauthorized = (body: BodyResponse): ControllerResponse => {
  return {
    status: 401,
    body,
  };
};

export const ok = (body: BodyResponse): ControllerResponse => {
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
