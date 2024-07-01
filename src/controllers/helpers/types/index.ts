import {
  ResponseBalance,
  ResponseBalances,
  ResponseUser,
} from "../../../schemas";

export type ErrorMessage = {
  message: string;
};

export type AuthLoginResponse = {
  token: string;
  data: ResponseUser;
};

type JWTResponse = {
  validate: boolean;
  user: {
    id: string;
    first_name: string;
    email: string;
  };
};

export interface AvailableDatesProps {
  [key: number]: {
    months: string[];
    monthsIndex: number[];
  };
}

export type MonthsAvailableResponse = {
  available_dates: AvailableDatesProps;
};

export type BodyResponse =
  | ErrorMessage
  | ResponseUser
  | ResponseBalance
  | ResponseBalances
  | AuthLoginResponse
  | JWTResponse
  | MonthsAvailableResponse;

export interface ControllerResponse {
  status: number;
  body: BodyResponse;
}
