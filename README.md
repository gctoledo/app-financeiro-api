# Finance App

Projeto de um dashboard financeiro para organização das finanças de um estabelecimento comercial, onde o usuário poderá cadastrar sua conta, registrar seus saldos diários.

## 🔥 Introdução

A ideia do projeto começou porque meus pais possuem um estabelecimento comercial e a organização das finanças eram todas feitas por planilhas. Apesar de ser um modo bastante funcional, isso me gerou uma vontade muito grande de construir uma aplicação que pudesse armazenar essas dados de uma forma mais segura e, além disso, conseguir manipular esses dados para criar insights sobre como melhorar o gerenciamento das finanças do estabelecimento. Com isso desenvolvi essa aplicação, que apesar de simples e feita para fins didáticos, tenho muito orgulho em dizer que supre todas as necessidades para as pessoas que me incentivaram a criar esse sistema.

O projeto é uma CRUD API, que será integrado com um sistema web, utilizando JWT para autenticação de rotas privadas, Express para desenvolvimento das rotas, Prisma como ORM para interação com o banco de dados (PostgreSQL).

#

## 🔥 Próximos passos

O que está nos próximos passos do desenvolvimento:

[] - Documentação da API com Swagger
[] - Testes automatizados com Jest
[] - CI/CD com Github Actions

#

Rotas disponíveis:

Usuário:

- Seleção do usuário por ID (GET)

- Login (POST)

- Criação (POST)

- Remoção (DELETE)

- Atualização (PATCH)

Balanços diários:

- Seleção de balanços (GET)

- Criação (POST)

- Remoção (DELETE)

- Atualização (PATCH)

#

### 🔨 Guia de instalação

Para visualizar o projeto é necessário possuir o NodeJS instalado em sua máquina. Você pode fazer um clone do repositório e executar os seguintes comandos no terminal para visualizar o projeto:

Clone o projeto

```
  git clone https://github.com/gctoledo/app-financeiro-api
```

Entre no diretório do projeto

```
  cd app-financeiro
```

Instale as dependências

```
  npm install
```

Inicie o servidor

```
  npm run start:dev
```

## 📦 Tecnologias usadas:

- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
