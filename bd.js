//bd.js
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
  const query =
    "UPDATE administrador SET usuario = $1, email_identificador = $2, senha = $3 WHERE id = $4";
  const administrador = [data.usuario, data.email_identificador, data.senha, data.id];
  await client.query(query, administrador);
}

export { selectAdministradores, selectAdministrador, insertAdministrador, deleteAdministrador,updateAdministrador };
