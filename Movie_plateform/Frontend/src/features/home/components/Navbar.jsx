import React from 'react'
import "./navbar.scss"
import { NavLink } from 'react-router'
import { Play } from 'lucide-react'
const Navbar = () => {
  return (
    <div className="navbar">
      <h1> <Play/> MOVIES<span> HUB</span></h1>
      <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/series">Series</NavLink>
        <NavLink to="/mylist">My List</NavLink>
      </div>

      <button className='Xl-button'>Logout</button>
    </div>
  )
}

export default Navbar
