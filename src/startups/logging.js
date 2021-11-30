require("express-async-errors");
require("winston-mongodb");
const winston = require("winston");

// // Configure the logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
    new winston.transports.Console({
      format: winston.format.simple(),
      colorize: true,
      prettyPrint: true,
    }),
  ],
});

const log = () => {
  winston.exceptions.handle(
    new winston.transports.File({ filename: "logs/uncaughtExceptions.log" })
  );
};

module.exports = logger;
