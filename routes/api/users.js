const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/users");
const guard = require("../../middlewares/guard");

router.get("/current", express.json(), guard, ctrl.getCurrentUserData);

module.exports = router;
