import express, { Express } from "express";
import globalErrorHandler from "./common/middlewares/globalErrorHandler";

require("dotenv").config();

import { authRouter } from "./auth/routes/auth";

const app: Express = express();
app.use(express.json());

app.use("/api/auth", authRouter);

app.use(globalErrorHandler);

export default app;
