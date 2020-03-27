const express = require("express");
const cors = require("cors");
const { errors } = require('celebrate');
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.listen(3333);

/**
 * ================= CONCEITOS =================
 */

/**
 * Rota / Recurso
 */

/**
 * Métodos HTTP:
 *
 * GET: Buscar/listar uma informação do back-end
 * POST: Criar uma informação do back-end
 * PUT: Alterar uma informação do back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros:
 *
 * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc
 */

/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where()
 */

/**
 * Entidades:
 * 
 * - ONG
 * - Caso (Incident)
 * 
 * Funcionalidades:
 * - Login de ONG
 * - Logout de ONG
 * - Cadastro de ONG
 * - Cadastrar novos casos
 * - Deletar casos
 * - Listar casos específicos de uma ONG
 * - Listar todos os casos
 * - Entrar em contato com a ONG
 */