require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const sequelize = require("./config/db");
const createAdmin = require("./seed/MembersSeed");

const app = express();
app.use(express.json());
app.use(cors());

sequelize
  .sync({ force: false })
  .then(() => console.log("Banco de dados sincronizado!"))
  .catch((err) => console.error("Erro ao sincronizar DB:", err));

//CRIAR O USUÁRIO ADMIN PADRÃO

(async () => {
  await createAdmin();
})();

app.use("/api/", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
