const bcrypt = require("bcryptjs");
const sequelize = require("../config/db");
const Members = require("../models/Members");
require("dotenv").config();

async function createAdmin() {

  const email = process.env.LOGIN_USUARIO_PADRAO;
  const password = process.env.PASSWORD_USUARIO_PADRAO;

  if (!email || !password) {
    console.log("EMAIL_USUARIO_PADRAO ou PASSWORD_USUARIO_PADRAO não definido");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await Members.findOrCreate({
    where: { email },
    defaults: {
      name: "Administrador",
      phone: "000000000",
      role: "admin",
      status: "active",
      password: passwordHash,
    },
  });
}

module.exports = createAdmin;
