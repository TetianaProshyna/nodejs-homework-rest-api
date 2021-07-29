const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const { validUserData } = require("../../middlewares/validate/user");
const guard = require("../../middlewares/guard");

router.post("/register", express.json(), validUserData, ctrl.register);
router.post("/login", express.json(), validUserData, ctrl.login);
router.get("/logout", guard, ctrl.logout);

module.exports = router;
