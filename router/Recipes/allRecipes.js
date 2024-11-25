const express = require("express");
const Recipes = require("../../models/Recipes");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const recipes = await Recipes.find();

    res.json(recipes);
  } catch (err) {
    next(err);
  }
});

module.exports = { allRecipesRouter: router };
