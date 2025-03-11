const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { verificarToken, verificarServidor } = require("../middlewares/authMiddleware");

const prisma = new PrismaClient();
const router = express.Router();

// Criar ocorrência a partir de uma denúncia (apenas servidores)
router.post("/criar", verificarToken, verificarServidor, async (req, res) => {
  const { denunciaId } = req.body;
  const servidorId = req.user.userId; // ID do servidor autenticado

  try {
    // Verifica a existência da denuncia
    const denuncia = await prisma.denuncia.findUnique({ where: { id: denunciaId } });

    if (!denuncia) {
      return res.status(404).json({ error: "Denúncia não encontrada" });
    }
