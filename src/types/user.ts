import { ResponseUser } from "../schemas";

export interface AuthLoginResponse {
  token: string;
  data: ResponseUser;
}
