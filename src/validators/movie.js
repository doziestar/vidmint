const Joi = require("joi");

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(3).max(50).required(),
    // genreId: Joi.number().integer().min(1).required(),
    description: Joi.string().min(3).max(500).required(),
    numberInStock: Joi.number().integer().min(0).required(),
    dailyRentalRate: Joi.number().min(0).max(10).required(),
  };

  return Joi.validate(movie, schema);
}

exports.validate = validateMovie;
