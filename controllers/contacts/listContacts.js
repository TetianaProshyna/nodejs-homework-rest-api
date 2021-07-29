const Contact = require("../../model/contact");
const listContacts = async (req, res, next) => {
  try {
    const result = await Contact.find().populate("user", "name");
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
module.exports = listContacts;
