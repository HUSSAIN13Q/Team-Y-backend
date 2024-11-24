const { model, Schema } = require("mongoose");

const CatagorySchema = new Schema({
  name: { type: String, required: true },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipes",
    },
  ],
});

module.exports = model("Catagory", CatagorySchema);
