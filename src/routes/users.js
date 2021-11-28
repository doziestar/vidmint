const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const checkToken = require("../middleware/auth");

const { User, validate } = require("../models/users");

const router = express.Router();

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
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "username", "email"]));
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

// get user info
router.get("/me", checkToken, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

module.exports = router;
