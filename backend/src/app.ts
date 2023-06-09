import express, { Express } from "express";
require("dotenv").config();

import { authRouter } from "./auth/routes/auth";

const app: Express = express();

app.use("/api/auth", authRouter);

export default app;
