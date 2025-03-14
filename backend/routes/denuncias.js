const express = require("express");
const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");

const prisma = new PrismaClient();
const router = express.Router();

// Cria nova denúncia
router.post("/nova", async (req, res) => {
  const { titulo, descricao, localizacao, cidade, estado } = req.body;

  // Verifica se os dados estão chegando
  console.log("Recebendo requisição:", req.body);

  // Verifica se todos os campos foram enviados
  if (!titulo || !descricao || !localizacao || !cidade || !estado) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  // Gera um código
  const codigo = crypto.randomBytes(4).toString("hex").toUpperCase();

  try {
    const denuncia = await prisma.denuncia.create({
      data: {
        codigo,
        titulo,
        descricao,
        localizacao,
        cidade,
        estado,
        status: "pendente",
      },
    });

    res.status(201).json({
      message: "Denúncia registrada com sucesso!",
      codigo: denuncia.codigo, // O usuário recebe esse código
    });
  } catch (error) {
    console.error("Erro ao criar denúncia:", error);
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
        titulo: true,
        descricao: true,
        localizacao: true,
        cidade: true,
        estado: true,
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

// Retorna todas as denúncias
router.get("/todas", async (req, res) => {
  try {
    const denuncias = await prisma.denuncia.findMany();
    res.json(denuncias);
  } catch (error) {
    console.error("Erro ao buscar denúncias:", error);
    res.status(500).json({ error: "Erro ao buscar denúncias" });
  }
});

module.exports = router;
