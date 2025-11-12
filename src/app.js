import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import jogadoresRoutes from "./routes/jogadores.routes.js";
import partidasRoutes from "./routes/partidas.routes.js";
import sorteioRoutes from "./routes/sorteio.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jogadores", jogadoresRoutes);
app.use("/api/partidas", partidasRoutes);
app.use("/api/sorteio", sorteioRoutes);

export default app;
