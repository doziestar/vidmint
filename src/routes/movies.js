const c = require("config");
const express = require("express");
const Joi = require("joi");
const Movie = require("../models/movie");
const validateMovie = require("../validators/movie");

const router = express.Router();

router.get("/", (req, res) => {
  const movies = Movie.find().sort({ title: 1 });
  res.send(movies);
});

router.post("/", (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const movie = new Movie({
    title: req.body.title,
    description: req.body.description,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  try {
    movie.save();
    res.send(movie);
  } catch (err) {
    res.status(400).send(err);
  }
  res.send(movie);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");
  res.sendStatus(204);
});

router.put("/:id", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");
  res.send(movie);
});

module.exports = router;
