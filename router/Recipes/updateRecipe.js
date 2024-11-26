const express = require("express");

const findRecipe = require("./findRecipe");
const validateRequest = require("../../middleware/validateRequest");
const { body } = require("express-validator");
const { requireAuth } = require("../../middleware");
const Ingredients = require("../../models/Ingredients");
const Category = require("../../models/Category");

const validators = [
  body("name").not().notEmpty().withMessage("Name is required"),
  body("description").not().notEmpty().withMessage("Description is required"),
  body("image").not().notEmpty().withMessage("Image URL is required"),
  body("category").not().notEmpty().withMessage("Category ID is required"),
  body("ingredients")
    .not()
    .isArray()
    .withMessage("Ingredients must be an array of IDs"),
];

const router = express.Router();

router.param("id", findRecipe);

router.put(
  "/:id",
  requireAuth,
  validators,
  validateRequest,
  async (req, res, next) => {
    const { user, recipe } = req;
    const { name, description, image, category, ingredients } = req.body;

    try {
      if (recipe.author.id.toString("hex") !== user.id.toString()) {
        // return next(new Error("You are not authorized to edit this recipe"));
        return next(NotAuthorizedError("who are you"));
      }

      if (name) recipe.name = name;
      if (description) recipe.description = description;
      if (image) recipe.image = image;

      if (category) {
        const categoryDoc = await Category.findById(category);
        if (!categoryDoc) {
          return res.status(404).json({ message: "Category not found" });
        }
        recipe.category = category;

        // Add the recipe to the new category if it's different
        if (!categoryDoc.recipes.includes(recipe._id)) {
          categoryDoc.recipes.push(recipe._id);
          await categoryDoc.save();
        }
      }

      // Update ingredients if provided
      if (ingredients) {
        const ingredientDocs = await Ingredients.find({
          _id: { $in: ingredients },
        });
        if (ingredientDocs.length !== ingredients.length) {
          return res
            .status(404)
            .json({ message: "Some ingredients not found" });
        }
        recipe.ingredients = ingredients;
      }

      await recipe.save();

      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = { recipeUpdateRouter: router };
