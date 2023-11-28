import dotenv from "dotenv";
import express from "express";  
import roteadorAdministrador from "./routes/administrador";
import roteadorDocumento from "./routes/documento";

dotenv.config();

const app = express();              // Instancia o Express
const port = 3000;                  // Define a porta

app.use(express.json());
app.use(roteadorAdministrador);
app.use(roteadorDocumento);

app.get("/", (req, res) => {
  console.log("Rota / solicitada");
  // Cria a rota da raiz do projeto
  res.json({
    nome: "Analine Almeida e Silva: https://github.com/4n4l1n3",
  });
});

app.listen(port, () => {            // Um socket para "escutar" as requisições
  console.log(`Serviço escutando na porta:  ${port}`);
});






