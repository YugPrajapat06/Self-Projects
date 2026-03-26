import React from 'react'
import { useMovies } from '../hooks/useMovies'
import "../styles/movies_sec.scss"
import "../../shared/style/button.scss"
import { useNavigate } from 'react-router'
import MovieSecMovieCard from "../components/MovieSecMovieCard"
const MoviesSection = () => {

    const { movies, loading, handleGetMovies } = useMovies()
    const navigate = useNavigate()

    React.useEffect(() => {
        handleGetMovies()
    }, [])

    return (
        <div className='movies-section'>
            <div className='trandingText'>
                <div className='redLine'></div>
                <h2 className='section-title'>Trending Movies</h2>
            </div>

            {loading ? (
                <p className='loading'>Loading movies...</p>
            ) : (

                // <div className='movies-grid'>

                //     {movies.map((movie) => (
                //         <div key={movie.id} className="movie-card">

                //             <img src={movie.coverUrl} alt={movie.title} />

                //             <div className='overlay'>

                //                 <div className='movie-info'>
                //                     <h3>{movie.title}</h3>

                //                     <p className='desc'>
                //                         {movie.description.slice(0, 90)}...
                //                     </p>

                //                     <p className='duration'>
                //                         ⏱ {movie.duration} min
                //                     </p>

                //                     <button
                //                         className='button'
                //                         onClick={() => {
                //                             navigate('/show-trailer', { state: { movie } })
                //                         }}
                //                     >
                //                         Watch Trailer
                //                     </button>

                //                 </div>

                //             </div>

                //         </div>
                //     ))}

                // </div>
                <MovieSecMovieCard movies={movies} />

            )}

        </div>
    )
}

export default MoviesSection