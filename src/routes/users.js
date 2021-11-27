const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { User, validate } = require("../models/users");

const router = express.Router();

// create a new user
// create a new user
router.post("/register", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({
    email: req.body.email,
    username: req.body.username,
  });
  if (user) return res.status(400).send("User already registered.");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    username: req.body.username,
    password: hash,
  });
  await user.save();
  res.send(_.pick(user, ["_id", "username", "email"]));
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
