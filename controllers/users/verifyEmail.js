const User = require("../../model/user");

const verifyEmail = async (req, res, next) => {
  try {
    const result = await User.findOne(req.params);
    if (result) {
      await User.findByIdAndUpdate(result._id, {
        verify: true,
        verifyToken: null,
      });
      return res.json({
        message: "Verification successful",
      });
    }
    return res.status(404).json({
      message: "User not found",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = verifyEmail;
