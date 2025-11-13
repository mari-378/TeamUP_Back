import { auth, db } from "../services/firebase.js";
<<<<<<< HEAD

export const register = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ erro: "Email e senha são obrigatórios" });

    const user = await auth.createUser({ email, password: senha });
=======
import fetch from "node-fetch";

export const cadastro = async (req, res) => {
  try {
    const { email, senha, nome, genero, dataNascimento } = req.body;
    if (!email || !senha || !nome || !genero || !dataNascimento) return res.status(400).json({ erro: "Email, senha, nome, gênero e data de nascimento são obrigatórios" });

    const user = await auth.createUser({ email, password: senha, nome, genero, dataNascimento });
>>>>>>> 6987aadca371c436f1f857e7625b556cf1a8f519
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

<<<<<<< HEAD
// Opção B: Login corrigido e com Logs de erro
export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        
        // Validação básica
        if (!email || !senha) {
            return res.status(400).json({ erro: "Email e senha são obrigatórios" });
        }

        // 1. Chave DIRETA no código (Para eliminar erro de .env)
        const apiKey = "AIzaSyC6KWcW64xTwhXoMYN2GKHnNMIN0H_qkmk";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

        console.log("📡 Tentando conectar no Firebase...");

        // 2. Faz a chamada para o Google
        const resp = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                email: email, 
                password: senha, 
                returnSecureToken: true 
            })
        });

        const data = await resp.json();

        // 3. Se o Google reclamar, mostramos o motivo no terminal
        if (!resp.ok) {
            console.error("❌ ERRO DO FIREBASE:", JSON.stringify(data, null, 2));
            return res.status(400).json({ erro: data.error?.message || "Login inválido" });
        }

        console.log("✅ Login Sucesso! Token gerado.");

        // 4. Retorna os dados para o teste
        return res.json({
            idToken: data.idToken,
            refreshToken: data.refreshToken,
            expiresIn: data.expiresIn,
            uid: data.localId
        });

    } catch (error) {
        console.error("💥 ERRO NO CÓDIGO:", error);
        return res.status(500).json({ erro: error.message });
    }
};
=======
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
>>>>>>> 6987aadca371c436f1f857e7625b556cf1a8f519
