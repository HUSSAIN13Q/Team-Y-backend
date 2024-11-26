const express = require("express");
const morgan = require("morgan");
var cors = require("cors");

const { handleErrors, currentUser } = require("./middleware");
const { NotFoundError } = require("./errors");

const { authRouter } = require("./router/User");
// const { postsRouter } = require("./routes/posts");
const { RecipesRouter } = require("./router/Recipes");

const app = express();
app.use(cors());
/**
 * Middleware
 */
app.use(express.json());
app.use(morgan("dev"));
app.use(currentUser);

/**
 * Routers
 */
app.use("/auth", authRouter);
app.use("/recipe", RecipesRouter);

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
