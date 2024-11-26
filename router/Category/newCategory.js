const express = require("express");
const Category = require("../../models/Category");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
});

module.exports = { newCategoryRouter: router };
