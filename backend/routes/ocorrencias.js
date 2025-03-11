const express = require("express");
const { PrismaClient } = require("@prisma/client");
const {
  verificarToken,
  verificarServidor,
} = require("../middlewares/authMiddleware");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/criar", verificarToken, verificarServidor, async (req, res) => {
  const { denunciaId } = req.body;
  const servidorId = req.user.userId; // ID do servidor autenticado

  try {
    // Verifica se a denúncia existe
    const denuncia = await prisma.denuncia.findUnique({
      where: { id: denunciaId },
      select: { titulo: true, cidade: true, estado: true }, // Novos campos
    });

    if (!denuncia) {
      return res.status(404).json({ error: "Denúncia não encontrada" });
    }

    // Criar ocorrência associada à denúncia
    const ocorrencia = await prisma.ocorrencia.create({
      data: {
        denunciaId,
        servidorId,
        status: "aberta",
      },
    });

    // Atualizar status da denúncia
    await prisma.denuncia.update({
      where: { id: denunciaId },
      data: { status: "em análise" },
    });

    res.status(201).json({
      message: "Ocorrência registrada!",
      ocorrencia,
      titulo: denuncia.titulo,
      cidade: denuncia.cidade,
      estado: denuncia.estado,
    });
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

// Listar todas as ocorrências (somente servidores autenticados)
router.get("/todas", verificarToken, verificarServidor, async (req, res) => {
  try {
    const ocorrencias = await prisma.ocorrencia.findMany({
      include: {
        denuncia: true, // Para trazer detalhes da denúncia associada
        servidor: true, // Para trazer detalhes do servidor responsável
      },
    });

    res.json(ocorrencias);
  } catch (error) {
    console.error("Erro ao listar ocorrências:", error);
    res.status(500).json({ error: "Erro ao listar ocorrências" });
  }
});

module.exports = router;
