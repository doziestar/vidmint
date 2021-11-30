const mongoose = require("mongoose");
const winston = require("winston");
const logger = require("../startups/logging");

// Connect to the database
module.exports = () => {
  mongoose
    .connect("mongodb://localhost:27017/vidmint")
    .then(() => logger.info("Connected to MongoDB"));
};
