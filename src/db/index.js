import pkg from "pg";
const { Pool } = pkg;

async function connect() {
  const pool = new Pool({
    connectionString: process.env.URL_BD,
  });
  return pool.connect();
}

async function selectAdministradores() {
  const client = await connect();
  const res = await client.query("SELECT * FROM Administrador");
  return res.rows;
}

async function selectAdministrador(id) {
  const client = await connect();
  const query = "SELECT * FROM administrador WHERE id = $1";
  const administrador = [id];
  const res = await client.query(query,administrador);
  return res.rows;
}

async function insertAdministrador(data) {
  const client = await connect();
  const query = "INSERT INTO administrador (usuario,senha,email_identificador) VALUES ($1,$2,$3) ";
  const administrador = [data.usuario, data.senha, data.email_identificador];
  await client.query(query, administrador);
}

async function deleteAdministrador(id) {
  const client = await connect();
  const query = "DELETE FROM administrador WHERE id = $1";
  await client.query(query, [id]);
}

async function updateAdministrador(data) {
  const client = await connect();
  const query = "UPDATE administrador SET usuario = $1, email_identificador = $2, senha = $3 WHERE id = $4";
  const administrador = [data.usuario, data.email_identificador, data.senha, data.id];
  await client.query(query, administrador);
}

async function selectDocumentos() {
  const client = await connect();
  const res = await client.query("SELECT * FROM documento");
  return res.rows;
}

async function selectDocumento(id) {
  const client = await connect();
  const query = "SELECT * FROM documento WHERE id = $1";
  const documento = [id];
  const res = await client.query(query,documento);
  return res.rows;
}

async function insertDocumento(data) {
  const client = await connect();
  const query = "INSERT INTO documento (nome, descricao) VALUES ($1,$2) ";
  const documento = [data.nome, data.descricao];
  await client.query(query, documento);
}

async function deleteDocumento(id) {
  const client = await connect();
  const query = "DELETE FROM documento WHERE id = $1";
  await client.query(query, [id]);
}

async function updateDocumento(data) {
  const client = await connect();
  const query = "UPDATE documento SET nome = $1, descricao = $2 WHERE id = $3";
  const documento = [data.nome, data.descricao, data.id];
  await client.query(query, documento);
}

// src/db/index.js
async function autenticarAdministrador(email_identificador, senha) {
  const client = await connect();
  const query = "SELECT * FROM administrador  WHERE email_identificador  = $1 AND senha = $2";
  const administrador = [email_identificador, senha];
  const res = await client.query(query, administrador);
  return res.rows[0];
}

export {selectAdministradores, selectAdministrador, insertAdministrador, deleteAdministrador, updateAdministrador, selectDocumentos, selectDocumento, insertDocumento, deleteDocumento, updateDocumento, autenticarAdministrador};
