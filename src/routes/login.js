import { Router } from "express";
import jwt from "jsonwebtoken";
import { autenticarAdministrador } from "../db/index.js";

const router = Router();

router.post("/login", async (req, res) => {
  console.log("Rota POST /login solicitada");
  try {
    const administrador = await autenticarAdministrador(req.body.email_identificador, req.body.senha);
    if (administrador !== undefined) {
      const token = jwt.sign({ user: administrador.id }, process.env.SECRET, {
        expiresIn: 300,
      });
      res.status(202).json({ token: token });
    } else res.status(404).json({ message: "Usuário/Senha incorreta!" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

export default router;