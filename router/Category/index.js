const express = require("express");
const { newCategoryRouter } = require("./newCategory");
const { allCategoryRouter } = require("./allCategory");
const { getCategoryRouter } = require("./getCategory");

const router = express.Router();

router.use(newCategoryRouter);
router.use(allCategoryRouter);
router.use(getCategoryRouter);
module.exports = { categoryRouter: router };
