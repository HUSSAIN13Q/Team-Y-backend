router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const newIngredient = new Ingredient({ name });
    await newIngredient.save();
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(500).json({ message: "Error creating ingredient", error });
  }
});

module.exports = router;
