import { createContext, useContext, useState } from "react";

export const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <MovieContext.Provider value={{ movies, setMovies, movie, setMovie, loading, setLoading }}>
            {children}
        </MovieContext.Provider>
    );
};