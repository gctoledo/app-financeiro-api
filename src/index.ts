import "dotenv/config.js";
import express, { Request, Response } from "express";
import { CreateUserController } from "./controllers/user/create-user";
import { GetUserByIdController } from "./controllers/user/get-user-by-id";

const app = express();

app.use(express.json());

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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
