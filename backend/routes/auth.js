const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    console.log("🔹 Dados recebidos no backend:", req.body);

    const { nome, email, senha, nivel } = req.body;

    if (!nome || !email || !senha || !nivel) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }
    const nivelUsuario = nivel || "publico";

    const userExists = await prisma.usuario.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

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
    console.error("Erro no cadastro:", error);
    res.status(500).json({ error: "Erro no servidor ao registrar usuário." });
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
    { userId: user.id, nivel: user.nivel }, // ✅ Adicionando 'nivel' no token
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  console.log("🔹 Enviando resposta do backend:", { token, nivel: user.nivel }); // 🔹 Verifique isso no terminal

  res.json({ token, nivel: user.nivel });
});

module.exports = router;
