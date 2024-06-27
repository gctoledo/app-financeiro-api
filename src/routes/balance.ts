import { Router, Request, Response } from "express";
import { CreateBalanceController } from "../controllers/balance/create-balance";
import { DeleteBalanceController } from "../controllers/balance/delete-balance";
import { UpdateBalanceController } from "../controllers/balance/update-balance";
import { GetBalancesByUserIdController } from "../controllers/balance/get-balances-by-user-id";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { GetBalanceByIdController } from "../controllers/balance/get-balance-by-id";

const balanceRouter = Router();

//GET-BALANCES-BY-USER-ID ROUTE
balanceRouter.get(
  "/balances",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const getBalancesByUserIdController = new GetBalancesByUserIdController();

    const response = await getBalancesByUserIdController.execute(req);

    res.status(response.status).send(response.body);
  }
);

//GET-BALANCE-BY-ID ROUTE
balanceRouter.get(
  "/balance/:balanceId",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const getBalanceByIdController = new GetBalanceByIdController();

    const response = await getBalanceByIdController.execute(req);

    res.status(response.status).send(response.body);
  }
);

//CREATE-BALANCE ROUTE
balanceRouter.post(
  "/balance",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const createBalanceController = new CreateBalanceController();

    const response = await createBalanceController.execute(req);

    res.status(response.status).send(response.body);
  }
);

//DELETE-BALANCE ROUTE
balanceRouter.delete(
  "/balance/:balanceId",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const deleteBalanceController = new DeleteBalanceController();

    const response = await deleteBalanceController.execute(req);

    res.status(response.status).send(response.body);
  }
);

//UPDATE-BALANCE ROUTE
balanceRouter.patch(
  "/balance/:balanceId",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const updateBalanceController = new UpdateBalanceController();

    const response = await updateBalanceController.execute(req);

    res.status(response.status).send(response.body);
  }
);

export default balanceRouter;
