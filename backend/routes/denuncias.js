const express = require("express");
const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");

const prisma = new PrismaClient();
const router = express.Router();

// Cria nova denuncia
router.post("/nova", async (req, res) => {
  const { descricao, localizacao } = req.body;

  // Gera um código
  const codigo = crypto.randomBytes(4).toString("hex").toUpperCase();

  try {
    const denuncia = await prisma.denuncia.create({
      data: {
        codigo,
        titulo,
        descricao,
        localizacao,
        status: "pendente",
      },
    });

    res.status(201).json({
      message: "Denúncia registrada com sucesso!",
      codigo: denuncia.codigo, // O usuario recebe o código
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar denúncia" });
  }
});

// Consulta denúncia pelo código
router.get("/consulta/:codigo", async (req, res) => {
  const { codigo } = req.params;

  try {
    const denuncia = await prisma.denuncia.findUnique({
      where: { codigo },
      select: {
        descricao: true,
        localizacao: true,
        status: true,
      },
    });

    if (!denuncia) {
      return res.status(404).json({ error: "Denúncia não encontrada" });
    }

    res.json(denuncia);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar denúncia" });
  }
});

module.exports = router;
