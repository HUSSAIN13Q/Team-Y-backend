const express = require("express");
const morgan = require("morgan");
var cors = require("cors");

const { handleErrors, currentUser } = require("./middleware");
const { NotFoundError } = require("./errors");

const { authRouter } = require("./router/User");
const { recipesRouter } = require("./router/Recipes");
const { ingredientRouter } = require("./router/Ingredients");
const { categoryRouter } = require("./router/Category");

const app = express();
app.use(cors());
/**
 * Middleware
 */
app.use(express.json());
app.use(morgan("dev"));
app.use(currentUser);

/*
 * Routers
 */
app.use("/auth", authRouter);
app.use("/recipe", recipesRouter);
app.use("/ingredient", ingredientRouter);
app.use("/category", categoryRouter);
/**
 * Not Found Catchall
 */
app.all("*", (req) => {
  throw NotFoundError(`${req.method} ${req.url}: Route not found`);
});

/**
 * Error Handling
 */
// app.use(handleErrors);

module.exports = app;
