const Joi = require("joi");

function userValidator(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    isGold: Joi.boolean().required(),
    phone: Joi.string().required(),
  });
  return schema.validate(user);
}

module.exports = userValidator;
