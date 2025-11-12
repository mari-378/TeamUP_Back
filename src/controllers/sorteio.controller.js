import { db } from "../services/firebase.js";

function criarTimes(jogadores, maxPorTime) {
  if (!jogadores || jogadores.length === 0) {
    throw new Error("Nenhum jogador enviado");
  }

  let qtdTimes = 2;
  if (Math.ceil(jogadores.length / qtdTimes) > maxPorTime) {
    qtdTimes = Math.ceil(jogadores.length / maxPorTime);
  }

  const times = Array.from({ length: qtdTimes }, () => []);
  const somas = Array.from({ length: qtdTimes }, () => 0);
  const ordenados = [...jogadores].sort((a, b) => b.habilidade - a.habilidade);

  for (const jogador of ordenados) {
    let indice = 0;
    let menor = somas[0];
    for (let i = 1; i < qtdTimes; i++) {
      if (somas[i] < menor) {
        menor = somas[i];
        indice = i;
      }
    }
    times[indice].push(jogador);
    somas[indice] += jogador.habilidade;
  }

  return times;
}

export const sortearTimes = async (req, res) => {
  try {
    const { jogadores, maxPorTime, userId } = req.body;
    const times = criarTimes(jogadores, maxPorTime);

    await db.collection("sorteios").add({
      jogadores,
      times,
      maxPorTime,
      criadoEm: new Date(),
      userId: userId || null
    });

    return res.json({ times });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
