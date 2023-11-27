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

export { selectAdministradores, selectAdministrador, insertAdministrador };
