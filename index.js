import express from "express";      // Requisição do pacote do express
import dotenv from "dotenv";
import { selectAdministradores } from "./bd.js";
import { selectAdministrador } from "./bd.js";
import { insertAdministrador } from "./bd.js";
import { deleteAdministrador } from "./bd.js";
import { updateAdministrador } from "./bd.js";
import { selectDocumentos} from "./bd.js";
import { selectDocumento } from "./bd.js";
import { insertDocumento } from "./bd.js";
import { deleteDocumento } from "./bd.js";
import { updateDocumento } from "./bd.js";

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

app.put("/administrador", async (req, res) => {
  console.log("Rota PUT /administrador solicitada");
  try {
    const administrador = await selectAdministrador(req.body.id);
    if (administrador.length > 0) {
      await updateAdministrador(req.body);
      res.status(200).json({ message: "Administrador atualizado com sucesso!" });
    } else res.status(404).json({ message: "Administrador não encontrado!" });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

app.get("/documentos", async (req, res) => {
  try {
    const documentos = await selectDocumentos();
    res.json(documentos);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
  console.log("Rota GET/documentos solicitada");
});

app.get("/documento/:id", async (req, res) => {
  console.log("Rota GET /documento solicitada");
  try {
    const documento = await selectDocumento(req.params.id);
    if (documento.length > 0) res.json(documento);
    else res.status(404).json({ message: "Documento não encontrado!" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

app.post("/documento", async (req, res) => {
  console.log("Rota POST /documento solicitada");
  try {
    await insertDocumento(req.body);
    res.status(201).json({ message: "Documento inserido com sucesso!" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

app.delete("/documento/:id", async (req, res) => {
  console.log("Rota DELETE /documento solicitada");
  try {
    const documento = await selectDocumento(req.params.id);
    if (documento.length > 0) {
      await deleteDocumento(req.params.id);
      res.status(200).json({ message: "Documento excluido com sucesso!!" });
    } else res.status(404).json({ message: "Documento não encontrado!" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

app.put("/documento", async (req, res) => {
  console.log("Rota PUT /documento solicitada");
  try {
    const documento = await selectDocumento(req.body.id);
    if (documento.length > 0) {
      await updateDocumento(req.body);
      res.status(200).json({ message: "Documento atualizado com sucesso!" });
    } else res.status(404).json({ message: "Documento não encontrado!" });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

app.get("/download", async (req, res) => {
  console.log("Rota GET /download solicitada");
  try {
    const documento = await selectDocumento(req.params.id);
    if (documento.length > 0) res.json(documento);
    else res.status(404).json({ message: "Documento não encontrado!" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
    var path = require("path");
    var file = path.join(_dirname, "./file.pdf");
    res.download(file, function (err) {
      if (err) {
        console.log("Erro");
        console.log(err);
      } else {
        console.log("Sucesso");
      }
    });
});

app.listen(port, () => {            // Um socket para "escutar" as requisições
  console.log(`Serviço escutando na porta:  ${port}`);
});






