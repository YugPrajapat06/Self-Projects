import React, { useRef, useState } from "react";
import "./movieCard.scss";

const MovieCard = ({ movies }) => {

    const videoRef = useRef(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    return (
        movies.map((movie, index) => {
            return <div
                key={index}
                className="movieCard box"
                onContextMenu={(e) => e.preventDefault()}
                onMouseEnter={() => { setHoveredIndex(index) }}
                onMouseLeave={() => { setHoveredIndex(null) }}
            >

                {/* poster image */}
                {hoveredIndex !== index && (
                    <img src={movie.poster} alt={movie.title} />
                )}

                {/* youtube trailer */}
                {hoveredIndex === index && (
                    <>
                        <iframe
                            className="video"
                            src={`https://www.youtube.com/embed/${movie.videoId}?autoplay=1&mute=0&controls=0`}
                            title={movie.title}
                            frameBorder={0}
                            allow="autoplay"
                        />

                        <div className="videoOverlay"></div>
                    </>
                )}

                {/* overlay */}
                <div className="movieInfo">
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                </div>

            </div>
        })
    );
};

export default MovieCard;