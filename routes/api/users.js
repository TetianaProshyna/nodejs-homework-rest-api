const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/users");

router.post("/register", express.json(), ctrl.register);
router.post("/login", express.json(), ctrl.login);
// router.get("/logout", ctrl.logout);

module.exports = router;
