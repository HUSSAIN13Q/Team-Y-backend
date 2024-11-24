const { model, Schema } = require("mongoose");

const IngredienrsSchema = new Schema({
  name: { type: String, required: true },

  recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipes",
    },
  ],
});

module.exports = model("Ingredienrs", IngredienrsSchema);
