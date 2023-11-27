import express from "express";      // Requisição do pacote do express
import dotenv from "dotenv";
import { selectAdministradores } from "./bd.js";
import { selectAdministrador } from "./bd.js";
import { insertAdministrador } from "./bd.js";
import { deleteAdministrador } from "./bd.js";

dotenv.config();

const app = express();              // Instancia o Express
const port = 3000;                  // Define a porta

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Rota / solicitada");
  // Cria a rota da raiz do projeto
  res.json({
    nome: "Arthur Porto", // mexer nisso aqui
  });
});

app.get("/administradores", async (req, res) => {
  try {
    const administradores = await selectAdministradores();
    res.json(administradores);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
  console.log("Rota GET/administradores solicitada");
});

app.get("/administrador/:id", async (req, res) => {
  console.log("Rota GET /administrador solicitada");
  try {
    const administrador = await selectAdministrador(req.params.id);
    if (administrador.length > 0) res.json(administrador);
    else res.status(404).json({ message: "Administrador não encontrado!" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

app.post("/administrador", async (req, res) => {
  console.log("Rota POST /administrador solicitada");
  try {
    await insertAdministrador(req.body);
    res.status(201).json({ message: "Administrador inserido com sucesso!" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

app.delete("/administrador/:id", async (req, res) => {
  console.log("Rota DELETE /administrador solicitada");
  try {
    const administrador = await selectAdministrador(req.params.id);
    if (administrador.length > 0) {
      await deleteAdministrador(req.params.id);
      res.status(200).json({ message: "Administrador excluido com sucesso!!" });
    } else res.status(404).json({ message: "Administrador não encontrado!" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

app.listen(port, () => {            // Um socket para "escutar" as requisições
  console.log(`Serviço escutando na porta:  ${port}`);
});






