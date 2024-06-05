import { UserWId } from "../../schemas/user";

export interface UserControllerResponse {
  status: number;
  body: UserWId | { message: string };
}