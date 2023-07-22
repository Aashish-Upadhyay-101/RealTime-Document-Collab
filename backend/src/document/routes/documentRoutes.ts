import express from "express";
import { createDoc } from "../controllers/create-doc";

const router = express.Router();

router.post("/create-doc", createDoc);

export { router as documentsRouter };
