const express = require("express");

const findRecipes = require("./findRecipe");

const router = express.Router();

router.param("_id", findRecipes);

router.get("/:id", (req, res) => {
  res.status(200).json(req.recipes);
});

module.exports = { getRecipesRouter: router };
