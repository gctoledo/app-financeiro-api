import { Router, Request, Response } from "express";
import { GetUserByIdController } from "../controllers/user/get-user-by-id";
import { CreateUserController } from "../controllers/user/create-user";
import { DeleteUserController } from "../controllers/user/delete-user";
import { UpdateUserController } from "../controllers/user/update-user";
import { AuthLoginController } from "../controllers/user/auth-login";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { ValidateTokenController } from "../controllers/user/validate-token";

const userRouter = Router();

//GET-USER-BY-ID ROUTE
userRouter.get(
  "/user",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const getUserByIdController = new GetUserByIdController();

    const response = await getUserByIdController.execute(req);

    res.status(response.status).send(response.body);
  }
);

//VALIDATE TOKEN ROUTE
userRouter.get("/user/validate", async (req: Request, res: Response) => {
  const validateTokenController = new ValidateTokenController();

  const response = validateTokenController.execute(req);

  res.status(response.status).send(response.body);
});

//CREATE-USER ROUTE
userRouter.post("/user", async (req: Request, res: Response) => {
  const createUserController = new CreateUserController();

  const response = await createUserController.execute(req);

  res.status(response.status).send(response.body);
});

//LOGIN-USER ROUTE
userRouter.post("/user/login", async (req: Request, res: Response) => {
  const authLoginController = new AuthLoginController();

  const response = await authLoginController.execute(req);

  res.status(response.status).send(response.body);
});

//UPDATE-USER ROUTE
userRouter.patch(
  "/user",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const updateUserController = new UpdateUserController();

    const response = await updateUserController.execute(req);

    res.status(response.status).send(response.body);
  }
);

//DELETE-USER ROUTE
userRouter.delete(
  "/user",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const deleteUserController = new DeleteUserController();

    const response = await deleteUserController.execute(req);

    res.status(response.status).send(response.body);
  }
);

export default userRouter;
