import "dotenv/config.js";
import express, { Request, Response } from "express";
import { CreateUserController } from "./controllers/user/create-user";

const app = express();

app.use(express.json());

app.post("/api/users", async (req: Request, res: Response) => {
  const createUserController = new CreateUserController();

  const response = await createUserController.execute(req);

  res.status(response.status).send(response.body);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
