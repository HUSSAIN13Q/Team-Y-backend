const express = require("express");
const { body } = require("express-validator");

const Recipes = require("../../models/Recipes");
const Ingredients = require("../../models/Ingredient");
const Category = require("../../models/Catagory");
const User = require("../../models/User");

const { requireAuth, validateRequest } = require("../../middleware");

const router = express.Router();

const validators = [
  body("name").notEmpty().withMessage("Recipe name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("image").notEmpty().withMessage("Image URL is required"),
  body("category").notEmpty().withMessage("Category ID is required"),
  body("ingredients")
    .isArray({ min: 1 })
    .withMessage("At least one ingredient is required"),
];

router.post("/", requireAuth, validators, validateRequest, async (req, res) => {
  try {
    const { name, description, image, category, ingredients } = req.body;

    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return res.status(404).json({ message: "Category not found" });
    }

    const ingredientDocs = await Ingredients.find({
      _id: { $in: ingredients },
    });
    if (ingredientDocs.length !== ingredients.length) {
      return res.status(404).json({ message: "Some ingredients not found" });
    }

    const newRecipe = new Recipes({
      name,
      description,
      image,
      author: req.user.id,
      category,
      ingredients,
    });

    await newRecipe.save();

    categoryDoc.recipes.push(newRecipe._id);
    await categoryDoc.save();

    const populatedRecipe = await newRecipe
      .populate("author", "-password -__v")
      .populate("category", "name")
      .populate("ingredients", "name")
      .exec();

    res.status(201).json(populatedRecipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { recipeCreateRouter: router };
