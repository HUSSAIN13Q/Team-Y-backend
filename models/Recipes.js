const { model, Schema } = require("mongoose");

const RecipesSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },

  author: { type: Schema.Types.ObjectId, ref: "User" },
  category: { type: Schema.Types.ObjectId, ref: "Category" },

  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredients",
    },
  ],
});

module.exports = model("Recipes", RecipesSchema);
