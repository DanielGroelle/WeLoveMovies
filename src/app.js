if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const notFound = require("./errors/notFound");
const unknownError = require("./errors/unknownError");

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

//allows for cross origin requests for every route
app.use(cors());

//allows us to send back json data
app.use(express.json());

//main routes
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

//error handlers
app.use(notFound);
app.use(unknownError);

module.exports = app;