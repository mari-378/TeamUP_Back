import { Router } from "express";
import { authMiddleware } from "../utils/authMiddleware.js";
import { registrarPartida, listarPartidas } from "../controllers/partidas.controller.js";

const router = Router();

router.use(authMiddleware);
router.post("/", registrarPartida);
router.get("/", listarPartidas);

export default router;
