import express, { Express } from "express";
import globalErrorHandler from "./common/middlewares/globalErrorHandler";

require("dotenv").config();

import { authRouter } from "./auth/routes/auth";
import { documentsRouter } from "./document/routes/documentRoutes";

const app: Express = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/docs", documentsRouter);

app.use(globalErrorHandler);

export default app;
