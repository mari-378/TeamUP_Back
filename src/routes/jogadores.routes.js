import { Router } from "express";
import { authMiddleware } from "../utils/authMiddleware.js";
import { cadastrarJogador, listarJogadores, removerJogador } from "../controllers/jogadores.controller.js";

const router = Router();

router.use(authMiddleware);
router.post("/", cadastrarJogador);
router.get("/", listarJogadores);
router.delete("/:id", removerJogador);

export default router;
