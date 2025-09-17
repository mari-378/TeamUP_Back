import * as bcrypt from "bcrypt";
import {User} from "./user.model";

export class UserService {
  static async createUser(nome: string, email: string, senha: string) {
    // Verificar se já existe um usuário com o mesmo email
    const existingUser = await User.findOne({where: {email}});
    if (existingUser) {
      throw new Error("Email já está em uso");
    }

    // hash de senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // salvar no banco
    const newUser = await User.create({nome, email, senha: hashedPassword});
    return newUser;
  }
}