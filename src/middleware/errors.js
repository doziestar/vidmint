const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.error(err.stack);
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Invalid token");
  } else {
    res.status(500).send("Internal server error");
  }
};

//log errors
function logErrors(err, req, res, next) {
  winston.error(err.stack);
  next(err);
}
