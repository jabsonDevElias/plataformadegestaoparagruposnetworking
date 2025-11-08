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
  const newIntention = await Intentions.create({ name, email, phone, message });
  res.json({ message: "Intenção registrada com Sucesso!" });
};

// LISTAGEM DE INTENÇÃO

const listIntentions = async (req, res) => {
  try {
    
    const { id } = req.params;

    if (id) {
      const intention = await Intentions.findByPk(id);

      if (!intention) {
        return res.status(404).json({ message: "Intenção não encontrada" });
      }

      return res.json(intention);
    }

    const intentions = await Intentions.findAll({
      where: { status: "true" }
    });

    return res.json(intentions);
  } catch (error) {
    console.error("Erro ao listar intenções:", error);
    return res.status(500).json({ message: "Erro ao listar intenções" });
  }
};


module.exports = { insertIntentions, listIntentions };
