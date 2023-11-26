import express from "express";      // Requisição do pacote do express
import dotenv from "dotenv";
import { selectAdmins } from "./bd.js";
import { selectAdmin } from "./bd.js";
import { insertAdmin } from "./bd.js";

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
  
  app.get("/Admins", async (req, res) => {
    try {
      const admins = await selectAdmins();
      res.json(admins);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }

app.get("/admin/:id", async (req, res) => {
  console.log("Rota GET /admin solicitada");
  try {
    const admin = await selectAdmin(req.params.id);
    if (admin.length > 0) res.json(admin);
    else res.status(404).json({ message: "Administrador não encontrado!" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

app.post("/admin", async (req, res) => {
  console.log("Rota POST /admin solicitada");
  try {
    await insertAdmin(req.body);
    res.status(201).json({ message: "Administrador inserido com sucesso!" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});
  
    console.log("Rota GET/admins solicitada");
  });

app.listen(port, () => {            // Um socket para "escutar" as requisições
  console.log(`Serviço escutando na porta:  ${port}`);
});






