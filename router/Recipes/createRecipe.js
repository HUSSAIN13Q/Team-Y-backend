const express = require("express");
const { body } = require("express-validator");

const Recipes = require("../../models/Recipes");
const User = require("../../models/User");

const { requireAuth, validateRequest } = require("../../middleware");

const router = express.Router();

const validators = [
  body("name").not().isEmpty().withMessage("Title is required"),
  body("content").not().isEmpty().withMessage("Content is required"),
];

router.post("/", requireAuth, validators, validateRequest, async (req, res) => {
  const newPost = await Post.create(req.body);

  const author = await User.findById(req.user.id);

  newPost.author = author.id;

  author.posts.push(newPost.id);

  await newPost.save();
  await author.save();

  res
    .status(201)
    .json(await newPost.populate("author", "-password -__v -posts"));
});

module.exports = { postCreateRouter: router };
