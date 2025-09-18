const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.post('/auth/login', (req, res) => {
    console.log('[Auth Service] Tentativa de login recebida.');
    res.json({ token: 'um-token-jwt-simulado-que-veio-do-auth-service' });
});

app.listen(PORT, () => console.log(`🚀 [Auth Service] Rodando em http://localhost:${PORT}`));