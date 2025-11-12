import request from "supertest";
import app from "../../src/app.js";

describe("Rotas protegidas", () => {
  test("POST /api/jogadores exige Bearer token", async () => {
    const res = await request(app)
      .post("/api/jogadores")
      .send({ nome: "Ana", habilidade: 8 });
    expect(res.status).toBe(401);
  });

  test("POST /api/jogadores com token válido cria jogador", async () => {
    const res = await request(app)
      .post("/api/jogadores")
      .set("Authorization", "Bearer valid-token")
      .send({ nome: "Ana", habilidade: 8, userId: "uid-test" });
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/cadastrado/i);
  });

  test("POST /api/sorteio com token válido retorna times", async () => {
    const res = await request(app)
      .post("/api/sorteio")
      .set("Authorization", "Bearer valid-token")
      .send({
        jogadores: [
          { nome: "A", habilidade: 10 },
          { nome: "B", habilidade: 9 },
          { nome: "C", habilidade: 8 },
          { nome: "D", habilidade: 7 },
        ],
        maxPorTime: 2,
        userId: "uid-test",
      });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.times)).toBe(true);
  });
});
