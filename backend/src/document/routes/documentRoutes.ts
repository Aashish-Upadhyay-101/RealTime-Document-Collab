import express from "express";
import { createDoc } from "../controllers/create-doc";
import { authProtected } from "../../auth/middlewares/protect-route";

const router = express.Router();

router.post("/create-doc", authProtected, createDoc);

export { router as documentsRouter };
