const User = require("../../model/user");
const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await User.findOne({ email });
    if (result) {
      res.status(409).json({
        status: "error",
        code: 409,
        message: "Already register",
      });
      return;
    }

    const newUser = new User({ email });
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
