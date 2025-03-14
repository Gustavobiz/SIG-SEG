require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("SIG-SEG API funcionando!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const denunciasRoutes = require("./routes/denuncias");
app.use("/denuncias", denunciasRoutes);

const ocorrenciasRoutes = require("./routes/ocorrencias");
app.use("/ocorrencias", ocorrenciasRoutes);

const notificacoesRoutes = require("./routes/notificacoes");
app.use("/notificacoes", notificacoesRoutes);
