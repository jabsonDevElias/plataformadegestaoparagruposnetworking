const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Members = require("../models/Members");

const { Op } = require("sequelize");

const generateToken = (member) => {
  return jwt.sign({ email: member.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};


// CADASTRO DE MEMBROS

// const insertMembers = async (req, res) => {
//   const { email, password,nome } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const novoUsuario = await User.create({ nome,email,password: hashedPassword });
//   res.json({ message: "Membro registrado com Sucesso!" });
// };

// LOGIN

const login = async (req, res) => {

  const { email, password } = req.body;

  try {
    const members = await Members.findOne({ where: { email } });

    if (!members) {
      return res.status(401).json({ message: "Membro não encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, members.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const token = generateToken(members);

    res.json({
      token
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = { login };
