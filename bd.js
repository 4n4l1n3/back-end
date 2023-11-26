//bd.js
import pkg from "pg";
const { Pool } = pkg;

async function connect() {
  const pool = new Pool({
    connectionString: process.env.URL_BD,
  });
  return pool.connect();
}

async function selectAdmins() {
  const client = await connect();
  const res = await client.query("SELECT * FROM usuario");
  return res.rows;
}

async function selectAdmin(id) {
  const client = await connect();
  const query = "SELECT * FROM admin WHERE id = $1";
  const admin = [id];
  const res = await client.query(query,admin);
  return res.rows;
}

//bd.js
async function insertAdmin(data) {
  const client = await connect();
  const query = "INSERT INTO Admin (usuario, senha, email_identificador ) VALUES ($1,$2,$3) ";
  const admin = [data.usuario, data.senha, data.email_identificador ];
  await client.query(query, admin);
}

export { selectAdmins, selectAdmin, insertAdmin };
