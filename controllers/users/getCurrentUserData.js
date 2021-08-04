const User = require("../../model/user");
const getCurrentUserData = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const { email, subscription } = await User.findById(userId);
    res.json({
      status: "success",
      code: 200,
      data: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getCurrentUserData;
