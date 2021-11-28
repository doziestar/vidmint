const express = require("express");
const { Genre, validateGenre } = require("../models/movie");
const checkToken = require("../middleware/auth");

const router = express.Router();

// GET /api/genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  res.send(genres);
});

// POST /api/genres
router.post("/", checkToken, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

// PUT /api/genres/:id
router.put("/:id", checkToken, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

module.exports = router;
