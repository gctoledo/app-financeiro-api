import { Router, Request, Response } from "express";
import { CreateBalanceController } from "../controllers/balance/create-balance";
import { DeleteBalanceController } from "../controllers/balance/delete-balance";

const balanceRouter = Router();

balanceRouter.post("/balance", async (req: Request, res: Response) => {
  const createBalanceController = new CreateBalanceController();

  const response = await createBalanceController.execute(req);

  res.status(response.status).send(response.body);
});

balanceRouter.delete(
  "/balance/:balanceId",
  async (req: Request, res: Response) => {
    const deleteBalanceController = new DeleteBalanceController();

    const response = await deleteBalanceController.execute(req);

    res.status(response.status).send(response.body);
  }
);

export default balanceRouter;
