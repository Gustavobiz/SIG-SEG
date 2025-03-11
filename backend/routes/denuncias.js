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

module.exports = router;
