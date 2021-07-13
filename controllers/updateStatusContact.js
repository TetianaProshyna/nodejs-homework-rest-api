const Contact = require("../model/contact");
const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  // if (!body?.favorite) {
  //   res.status(400).json({ message: "missing field favorite" });
  //   return;
  // }
  try {
    const result = await Contact.findByIdAndUpdate(
      { _id: contactId },
      { favorite: !body.favorite },
      {
        new: true,
      }
    );
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
module.exports = updateStatusContact;
