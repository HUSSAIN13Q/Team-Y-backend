const express = require("express");
const Ingredient = require("../../models/Ingredient");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allIngredients = await Ingredient.find();
    res.status(200).json(allIngredients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ingredients", error });
  }
});

module.exports = { allIngredientsRouter: router };
