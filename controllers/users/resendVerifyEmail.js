const User = require("../../model/user");
const sendEmail = require("../../services/sendEmail");
const verifyEmailSchema = require("../../middlewares/validate/email");
const resendVerifyEmail = async (req, res, next) => {
  const { error } = verifyEmailSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "missing required field email",
    });
  }

  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { verify, verificationToken } = user;

      if (verify) {
        return res.status(400).json({
          message: "Verification has already been passed",
        });
      }

      try {
        sendEmail(email, verificationToken);
      } catch {
        return res.status(503).json({
          message:
            "Service unavailable. Verification email could not be delivered",
        });
      }

      return res.json({
        message: "Verification email sent",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = resendVerifyEmail;
