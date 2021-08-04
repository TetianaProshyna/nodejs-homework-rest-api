const Joi = require("joi");
const userSchema = Joi.object({
  email: Joi.string().min(3).required().email(),
  password: Joi.string().min(6).required(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    return next({
      status: "error",
      code: 400,
      message: error.message,
    });
  }
  next();
};

module.exports.validUserData = (req, res, next) => {
  return validate(userSchema, req.body, next);
};
