const rateLimit = require("express-rate-limit");
const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 2,
  handler: (req, res, next) => {
    return res.status(429).json({
      status: "error",
      code: 429,
      message: "Too many registrations per hour, try again later",
    });
  },
});
module.exports = createAccountLimiter;
