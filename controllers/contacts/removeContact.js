const Contact = require("../../model/contact");
const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user.id;
  try {
    const result = await Contact.findOneAndRemove({
      _id: contactId,
      owner: userId,
    });
    if (!result) {
      throw new Error("Access denied");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = removeContact;
