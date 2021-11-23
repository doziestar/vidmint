const express = require("express");
const User = require("../models/users");
const userValidator = require("../validators/users");

const router = express.Router();

// create a new user
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
