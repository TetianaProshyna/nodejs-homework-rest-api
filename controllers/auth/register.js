const User = require("../../model/user");
const { nanoid } = require("nanoid");
const sendEmail = require("../../services/sendEmail");
const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await User.findOne({ email });
    if (result) {
      res.status(409).json({
        status: "error",
        code: 409,
        message: "Email in use",
      });
      return;
    }
    const verificationToken = nanoid(10);
    try {
      sendEmail(email, verificationToken);
    } catch {
      return res.status(503).json({
        message: "Service unavailable",
      });
    }

    const newUser = new User({ email, verificationToken });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      message: "success",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = register;
