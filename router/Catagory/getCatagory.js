router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "recipes",
      "name"
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
});

module.exports = router;
