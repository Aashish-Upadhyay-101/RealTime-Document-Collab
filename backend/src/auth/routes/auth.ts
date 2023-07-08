import express from "express";
import { login } from "../controllers/login";
import { signup } from "../controllers/signup";
import { getMe } from "../controllers/me";
import { refreshToken } from "../controllers/refresh-token";
import { logout } from "../controllers/logout";
import { changePassword } from "../controllers/change-password";
import { resetPassword } from "../controllers/reset-password";
import { verifyEmail } from "../controllers/verify-email";

const router = express.Router();

router.get("/me", getMe);
router.get("/refresh-token", refreshToken);
router.get("/logout", logout);
router.post("/login", login);
router.post("/signup", signup);
router.post("/change-password", changePassword);
router.post("/reset-password", resetPassword);
router.post("/verify-email", verifyEmail);

export { router as authRouter };
