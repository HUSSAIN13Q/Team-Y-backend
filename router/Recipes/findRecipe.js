const { NotFoundError } = require("../../errors");
const Recipes = require("../../models/Recipes");

const findRecipes = async function (req, res, next, id) {
  const findRecipe = await Recipes.findById(id);

  if (!findRecipe) return next(NotFoundError("Post not found"));

  req.recipe = findRecipe;

  next();
};

module.exports = findRecipes;
