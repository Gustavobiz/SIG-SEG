const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/register", async (req, res) => {
  const { nome, email, senha, nivel } = req.body;

  const hashedPassword = await bcrypt.hash(senha, 10);

  try {
    const user = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
        nivel,
      },
    });
    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(400).json({ error: "Erro ao registrar usuário" });
  }
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const user = await prisma.usuario.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Usuário não encontrado" });

  const isValidPassword = await bcrypt.compare(senha, user.senha);
  if (!isValidPassword)
    return res.status(401).json({ error: "Senha inválida" });

  const token = jwt.sign(
    { userId: user.id, nivel: user.nivel },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token, nivel: user.nivel });
});

module.exports = router;
