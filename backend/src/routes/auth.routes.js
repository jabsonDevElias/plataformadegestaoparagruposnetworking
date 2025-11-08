const express = require("express");
const { login} = require("../controllers/auth.controller");
const { insertIntentions, listIntentions } = require("../controllers/intentions.controller");
const authMiddleware = require("../middlewares/auth.middleware");


const router = express.Router();

// router.post("/cadastrausuario",cadastrausuario);
router.post("/login", login);
router.post("/intentions", insertIntentions);

router.post("/listintentions", authMiddleware, listIntentions);
// router.post("/cadastratarefas", authMiddleware, cadastraTarefas);
// router.post("/finalizartarefas", authMiddleware, finalizarTarefas);
// router.post("/excluirtarefas", authMiddleware, excluirTarefas);


module.exports = router;
