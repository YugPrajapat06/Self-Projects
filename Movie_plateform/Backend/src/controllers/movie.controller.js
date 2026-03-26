const movieModel = require("../models/movie.model");
const id3 = require("node-id3")
const storageService = require("../services/storage.service")

async function CreateMovieController(req, res) {
    const { title, description, genre, duration, rating } = req.body
    const movieFile = req.files.movie[0]
    const coverFile = req.files.cover[0]
    console.log(movieFile);

    const [ movie , cover] = await Promise.all([
        storageService.uploadFile({
            buffer: movieFile.buffer,
            filename: title,
            folder: "/cohort-2/movie-plateform/movies"
        }),
        storageService.uploadFile({
            buffer: coverFile.buffer,
            filename: title,
            folder: "/cohort-2/movie-plateform/covers"
        })
    ])

    const Movie = await movieModel.create({
        title,
        description,
        genre,
        duration,
        rating,
        movieUrl: movie.url,
        coverUrl: cover.url
    })
    res.status(201).json({
        message: "Movie created successfully",
        movie: Movie
    })
    
}

async function GetMoviesController(req, res) {
    const movies = await movieModel.find()
    res.status(200).json({
        message: "Movies fetched successfully",
        movies
    })
}

async function GetSingleMovieController(req, res) {
    const { id } = req.params
    const movie = await movieModel.findById(id)
    if (!movie) {
        return res.status(404).json({
            message: "Movie not found"
        })
    }
    res.status(200).json({
        message: "Movie fetched successfully",
        movie
    })
}

module.exports = {
    CreateMovieController,
    GetMoviesController,
    GetSingleMovieController
}