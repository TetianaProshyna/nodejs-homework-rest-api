const Contact = require("../../model/contact");
const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user.id;
  try {
    const result = await Contact.findOne({
      _id: contactId,
      owner: userId,
    }).populate({
      path: "owner",
      select: "email subscription",
    });
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
module.exports = getContactById;
