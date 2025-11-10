const Intentions = require("../models/Intentions");
const Invitations = require("../models/Invitations");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//CADASTRA O CONVITE

const insertInvitation = async (req, res) => {
  const { id } = req.params;
  try {
    const intention = await Intentions.findByPk(id);

    const token = jwt.sign(
      { id: intention.id, name: intention.name },
      process.env.TOKEN_INVITATION
    );

    const passwordHash = await bcrypt.hash(token, 10);

    const hoje = new Date();
    const date_expires = new Date(hoje);
    date_expires.setDate(hoje.getDate() + 5);

    const newInvitation = await Invitations.create({
      intention_id: intention.id,
      token: passwordHash,
      expires_at: date_expires,
      used: true,
    });

    res.json({ message: "Convite registrado com Sucesso!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao listar intenções" + error });
  }
};

module.exports = { insertInvitation };
