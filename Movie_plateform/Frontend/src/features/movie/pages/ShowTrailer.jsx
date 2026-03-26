import React from 'react'
import { useLocation } from 'react-router'
import "../styles/showTrailer.scss"

const ShowTrailer = () => {

  const location = useLocation()
  const movie = location.state?.movie

  console.log(movie)

  return (
    <div className='showTrailer'>
      <video 
      src={movie.movieUrl}
      autoPlay
      controls
      ></video>
    </div>
  )
}

export default ShowTrailer