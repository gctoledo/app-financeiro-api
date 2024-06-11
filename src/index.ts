import "dotenv/config.js";
import express from "express";
import userRouter from "./routes/user";
import balanceRouter from "./routes/balance";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", userRouter, balanceRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
