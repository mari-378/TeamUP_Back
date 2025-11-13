````markdown
# 🏆 TeamUP Backend

API desenvolvida em **Node.js** com **Express** para gerenciamento de times e esportes, integrada com **Firebase** para autenticação e banco de dados.

Este projeto inclui uma suíte completa de **Testes End-to-End (E2E)** garantindo a qualidade das rotas de Autenticação e Jogadores.

## 🛠️ Tecnologias Utilizadas

* **Node.js** (v25+)
* **Express**
* **Firebase Admin SDK** & **Firebase Web SDK**
* **Jest** (Framework de Testes)
* **Supertest** (Requisições HTTP para testes)
* **Dotenv** (Variáveis de ambiente)

---

## 🚀 Como Rodar o Projeto

### 1. Instalação
Clone o repositório e instale as dependências:

```bash
# Clone o repositório
git clone [https://github.com/mari-378/TeamUP_Back.git](https://github.com/mari-378/TeamUP_Back.git)

# Entre na pasta
cd TeamUP_Back

# Instale as dependências
npm install
````

### 2\. Configuração do Ambiente (.env) 🔐

Para o projeto rodar, você precisa criar um arquivo `.env` na raiz.
**Importante:** O JSON da conta de serviço deve estar minificado (em uma única linha).

Crie um arquivo `.env` e preencha conforme o modelo:

```ini
# Chave Mestra do Firebase (Baixar no Console > Configurações > Contas de Serviço)
# ATENÇÃO: O JSON deve estar em uma única linha!
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"..."}

# Chave de API Web (Baixar no Console > Configurações > Geral > Chave da API da Web)
FIREBASE_WEB_API_KEY=AIzaSy...
```

### 3\. Iniciando o Servidor

Para rodar a API em modo de desenvolvimento:

```bash
npm start
```

O servidor rodará em: `http://localhost:3000`

-----

## 🧪 Testes Automatizados (E2E)

Este projeto conta com testes automatizados que verificam o fluxo real da aplicação, desde a autenticação até a manipulação de dados.

Para rodar os testes:

```bash
npm test
```

### O que está sendo testado?

  * ✅ **Autenticação:**
      * Registro de novos usuários (Firebase Auth).
      * Login e geração de Tokens de acesso.
  * ✅ **Jogadores:**
      * Criação de jogadores protegida por autenticação.
      * Listagem de jogadores.
      * Busca de jogador por ID.

-----

## 📂 Estrutura de Pastas

  * `src/controllers`: Lógica das rotas (Auth, Jogadores, Partidas).
  * `src/routes`: Definição dos endpoints da API.
  * `src/services`: Configuração do Firebase.
  * `e2e.test.js`: Arquivo principal de testes de integração.

-----

## ✒️ Autor & Contribuição

Projeto desenvolvido em equipe.
Refatoração e Testes E2E implementados por **[Seu Nome Aqui]**.

```

---

### Dica Final para brilhar ✨

Depois de criar esse arquivo:
1.  Salve.
2.  Rode `git add README.md`.
3.  Rode `git commit -m "docs: adicionando documentação do projeto"`.
4.  Rode `git push origin feature/testes-e2e`.

Isso vai aparecer lá no seu Pull Request e deixar o trabalho extremamente profissional.

Foi um prazer ser seu "co-piloto" nessa jornada! Sucesso na carreira de Dev! 🚀
```
