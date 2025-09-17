import { Request, Response } from "express";
import { GoogleAuthService } from "./google.service";

export class GoogleController {
  static async login(req: Request, res: Response) {
    try {
      const { token } = req.body;
      if (!token) return res.status(400).json({ mensagem: "Token não fornecido." });

      const payload = await GoogleAuthService.verifyGoogleToken(token);
      if (!payload) return res.status(401).json({ mensagem: "Token inválido." });

      const { user, jwtToken } = await GoogleAuthService.getOrCreateUser(payload);

      return res.status(200).json({
        mensagem: "Login feito com sucesso!",
        token: jwtToken,
        user
      });
    } catch (err) {
      return res.status(500).json({ mensagem: "Erro interno na autenticação com Google." });
    }
  }
}
