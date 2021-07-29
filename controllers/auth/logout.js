const User = require("../../model/user");
const logout = async (req, res, next) => {
  const id = req.user.id;
  const result = await User.updateOne({ _id: id }, { token: null });
  console.log(result);
  res.status(204).json({
    status: 204,
  });
};
module.exports = logout;
