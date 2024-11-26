const express = require("express");
const { body } = require("express-validator");
const upload = require("../../middleware/multer");

const Recipes = require("../../models/Recipes");
const Ingredients = require("../../models/Ingredient");
const Category = require("../../models/Category");
const { requireAuth, validateRequest } = require("../../middleware");

const router = express.Router();

// Validators
const validators = [
  body("name").notEmpty().withMessage("Recipe name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("category").notEmpty().withMessage("Category ID is required"),
  //   body("ingredients")
  //     .isArray({ min: 1 })
  //     .withMessage("At least one ingredient is required"),
];

router.post(
  "/",
  requireAuth,
  upload.single("image"),
  validators,
  validateRequest,
  async (req, res) => {
    try {
      const { name, description, category } = req.body;
      let { ingredients } = req.body;

      if (typeof ingredients === "string") {
        try {
          ingredients = JSON.parse(ingredients);
        } catch (err) {
          return res.status(400).json({
            message: "Ingredients must be a valid JSON array",
          });
        }
      }

      if (!Array.isArray(ingredients) || ingredients.length === 0) {
        return res
          .status(400)
          .json({ message: "At least one ingredient is required" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

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

      const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.path}`;

      const newRecipe = new Recipes({
        name,
        description,
        image: imageUrl,
        author: req.user.id,
        category,
        ingredients,
      });

      await newRecipe.save();

      categoryDoc.recipes.push(newRecipe._id);
      await categoryDoc.save();

      const populatedRecipe = await Recipes.findById(newRecipe._id)
        .populate("author", "-password -__v")
        .populate("category", "name")
        .populate("ingredients", "name");

      res.status(201).json(populatedRecipe);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = { recipeCreateRouter: router };
