import { createMovie ,getMovies ,getMovieById} from "../services/movie.api"
import { MovieContext } from "../movie.context"
import { useContext } from "react"

export function useMovies() {
    const context = useContext(MovieContext)
    const { movies, setMovies, movie, setMovie, loading, setLoading } = context;

    async function handleCreateMovie(movieData) {
        setLoading(true)
        try {
            const newMovie = await createMovie(movieData)
            setMovies(prevMovies => [...prevMovies, newMovie])
            return newMovie
        } catch (error) {
            console.error("Failed to create movie:", error)
        } finally {
            setLoading(false)
        }
    }

    async function handleGetMovies() {
        setLoading(true)
        try {
            const moviesList = await getMovies()
            
            setMovies(moviesList.movies)
        } catch (error) {
            console.error("Failed to get movies:", error)
        } finally {
            setLoading(false)
        }
    }

    async function handleGetMovieById(id) {
        setLoading(true)
        try {
            const movie = await getMovieById(id)
            setMovie(movie)
        } catch (error) {
            console.error("Failed to get movie by ID:", error)
            return null
        } finally {
            setLoading(false)
        }
    }

    return { movies, movie, loading, handleCreateMovie, handleGetMovies, handleGetMovieById }

}