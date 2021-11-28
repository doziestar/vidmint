const jwt = require("jsonwebtoken");

//check if the user is admin
module.exports = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res
      .status(401)
      .send({ error: "You must be an admin to perform this action" });
  }
  next();
};
