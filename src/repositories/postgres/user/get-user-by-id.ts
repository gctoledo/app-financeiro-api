import prisma from "../../../../prisma/prisma";
import { UserNotFoundError } from "../../../controllers/errors/user";
import { UserWId } from "../../../schemas/user";

export class GetUserByIdRepository {
  async execute(userId: string): Promise<UserWId> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
