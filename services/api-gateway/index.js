const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

app.use(cors());

app.use('/auth', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
}));

app.use('/users', createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
}));

app.get('/', (req, res) => res.send('API Gateway está funcionando!'));

app.listen(PORT, () => console.log(`🚪 [API Gateway] Rodando em http://localhost:${PORT}`));