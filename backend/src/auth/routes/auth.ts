import express from "express";
import { login } from "../controllers/login";
import { signup } from "../controllers/signup";
import { getMe } from "../controllers/me";
import { refreshToken } from "../controllers/refresh-token";
import { logout } from "../controllers/logout";
import { authProtected } from "../middlewares/protect-route";

const router = express.Router();

router.get("/me", authProtected, getMe);
router.post("/logout", logout);
router.post("/login", login);
router.post("/signup", signup);
router.post("/refresh-token", refreshToken);

export { router as authRouter };
