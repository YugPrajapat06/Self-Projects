import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
})

export async function createMovie({ title, description, releaseDate, genre, rating, movieFile, coverFile }) {

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("releaseDate", releaseDate);
    formData.append("genre", genre);
    formData.append("rating", rating);

    formData.append("movie", movieFile);   // video file
    formData.append("cover", coverFile);   // poster image

    const response = await api.post("/api/movies", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data;
}

export async function getMovies() {
    const response = await api.get('/api/movies');
    return response.data;
}

export async function getMovieById(id) {
    const response = await api.get(`/api/movies/${id}`);
    return response.data;
}