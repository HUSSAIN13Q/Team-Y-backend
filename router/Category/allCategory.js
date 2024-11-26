const express = require("express");
const Category = require("../../models/Category");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().populate(
      "recipes",
      "name description"
    );
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
});

module.exports = { allCategoryRouter: router };
