const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  description: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

exports.Movie = Movie;
