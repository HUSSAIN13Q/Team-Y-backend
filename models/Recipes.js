const { model, Schema } = require("mongoose");

const RecipesSchema = new Schema({
  name: { type: String, required: true },
  Descrotion: { type: String, required: true },
  Image: { type: String, required: true },

  author: { type: Schema.Types.ObjectId, ref: "User" },
  Catagory: { type: Schema.Types.ObjectId, ref: "Catagory" },

  ingredienrs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredienrs",
    },
  ],
});

module.exports = model("Recipes", RecipesSchema);
