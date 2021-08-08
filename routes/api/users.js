const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/users");
const guard = require("../../middlewares/guard");
const uploadAvatar = require("../../middlewares/uploadAvatar");

router.get("/current", express.json(), guard, ctrl.getCurrentUserData);
router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post("/verify", ctrl.resendVerifyEmail);
router.patch(
  "/avatar",
  guard,
  uploadAvatar.single("avatar"),
  ctrl.changeAvatar
);

module.exports = router;
