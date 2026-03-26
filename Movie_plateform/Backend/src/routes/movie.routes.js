const express = require('express');
const MovieRouter = express.Router();
const upload = require("../middleware/upload.middleware")

const MovieController = require("../controllers/movie.controller")


MovieRouter.post("/", upload.fields([
    { name: "movie", maxCount: 1 },
    { name: "cover", maxCount: 1 }
]), MovieController.CreateMovieController);

MovieRouter.get("/", MovieController.GetMoviesController);

MovieRouter.get("/:id", MovieController.GetSingleMovieController);

module.exports = MovieRouter;