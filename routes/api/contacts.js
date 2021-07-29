const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {
  validContactUpdateStatus,
  validContact,
  validContactUpdate,
} = require("../../middlewares/validate/contacts");
const guard = require("../../middlewares/guard");

router.get("/", guard, ctrl.listContacts);

router.get("/:contactId", guard, ctrl.getContactById);

router.post("/", guard, validContact, ctrl.addContact);

router.delete("/:contactId", guard, ctrl.removeContact);

router.patch("/:contactId", guard, validContactUpdate, ctrl.updateContact);
router.patch(
  "/:contactId/favorite",
  guard,
  validContactUpdateStatus,
  ctrl.updateContact
);

module.exports = router;
