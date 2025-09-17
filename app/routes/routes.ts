import { Router } from "express";
import { GoogleController } from "../../components/auth/google.controller";
import { UserController } from "../../components/user/user.controller";

const router = Router();

// rota de cadastro
router.post("/cadastro", UserController.validations, UserController.cadastro);

// rota de login com Google
router.post("/auth/google", GoogleController.login);

export default router;
