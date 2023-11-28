import { Router } from "express";
import { selectAdministradores, selectAdministrador, insertAdministrador, deleteAdministrador, updateAdministrador } from "../db/index.js"
import verificarAutenticacao from "../middlewares/autenticacao.js";

const router = Router();

router.get("/administradores", async (req, res) => {
    try {
        const administradores = await selectAdministradores();
        res.json(administradores);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
    console.log("Rota GET/administradores solicitada");
});

router.get("/administrador/:id", async (req, res) => {
    console.log("Rota GET /administrador solicitada");
    try {
        const administrador = await selectAdministrador(req.params.id);
        if (administrador.length > 0) res.json(administrador);
        else res.status(404).json({ message: "Administrador não encontrado!" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.post("/administrador", verificarAutenticacao, async (req, res) => {
    console.log("Rota POST /administrador solicitada");
    try {
        await insertAdministrador(req.body);
        res.status(201).json({ message: "Administrador inserido com sucesso!" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.delete("/administrador/:id", verificarAutenticacao, async (req, res) => {
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

router.put("/administrador", verificarAutenticacao, async (req, res) => {
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

export default router;