const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 10
    },
    movieUrl: {
        type: String,
        required: true
    },
    coverUrl: {
        type: String,
        required: true
    }
});

const movieModel = mongoose.model('Movie', movieSchema);

module.exports = movieModel;