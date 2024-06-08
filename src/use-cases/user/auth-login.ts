import { AuthenticationError } from "../../errors/user";
import { PostgresGetUserByEmailRepository } from "../../repositories/postgres/user/get-user-by-email";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthLoginResponse } from "../../types/user";

export class AuthLoginUseCase {
  async execute(email: string, password: string): Promise<AuthLoginResponse> {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();

    const user = await getUserByEmailRepository.execute(email);

    if (!user) {
      throw new AuthenticationError();
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new AuthenticationError();
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
        subject: user.id,
      }
    );

    return {
      token,
      data: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    };
  }
}
