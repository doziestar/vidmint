const express = require("express");
const Joi = require("joi");

router = express.Router();

// app data and schema
const genre = [
  { id: 1, name: "robinhood", year: 2000, producer: "jack smith" },
  { id: 2, name: "robin", year: 2003, producer: "smith" },
  { id: 3, name: "hood", year: 2001, producer: "jack" },
  { id: 4, name: "james bond", year: 2010, producer: "john smith" },
];

const validateSchema = (movie) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
    year: Joi.number().required(),
    producer: Joi.string(),
  });
  return schema.validate(movie);
};

router.get("/", (req, res) => {
  res.send(genre);
});

router.post("/", (req, res) => {
  const { error } = validateSchema(req.body);
  error
    ? res.status(404).send(error.message)
    : genre.push({
        id: genre.length + 1,
        name: req.body.name,
        producer: req.body.producer,
      });
  res.send(genre);
});

router.get("/:id", (req, res) => {
  const movie = genre.find((m) => m.id === parseInt(req.params.id));
  movie ? res.send(movie) : res.status(404).send("movie not found");
});

router.delete("/:id", (req, res) => {
  const movie = genre.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("movie not found");
  genre.splice(genre.indexOf(movie), 1);
  res.send(genre);
});

router.put("/:id", (req, res) => {
  const movie = genre.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("movie not found");
  const { error } = validateSchema(req.body);
  if (error) return res.status(404).send(error.message);
  movie.name = req.body.name;
  movie.year = req.body.year;
  movie.producer = req.body.producer;
  res.send(genre);
});

module.exports = router;
