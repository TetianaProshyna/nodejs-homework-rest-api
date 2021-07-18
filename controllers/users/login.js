const User = require("../../model/user");
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Неверный email или пароль",
    });
    return;
  }
  const token = "gffhhjklkpplplpl.gyjojufvdxdesesg.hftdrdrygui";
  res.json({
    status: "success",
    code: 200,
    data: {
      result: token,
    },
  });
};
module.exports = login;
