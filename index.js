require("express-async-errors");
const winston = require("winston");
const error = require("./src/middleware/errors");
const mongoose = require("mongoose");
const express = require("express");
const movies = require("./src/routes/movies");
const pages = require("./src/routes/pages");
const users = require("./src/routes/users");
const genres = require("./src/routes/genres");
const auth = require("./src/routes/auth");
const config = require("config");

const app = express();

// winston.handleExceptions(
//   new winston.transports.Console({ colorize: true, prettyPrint: true })
// );

winston.exceptions.handle(
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);

process.on("uncaughtException", (ex) => {
  console.log(ex);
  winston.error("something is wrong");
  process.exit(1);
});

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

// winston.add(new winston.transports.File(), { filename: "logs/error.log" });

app.use(express.json());
app.use("/api/movies", movies);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/blog", pages);
app.use("/api/genres", genres);
app.use(error);

mongoose
  .connect("mongodb://localhost:27017/vidmint")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
