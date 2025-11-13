// --- ESTA LINHA ABAIXO É A QUE ESTÁ FALTANDO ---
import { jest } from '@jest/globals'; 
// -----------------------------------------------

import 'dotenv/config';
import request from 'supertest';
import app from './src/app.js';

// Agora o comando vai funcionar porque importamos o 'jest' ali em cima
jest.setTimeout(30000); 

console.log("📢 MINHA CHAVE É:", process.env.FIREBASE_WEB_API_KEY);

describe('Autenticação (Auth) - E2E', () => {

    const emailTeste = `qa.${Date.now()}@teste.com`;
    const senhaTeste = "123456"; 

    // TESTE 1: REGISTRO
    it('POST /api/auth/register -> Deve criar um novo usuário', async () => {
        const resposta = await request(app)
            .post('/api/auth/register')
            .send({
                email: emailTeste,
                senha: senhaTeste
            });

        if (resposta.statusCode !== 200 && resposta.statusCode !== 201) {
            console.log("\n🚨 ERRO NO REGISTRO:", JSON.stringify(resposta.body, null, 2));
        }

        expect([200, 201]).toContain(resposta.statusCode);
    });

    // TESTE 2: LOGIN
    it('POST /api/auth/login -> Deve logar e retornar o Token', async () => {
        const resposta = await request(app)
            .post('/api/auth/login')
            .send({
                email: emailTeste,
                senha: senhaTeste
            });

        if (resposta.statusCode !== 200) {
            console.log("\n🚨 ERRO NO LOGIN:", JSON.stringify(resposta.body, null, 2));
        }

        expect(resposta.statusCode).toBe(200);
        
        const corpo = resposta.body;
        const temToken = corpo.token || corpo.idToken || corpo.accessToken || corpo._tokenResponse;
        expect(temToken).toBeDefined();
    });
});