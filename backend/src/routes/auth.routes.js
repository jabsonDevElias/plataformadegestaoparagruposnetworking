const express = require("express");
const { login } = require("../controllers/auth.controller");
const {
  insertIntentions,
  listIntentions,
  deleteIntentions,
} = require("../controllers/intentions.controller");
const { insertInvitation } = require("../controllers/invitations.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/login", login);
router.post("/intentions", insertIntentions);

router.get("/listintentions/:id?", authMiddleware, listIntentions);
router.delete("/intentions/:id?", authMiddleware, deleteIntentions);

router.post("/invitations/:id?", authMiddleware, insertInvitation);

module.exports = router;
