import { db } from "../services/firebase.js";

export const registrarPartida = async (req, res) => {
  try {
    const { placares, placarFinal, userId } = req.body;
    await db.collection("partidas").add({
      data: new Date(),
      placares,
      placarFinal,
      userId: userId || null
    });
    res.json({ message: "Partida salva!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const listarPartidas = async (req, res) => {
  try {
    const snapshot = await db.collection("partidas").orderBy("data", "desc").get();
    const partidas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(partidas);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
