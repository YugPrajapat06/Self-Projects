import React from 'react'
import { NavLink } from 'react-router'

const RouteLinks = () => {
    return (
        <div className="links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/movies">Movies</NavLink>
            <NavLink to="/series">Series</NavLink>
            <NavLink to="/mylist">My List</NavLink>
        </div>
    )
}

export default RouteLinks
