import { auth } from "../services/firebase.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ erro: "Token não enviado" });
  try {
    const decoded = await auth.verifyIdToken(token);
    req.userId = decoded.uid;
    next();
  } catch {
    res.status(401).json({ erro: "Token inválido" });
  }
};
