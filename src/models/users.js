const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
    maxLength: 1024,
  },
});
const User = mongoose.model("User", UserSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(255).required(),
    phone: Joi.string().min(3).max(255),
    email: Joi.string().min(3).max(255).required(),
    isGold: Joi.boolean(),
    address: Joi.string().min(3).max(255),
    isAdmin: Joi.boolean().default(false),
    password: passwordComplexity({
      min: 8,
      max: 30,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 2,
    }),
    username: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(user);
};

module.exports.User = User;
module.exports.validate = validateUser;
