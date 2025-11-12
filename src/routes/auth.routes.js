import { Router } from "express";
import { register, login, loginWithIdToken } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login); // REST: retorna idToken/refreshToken
router.post("/login-idtoken", loginWithIdToken); // Cliente envia idToken

export default router;
