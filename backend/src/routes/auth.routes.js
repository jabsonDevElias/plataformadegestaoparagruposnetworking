const express = require("express");
const { login} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// router.post("/cadastrausuario",cadastrausuario);
router.post("/login", login);

// router.post("/listarTarefas", authMiddleware, listarTarefas);
// router.post("/cadastratarefas", authMiddleware, cadastraTarefas);
// router.post("/finalizartarefas", authMiddleware, finalizarTarefas);
// router.post("/excluirtarefas", authMiddleware, excluirTarefas);


module.exports = router;
