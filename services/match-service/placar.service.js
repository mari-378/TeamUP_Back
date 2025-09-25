const db = require('./firebase');

async function atualizarPlacar(partidaId, novoPlacar) {
  const partidaRef = db.collection('partidas').doc(partidaId);

  await partidaRef.update({
    placar: novoPlacar,
    atualizadoEm: new Date()
  });
}

module.exports = { atualizarPlacar };
