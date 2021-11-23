const Joi = require("joi");

function validateBlog(blog) {
  const blogSchema = Joi.object({
    title: Joi.string().min(3).required(),
    content: Joi.string().min(3).required(),
    image: Joi.string().min(3).required(),
    category: Joi.array(),
    slug: Joi.string().min(3).required(),
  });
  return blogSchema.validate(blog);
}

module.exports = validateBlog;
