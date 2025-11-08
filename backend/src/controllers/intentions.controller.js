const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//MODELS
const Intentions = require("../models/Intentions");

const { Op } = require("sequelize");

// CADASTRO DE MEMBROS

// intentions**: id, name, email, phone, message, status

const insertIntentions = async (req, res) => {
  const { name,email,phone,message} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const novoUsuario = await User.create({ nome,email,password: hashedPassword });
  res.json({ message: "Membro registrado com Sucesso!" });
};


module.exports = { login };
