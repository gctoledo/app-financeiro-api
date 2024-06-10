import { Router, Request, Response } from "express";
import { CreateBalanceController } from "../controllers/balance/create-balance";
import { DeleteBalanceController } from "../controllers/balance/delete-balance";
import { UpdateBalanceController } from "../controllers/balance/update-balance";
import { GetBalancesByUserIdController } from "../controllers/balance/get-balances-by-user-id";

const balanceRouter = Router();

//GET-BALANCES-BY-USER-ID ROUTE
balanceRouter.get("/balances/:userId", async (req: Request, res: Response) => {
  const getBalancesByUserIdController = new GetBalancesByUserIdController();

  const response = await getBalancesByUserIdController.execute(req);

  res.status(response.status).send(response.body);
});

//CREATE-BALANCE ROUTE
balanceRouter.post("/balance", async (req: Request, res: Response) => {
  const createBalanceController = new CreateBalanceController();

  const response = await createBalanceController.execute(req);

  res.status(response.status).send(response.body);
});

//DELETE-BALANCE ROUTE
balanceRouter.delete(
  "/balance/:balanceId",
  async (req: Request, res: Response) => {
    const deleteBalanceController = new DeleteBalanceController();

    const response = await deleteBalanceController.execute(req);

    res.status(response.status).send(response.body);
  }
);

//UPDATE-BALANCE ROUTE
balanceRouter.patch(
  "/balance/:balanceId",
  async (req: Request, res: Response) => {
    const updateBalanceController = new UpdateBalanceController();

    const response = await updateBalanceController.execute(req);

    res.status(response.status).send(response.body);
  }
);

export default balanceRouter;
