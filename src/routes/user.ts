import { Router, Request, Response } from "express";
import { GetUserByIdController } from "../controllers/user/get-user-by-id";
import { CreateUserController } from "../controllers/user/create-user";
import { DeleteUserController } from "../controllers/user/delete-user";
import { UpdateUserController } from "../controllers/user/update-user";

const userRouter = Router();

userRouter.get("/users/:userId", async (req: Request, res: Response) => {
  const getUserByIdController = new GetUserByIdController();

  const response = await getUserByIdController.execute(req);

  res.status(response.status).send(response.body);
});

userRouter.post("/users", async (req: Request, res: Response) => {
  const createUserController = new CreateUserController();

  const response = await createUserController.execute(req);

  res.status(response.status).send(response.body);
});

userRouter.patch("/users/:userId", async (req: Request, res: Response) => {
  const updateUserController = new UpdateUserController();

  const response = await updateUserController.execute(req);

  res.status(response.status).send(response.body);
});

userRouter.delete("/users/:userId", async (req: Request, res: Response) => {
  const deleteUserController = new DeleteUserController();

  const response = await deleteUserController.execute(req);

  res.status(response.status).send(response.body);
});

export default userRouter;
