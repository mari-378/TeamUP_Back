import { db } from "../services/firebase.js";

export const cadastrarJogador = async (req, res) => {
  try {
    const { nome, habilidade, userId } = req.body;
    await db.collection("jogadores").add({
      nome,
      habilidade,
      criadoEm: new Date(),
      userId: userId || null
    });
    res.json({ message: "Jogador cadastrado!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const listarJogadores = async (req, res) => {
  try {
    const snapshot = await db.collection("jogadores").orderBy("criadoEm", "desc").get();
    const jogadores = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(jogadores);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const removerJogador = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("jogadores").doc(id).delete();
    res.json({ message: "Jogador removido!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
