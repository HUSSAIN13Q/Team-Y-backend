const express = require("express");
const { newIngredientRouter } = require("./newIngredient");
const { allIngredientsRouter } = require("./allIngredients");

const router = express.Router();

router.use(newIngredientRouter);
router.use(allIngredientsRouter);

module.exports = { ingredientRouter: router };
