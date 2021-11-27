const mongoose = require("mongoose");
const express = require("express");
const movies = require("./src/routes/movies");
const pages = require("./src/routes/pages");
const users = require("./src/routes/users");
const genres = require("./src/routes/genres");

const app = express();

app.use(express.json());
app.use("/api/movies", movies);
app.use("/api/users", users);
app.use("/api/blog", pages);
app.use("/api/genres", genres);

mongoose
  .connect("mongodb://localhost:27017/vidmint")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
