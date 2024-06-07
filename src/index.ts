import "dotenv/config.js";
import express from "express";
import userRouter from "./routes/user";
import balanceRouter from "./routes/balance";

const app = express();

app.use(express.json());

/*  USER  */

app.use("/api", userRouter);

/*  BALANCE  */

app.use("/api", balanceRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
