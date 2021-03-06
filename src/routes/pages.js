const express = require("express");
const validateBlog = require("../validators/pages");
const Blog = require("../models/pages");
const checkToken = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.send(blogs);
});

router.post("/", checkToken, async (req, res) => {
  const { error } = validateBlog(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    description: req.body.description,
    image: req.body.image,
    slug: req.body.slug,
  });

  try {
    blog = await blog.save();
    res.send(201);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:slug", async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog)
    return res.status(404).send("The blog with the given slug was not found.");
  res.send(blog);
});

router.put("/:slug", checkToken, async (req, res) => {
  const { error } = validateBlog(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const blog = await Blog.findOneAndUpdate(req.params.slug, req.body, {
    new: true,
  });
  if (!blog)
    return res.status(404).send("The blog with the given slug was not found.");
  res.send(blog);
});

router.delete("/:slug", checkToken, async (req, res) => {
  const blog = await Blog.findOneAndDelete({ slug: req.params.slug });
  if (!blog)
    return res.status(404).send("The blog with the given slug was not found.");
  res.sendStatus(204);
});

module.exports = router;
