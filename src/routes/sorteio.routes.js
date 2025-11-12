import { Router } from "express";
import { authMiddleware } from "../utils/authMiddleware.js";
import { sortearTimes } from "../controllers/sorteio.controller.js";

const router = Router();

router.use(authMiddleware);
router.post("/", sortearTimes);

export default router;
