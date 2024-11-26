const express = require("express");

const { allRecipesRouter } = require("./allRecipes");
const { getRecipesRouter } = require("./getRecipe");
const { recipeCreateRouter } = require("./createRecipe");
const { recipeUpdateRouter } = require("./updateRecipe");

const router = express.Router();
router.use(allRecipesRouter);
router.use(getRecipesRouter);
router.use(recipeCreateRouter);
router.use(recipeUpdateRouter);

module.exports = { recipesRouter: router };
