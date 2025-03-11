const express = require("express");
const { PrismaClient } = require("@prisma/client");
const {
  verificarToken,
  verificarServidor,
} = require("../middlewares/authMiddleware");

const prisma = new PrismaClient();
const router = express.Router();

// Criar ocorrência usando uma denúncia
router.post("/criar", verificarToken, verificarServidor, async (req, res) => {
  const { denunciaId } = req.body;
  const servidorId = req.user.userId;

  try {
    // Verifica a existência da denuncia
    const denuncia = await prisma.denuncia.findUnique({
      where: { id: denunciaId },
    });

    if (!denuncia) {
      return res.status(404).json({ error: "Denúncia não encontrada" });
    }

    // Cria ocorrência
    const ocorrencia = await prisma.ocorrencia.create({
      data: {
        denunciaId,
        servidorId,
        status: "aberta",
      },
    });

    await prisma.denuncia.update({
      where: { id: denunciaId },
      data: { status: "em análise" },
    });

    res.status(201).json({ message: "Ocorrência registrada!", ocorrencia });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar ocorrência" });
  }
});

// Atualiza status da ocorrência
router.put(
  "/atualizar/:id",
  verificarToken,
  verificarServidor,
  async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const ocorrencia = await prisma.ocorrencia.update({
        where: { id },
        data: { status },
      });

      res.json({ message: "Status atualizado!", ocorrencia });
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar ocorrência" });
    }
  }
);

module.exports = router;
