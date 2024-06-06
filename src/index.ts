import "dotenv/config.js";
import express, { Request, Response } from "express";
import { CreateUserController } from "./controllers/user/create-user";
import { GetUserByIdController } from "./controllers/user/get-user-by-id";
import { DeleteUserController } from "./controllers/user/delete-user";
import { UpdateUserController } from "./controllers/user/update-user";
import { CreateBalanceController } from "./controllers/balance/create-balance";

const app = express();

app.use(express.json());

/*  USER  */

app.get("/api/users/:userId", async (req: Request, res: Response) => {
  const getUserByIdController = new GetUserByIdController();

  const response = await getUserByIdController.execute(req);

  res.status(response.status).send(response.body);
});

app.post("/api/users", async (req: Request, res: Response) => {
  const createUserController = new CreateUserController();

  const response = await createUserController.execute(req);

  res.status(response.status).send(response.body);
});

app.patch("/api/users/:userId", async (req: Request, res: Response) => {
  const updateUserController = new UpdateUserController();

  const response = await updateUserController.execute(req);

  res.status(response.status).send(response.body);
});

app.delete("/api/users/:userId", async (req: Request, res: Response) => {
  const deleteUserController = new DeleteUserController();

  const response = await deleteUserController.execute(req);

  res.status(response.status).send(response.body);
});

/*  BALANCE  */

app.post("/api/balance", async (req: Request, res: Response) => {
  const createBalanceController = new CreateBalanceController();

  const response = await createBalanceController.execute(req);

  res.status(response.status).send(response.body);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
