function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function gerarTimesBalanceados(jogadores, numTimes = 2) {
  if (!Array.isArray(jogadores) || jogadores.length === 0) {
    throw new Error('Jogadores inválidos');
  }

  const list = jogadores.map(j => ({
    nome: j.nome,
    nivel: Number(j.nivel) || 0
  }));

  shuffle(list);
  list.sort((a, b) => b.nivel - a.nivel);

  const times = [];
  for (let i = 0; i < numTimes; i++) {
    times.push({ nome: `Time${i+1}`, jogadores: [], somaNiveis: 0 });
  }

  for (const jogador of list) {
    let idx = 0;
    let min = times[0].somaNiveis;
    for (let i = 1; i < times.length; i++) {
      if (times[i].somaNiveis < min) {
        min = times[i].somaNiveis;
        idx = i;
      }
    }
    times[idx].jogadores.push(jogador);
    times[idx].somaNiveis += jogador.nivel;
  }

  const resposta = {};
  times.forEach(t => {
    resposta[t.nome] = t.jogadores;
  });

  return { times: resposta, meta: { numPlayers: list.length, numTimes } };
}

module.exports = { gerarTimesBalanceados };
