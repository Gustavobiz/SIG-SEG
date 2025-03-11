const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Acesso negado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Token inválido" });
  }
}

function verificarServidor(req, res, next) {
  verificarToken(req, res, () => {
    if (req.user.nivel !== "servidor") {
      return res.status(403).json({ error: "Acesso restrito a servidores" });
    }
    next();
  });
}

module.exports = { verificarToken, verificarServidor };
