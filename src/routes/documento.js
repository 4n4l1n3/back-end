import { Router } from "express";
import { selectDocumentos, selectDocumento, insertDocumento, deleteDocumento, updateDocumento } from "../db/index.js";

const router = Router();

router.get("/documentos", async (req, res) => {
    try {
        const documentos = await selectDocumentos();
        res.json(documentos);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
    console.log("Rota GET/documentos solicitada");
});

router.get("/documento/:id", async (req, res) => {
    console.log("Rota GET /documento solicitada");
    try {
        const documento = await selectDocumento(req.params.id);
        if (documento.length > 0) res.json(documento);
        else res.status(404).json({ message: "Documento não encontrado!" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.post("/documento", async (req, res) => {
    console.log("Rota POST /documento solicitada");
    try {
        await insertDocumento(req.body);
        res.status(201).json({ message: "Documento inserido com sucesso!" });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

router.delete("/documento/:id", async (req, res) => {
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

router.put("/documento", async (req, res) => {
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

export default router;