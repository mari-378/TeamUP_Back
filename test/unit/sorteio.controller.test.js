import { sortearTimes } from "../../src/controllers/sorteio.controller.js";

describe("Sorteio - criarTimes", () => {
  test("balanceia por habilidade e respeita maxPorTime", async () => {
    const jogadores = [
      { nome: "A", habilidade: 10 },
      { nome: "B", habilidade: 9 },
      { nome: "C", habilidade: 8 },
      { nome: "D", habilidade: 7 }
    ];
    const req = { body: { jogadores, maxPorTime: 2, userId: "uid-test" } };
    const res = { json: jest.fn(), status: jest.fn(() => res) };

    await sortearTimes(req, res);

    const payload = res.json.mock.calls[0][0];
    expect(payload.times.length).toBeGreaterThanOrEqual(2);
    expect(payload.times.every(t => t.length <= 2)).toBe(true);
  });
});
