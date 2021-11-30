const express = require("express");
const movies = require("../routes/movies");
const pages = require("../routes/pages");
const users = require("../routes/users");
const genres = require("../routes/genres");
const auth = require("../routes/auth");
const error = require("../middleware/errors");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/movies", movies);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/blog", pages);
  app.use("/api/genres", genres);
  app.use(error);
};
