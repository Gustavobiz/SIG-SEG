const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { verificarToken } = require("../middlewares/authMiddleware");

const prisma = new PrismaClient();
const router = express.Router();

// Criar notificação para um usuário
router.post("/criar", verificarToken, async (req, res) => {
  const { usuarioId, mensagem } = req.body;

  try {
    const notificacao = await prisma.notificacao.create({
      data: { usuarioId, mensagem },
    });

    res.status(201).json({ message: "Notificação enviada!", notificacao });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar notificação" });
  }
});

// Listar notificações do usuário autenticado
router.get("/minhas", verificarToken, async (req, res) => {
  try {
    const notificacoes = await prisma.notificacao.findMany({
      where: { usuarioId: req.user.userId },
      orderBy: { data_envio: "desc" },
    });

    res.json(notificacoes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar notificações" });
  }
});

module.exports = router;
