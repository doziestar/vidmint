const Joi = require("joi");

function validateBlog(blog) {
  const schema = {
    title: Joi.string().min(3).required(),
    content: Joi.string().min(3).required(),
    image: Joi.string().min(3).required(),
    category: Joi.string().min(3).required(),
    slug: Joi.string().min(3).required(),
  };
  return schema.validate(blog);
}

exports.validateBlog = validateBlog;
