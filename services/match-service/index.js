const express = require('express');
const app = express();
const { gerarTimesBalanceados } = require('./sorteio.service');
const db = require('./firebase');

app.use(express.json());

app.post('/sorteio', async (req, res) => {
  try {
    const { jogadores, esporte } = req.body;
    const times = gerarTimesBalanceados(jogadores);

    const partidaRef = await db.collection('partidas').add({
      esporte,
      criadoEm: new Date(),
      times,
      placar: { timeA: 0, timeB: 0 }
    });

    res.status(201).json({ partidaId: partidaRef.id, times });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no sorteio' });
  }
});

app.post('/salvar-times', async (req, res) => {
  const { usuarioId, partida } = req.body;
  const partidaRef = await db.collection('partidas').add({
    usuarioId,
    esporte: partida.esporte || null,
    criadoEm: new Date(),
    times: partida.times
  });
  res.status(201).json({ message: 'Times salvos com sucesso!', partidaId: partidaRef.id });
});

app.post('/salvar-placar', async (req, res) => {
  try {
    const { partidaId, usuarioId, placar } = req.body;
    if (!partidaId || !usuarioId || !placar) {
      return res.status(400).json({ message: 'partidaId, usuarioId e placar obrigatórios' });
    }

    await db.collection('placares').add({
      partidaId,
      usuarioId,
      timeA: placar.timeA,
      timeB: placar.timeB,
      salvoEm: new Date()
    });

    return res.status(200).json({ message: 'Placar salvo com sucesso!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro ao salvar placar' });
  }
});

app.post('/placar/:partidaId', async (req, res) => {
  try {
    const { partidaId } = req.params;
    const { timeA, timeB } = req.body;

    await atualizarPlacar(partidaId, { timeA, timeB });

    res.status(200).json({ message: 'Placar atualizado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar placar' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`⚽ Match service rodando na porta ${PORT}`)
);
