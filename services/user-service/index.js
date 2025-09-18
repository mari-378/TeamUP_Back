const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3002; 

app.use(cors());
app.get('/users/:id', (req, res) => {
  console.log(`[User Service] Buscando dados para o usuário ${req.params.id}`);
  res.json({
    id: req.params.id,
    name: 'Maria Silva',
    email: 'maria.silva@example.com',
    source: 'Dados vindos diretamente do User Service!'
  });
});

app.listen(PORT, () => console.log(`🚀 [User Service] Rodando em http://localhost:${PORT}`));