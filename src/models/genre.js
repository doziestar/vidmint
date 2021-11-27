const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  // movies: [
  //     {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: "Movie",
  //     }
  // ]
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(genre);
}

const Genre = mongoose.model("Genre", genreSchema);
module.exports = genreSchema;
module.exports = Genre;
module.exports.validateGenre = validateGenre;
