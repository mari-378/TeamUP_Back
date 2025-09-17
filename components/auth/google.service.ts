import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { User } from "../user/user.model";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class GoogleAuthService {
  static async verifyGoogleToken(token: string) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();
  }

  static async getOrCreateUser(payload: any) {
    const { email, name, picture } = payload;

    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({
        nome: name,
        email,
        senha: "", // senha vazia, login é só com Google
        foto: picture
      });
    }

    const jwtToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return { user, jwtToken };
  }
}
