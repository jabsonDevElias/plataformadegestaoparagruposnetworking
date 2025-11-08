const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//MODELS
const Intentions = require("../models/Intentions");

const { Op } = require("sequelize");

// CADASTRO DE INTENÇÃO

// intentions**: id, name, email, phone, message, status

const insertIntentions = async (req, res) => {
  const { name, email, phone, message } = req.body;
  const novaIntencao = await User.create({ name, email, phone, message });
  res.json({ message: "Intenção registrada com Sucesso!" });
};

// LISTAGEM DE INTENÇÃO

const listIntentions = async (req, res) => {
  try {

    const { id, idUser } = req.body;

    if (id) {
        
      const intencoes = await Intentions.findByPk(id);

      if (!intencoes) {
        return res.status(404).json({ message: "Intenção não encontrada" });
      }

      return res.json(intencoes);
    }

    const intencoes = await Intentions.findAll({
      where: { status: { [Op.ne]: false }, idUser: idUser },
    });
    res.json(intencoes);
  } catch (error) {
    console.error("Erro ao listar intenções:", error);
    res.status(500).json({ message: "Erro ao listar intenções:" });
  }
};

module.exports = { insertIntentions, listIntentions };
