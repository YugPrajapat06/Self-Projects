import React from 'react'
import "./landingSec1.scss"
import MovieCard from './MovieCard';
import BrowseByGenre from './BrowseByGenre';

const movies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    year: "2019",
    genre: "Action / Sci-Fi",
    poster: "https://i.pinimg.com/736x/29/27/d2/2927d271355daa9ab0a43acd95c0d17b.jpg",
    trailer: "/videos/endgame.mp4",
    videoId: "-iFq6IcAxBc"
  },
  {
    id: 2,
    title: "Interstellar",
    year: "2014",
    genre: "Sci-Fi / Adventure",
    poster: "https://i.pinimg.com/736x/51/21/67/512167af7cd7c6ae53536d9c51440170.jpg",
    trailer: "/videos/interstellar.mp4",
    videoId: "4REFMXawFEA"
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: "2008",
    genre: "Action / Crime",
    poster: "https://i.pinimg.com/736x/88/04/aa/8804aa87eeddea6db64484d030089426.jpg",
    trailer: "/videos/darkknight.mp4",
    videoId: "abER52pzkG0"
  },
  {
    id: 4,
    title: "Inception",
    year: "2010",
    genre: "Sci-Fi / Thriller",
    poster: "https://i.pinimg.com/736x/1a/dc/d0/1adcd0124a2ead3975ace838aa91de47.jpg",
    trailer: "/videos/inception.mp4",
    videoId: "Fnaw9iCYUd8"
  },
  {
    id: 5,
    title: "Spider-Man: No Way Home",
    year: "2021",
    genre: "Action / Adventure",
    poster: "https://i.pinimg.com/1200x/b6/77/d7/b677d7113f791d71d25328d11256b9b0.jpg",
    trailer: "/videos/spiderman.mp4",
    videoId: "ei7R345Cjo0"
  }
];

const LandingSec1 = () => {
  return (
    <div className='LandingSec1'>
      <div className='trandingText'>
        <div className='redLine'></div>
        <h2>Tranding Now</h2>
      </div>
      <div className="cards">
        <MovieCard movies={movies}/>
      </div>
      <BrowseByGenre/>
    </div>
  )
}

export default LandingSec1
