const express = require("express");

const { allRecipesRouter } = require("./allRecipes");
const { getRecipesRouter } = require("./getRecipe");

const router = express.Router();
router.use(allRecipesRouter);
router.use(getRecipesRouter);

module.exports = { RecipesRouter: router };
