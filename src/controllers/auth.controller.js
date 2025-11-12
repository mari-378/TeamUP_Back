import { auth, db } from "../services/firebase.js";
import fetch from "node-fetch";

export const register = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ erro: "Email e senha são obrigatórios" });

    const user = await auth.createUser({ email, password: senha });
    await db.collection("users").doc(user.uid).set({ email, createdAt: Date.now() });
    return res.json({ mensagem: "Usuário criado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};

// Opção A: cliente envia idToken e o backend apenas verifica
export const loginWithIdToken = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ erro: "idToken é obrigatório" });
    const decoded = await auth.verifyIdToken(idToken);
    return res.json({ uid: decoded.uid, email: decoded.email || null });
  } catch {
    return res.status(401).json({ erro: "Token inválido" });
  }
};

// Opção B: backend usa REST para emitir idToken
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ erro: "Email e senha são obrigatórios" });

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_WEB_API_KEY}`;
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: senha, returnSecureToken: true })
    });
    const data = await resp.json();
    if (!resp.ok) return res.status(400).json({ erro: data.error?.message || "Login inválido" });

    return res.json({
      idToken: data.idToken,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
      uid: data.localId
    });
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};
