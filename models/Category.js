const { model, Schema } = require("mongoose");

const CategorySchema = new Schema({
  name: { type: String, required: true },
  recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipes",
    },
  ],
});

module.exports = model("Category", CategorySchema);
