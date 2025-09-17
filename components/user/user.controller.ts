import {Request, Response} from "express";
import {validationResult} from "express-validator";
import {userValidation} from "./user.validation";
import {UserService} from "./user.service";

export class UserController {
  static validations = userValidation;

  static async cadastro(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {nome, email, senha} = req.body;

    try {
      const user = await UserService.createUser(nome, email, senha);
      return res.status(201).json({mensagem: "Usuário criado com sucesso", user});
    } catch (err: any) {
      if (err.message === "Email já está em uso") {
        return res.status(400).json({mensagem: "E-mail já cadastrado."});
    }
      return res.status(500).json({mensagem: "Erro interno."});
    }
  }
}