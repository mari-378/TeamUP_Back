import { cadastro, loginWithIdToken } from "../../src/controllers/auth.controller.js";

describe("Auth controller", () => {
  test("cadastro cria usuário e retorna mensagem", async () => {
    const req = { body: { email: "user@test.com", senha: "Senha123!" } };
    const res = { json: jest.fn(), status: jest.fn(() => res) };

    await cadastro(req, res);
    expect(res.json).toHaveBeenCalledWith({ mensagem: "Usuário criado com sucesso!" });
  });

  test("loginWithIdToken valida token e retorna uid/email", async () => {
    const req = { body: { idToken: "valid-token" } };
    const res = { json: jest.fn(), status: jest.fn(() => res) };

    await loginWithIdToken(req, res);
    const data = res.json.mock.calls[0][0];
    expect(data.uid).toBe("uid-test");
    expect(data.email).toBe("user@test.com");
  });
});
