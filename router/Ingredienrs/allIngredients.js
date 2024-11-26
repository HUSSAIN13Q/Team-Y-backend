const express = require("express");
const Ingredient = require("../../models/Ingredients");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ingredients", error });
  }
});

module.exports = router;
