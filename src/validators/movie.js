const Joi = require("joi");

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    // genreId: Joi.number().integer().min(1).required(),
    description: Joi.string().min(3).max(500).required(),
    numberInStock: Joi.number().integer().min(0).required(),
    dailyRentalRate: Joi.number().min(0).max(10).required(),
  });

  return schema.validate(movie);
}

module.exports = validateMovie;
