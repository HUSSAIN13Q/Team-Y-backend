const express = require("express");

const Recipes = require("../../models/Recipes");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const recipe = await Recipes.findById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }
  res.status(200).json(recipe);
});

module.exports = { getRecipesRouter: router };
