const express = require("express");
const Joi = require("joi");

const app = express();

app.use(express.json());

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

app.get("/", (req, res) => {
  res.send(genre);
});

app.post("/api/genre", (req, res) => {
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

app.get("/api/genre/:id", (req, res) => {
  const movie = genre.find((m) => m.id === parseInt(req.params.id));
  movie ? res.send(movie) : res.status(404).send("movie not found");
});

app.delete("/api/genre/:id", (req, res) => {
  const movie = genre.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("movie not found");
  genre.splice(genre.indexOf(movie), 1);
  res.send(genre);
});

app.put("/api/genre/:id", (req, res) => {
  const movie = genre.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("movie not found");
  const { error } = validateSchema(req.body);
  if (error) return res.status(404).send(error.message);
  movie.name = req.body.name;
  movie.year = req.body.year;
  movie.producer = req.body.producer;
  res.send(genre);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
