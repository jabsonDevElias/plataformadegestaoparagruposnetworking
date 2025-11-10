const Members = require("../models/Members");
const bcrypt = require("bcryptjs");

const insertMembers = async (req, res) => {
  const { name, email, password, phone} = req.body;
  try {

    const passwordHash = await bcrypt.hash(password, 10);

    const newInvitation = await Members.create({
      name: name,
      email: email,
      password: passwordHash,
      phone: phone,
      role: "member",
      status: "active",
    });

    res.json({ mensagem: "Membro Cadastrado com Sucesso!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao cadastra Membro" + error });
  }
};

module.exports = { insertMembers };

