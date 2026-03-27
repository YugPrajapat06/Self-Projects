import React from 'react'
import { useNavigate } from 'react-router'
import "./movieSecMovieCard.scss"

const MovieSecMovieCard = ({ movies }) => {
    const navigate = useNavigate()
    return (
        <div className="movies-grid">
            {movies.map((movie) => (
                <div key={movie.id} className="movie-card">

                    <div className="image-wrapper">
                        <img src={movie.coverUrl} alt={movie.title} />
                    </div>

                    <div className="movie-content">
                        <h3 className="title">{movie.title}</h3>

                        <p className="desc">
                            {movie.description?.length > 80
                                ? movie.description.slice(0, 80) + "..."
                                : movie.description}
                        </p>

                        <div className="bottom-row">
                            <span className="duration">⏱ {movie.duration} min</span>

                            <button
                                className="watch-btn"
                                onClick={() =>
                                    navigate("/show-trailer", { state: { movie } })
                                }
                            >
                                ▶ Trailer
                            </button>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default MovieSecMovieCard
