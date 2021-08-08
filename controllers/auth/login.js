const User = require("../../model/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

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
  if (!user.verify) {
    return res.status(403).json({
      message: "Email not verified",
    });
  }
  try {
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
    await User.updateOne({ _id: id }, { token });
    res.json({
      status: "success",
      code: 200,
      data: {
        result: token,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = login;
